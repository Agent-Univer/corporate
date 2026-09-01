import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || 'https://lbkhvciymyzzjijuhbri.supabase.co';
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxia2h2Y2l5bXl6emppanVoYnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxOTczMDMsImV4cCI6MjEwMzc3MzMwM30.1BWGX2qw-GoFTYe_P5Yo0CK2SlDhL3SfoP5P09Hxib4';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface TaskOrder {
  id: string;
  agentId: string;
  agentName: string;
  subdomain: string;
  taskTitle: string;
  taskDescription: string;
  parameters?: Record<string, any>;
  budgetUsd: number;
  platformFeeUsd: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  userEmail?: string;
  resultPayload?: any;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: 'client' | 'developer' | 'admin';
}

export interface DripPulseResult {
  success: boolean;
  source: 'pulse' | 'cooldown_skip' | 'mock_fallback' | 'error';
  timestamp: number;
  nextEligibleTime: number;
  message: string;
}

export interface PulseStatus {
  isConfigured: boolean;
  lastPulseTimestamp: number | null;
  nextEligibleTimestamp: number | null;
  isEligible: boolean;
  cooldownMinutes: number;
}

const STORAGE_KEY_LAST_PULSE = 'agentuniver_supabase_last_pulse';
const DEFAULT_COOLDOWN_MINUTES = 30;

/**
 * 触发 Supabase 滴漏保活轻量 Pulse
 * @param options.force 是否强制发送保活请求，忽略本地冷却周期
 * @param options.cooldownMinutes 本地冷却周期（分钟），默认 30 分钟
 */
export async function triggerSupabaseDripPulse(options?: {
  force?: boolean;
  cooldownMinutes?: number;
}): Promise<DripPulseResult> {
  const cooldownMinutes = options?.cooldownMinutes ?? DEFAULT_COOLDOWN_MINUTES;
  const cooldownMs = cooldownMinutes * 60 * 1000;
  const now = Date.now();

  if (typeof window === 'undefined') {
    return {
      success: true,
      source: 'cooldown_skip',
      timestamp: now,
      nextEligibleTime: now,
      message: 'SSR environment, client pulse skipped'
    };
  }

  // 检查本地冷却周期
  const rawLastPulse = localStorage.getItem(STORAGE_KEY_LAST_PULSE);
  const lastPulseTime = rawLastPulse ? parseInt(rawLastPulse, 10) : 0;
  const isCooldownActive = !options?.force && lastPulseTime > 0 && (now - lastPulseTime < cooldownMs);

  if (isCooldownActive) {
    return {
      success: true,
      source: 'cooldown_skip',
      timestamp: lastPulseTime,
      nextEligibleTime: lastPulseTime + cooldownMs,
      message: `Pulse in cooldown period. Next pulse eligible in ${Math.ceil((lastPulseTime + cooldownMs - now) / 60000)} minutes.`
    };
  }

  // 真实 Supabase 客户端保活探测
  if (supabase && isSupabaseConfigured) {
    try {
      // 优先执行轻量 head 计数探测，保持 Postgres 活跃并避免数据传输开销
      const { error } = await supabase
        .from('agent_tasks')
        .select('id', { count: 'exact', head: true })
        .limit(1);

      if (error) {
        // 降级使用基础 REST HEAD 探测
        await fetch(`${supabaseUrl}/rest/v1/agent_tasks?select=id&limit=1`, {
          method: 'HEAD',
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`
          }
        });
      }

      localStorage.setItem(STORAGE_KEY_LAST_PULSE, String(now));
      return {
        success: true,
        source: 'pulse',
        timestamp: now,
        nextEligibleTime: now + cooldownMs,
        message: 'Supabase drip pulse ping executed successfully.'
      };
    } catch (err: any) {
      console.warn('[Supabase Keepalive] Pulse request failed gracefully:', err?.message || err);
      // 记录本地时间以防止短时间反复异常重试
      localStorage.setItem(STORAGE_KEY_LAST_PULSE, String(now));
      return {
        success: false,
        source: 'error',
        timestamp: now,
        nextEligibleTime: now + 60000,
        message: `Supabase ping failed gracefully: ${err?.message || err}`
      };
    }
  }

  // 本地 Mock 兼容降级
  localStorage.setItem(STORAGE_KEY_LAST_PULSE, String(now));
  return {
    success: true,
    source: 'mock_fallback',
    timestamp: now,
    nextEligibleTime: now + cooldownMs,
    message: 'Supabase mock pulse executed successfully (mock mode).'
  };
}

/**
 * 获取当前 Supabase 滴漏保活状态
 */
export function getSupabasePulseStatus(cooldownMinutes: number = DEFAULT_COOLDOWN_MINUTES): PulseStatus {
  if (typeof window === 'undefined') {
    return {
      isConfigured: isSupabaseConfigured,
      lastPulseTimestamp: null,
      nextEligibleTimestamp: null,
      isEligible: false,
      cooldownMinutes
    };
  }

  const rawLastPulse = localStorage.getItem(STORAGE_KEY_LAST_PULSE);
  const lastPulseTimestamp = rawLastPulse ? parseInt(rawLastPulse, 10) : null;
  const cooldownMs = cooldownMinutes * 60 * 1000;
  const now = Date.now();

  if (!lastPulseTimestamp) {
    return {
      isConfigured: isSupabaseConfigured,
      lastPulseTimestamp: null,
      nextEligibleTimestamp: now,
      isEligible: true,
      cooldownMinutes
    };
  }

  const nextEligibleTimestamp = lastPulseTimestamp + cooldownMs;
  const isEligible = now >= nextEligibleTimestamp;

  return {
    isConfigured: isSupabaseConfigured,
    lastPulseTimestamp,
    nextEligibleTimestamp,
    isEligible,
    cooldownMinutes
  };
}

/**
 * 客户端空闲期非阻塞自动初始化滴漏保活
 * @param options.cooldownMinutes 冷却周期（分钟）
 * @param options.delayMs 延迟执行毫秒数，默认 1500ms
 */
export function initSupabaseDripPulse(options?: {
  cooldownMinutes?: number;
  delayMs?: number;
}): void {
  if (typeof window === 'undefined') return;

  const delayMs = options?.delayMs ?? 1500;
  const execute = () => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          triggerSupabaseDripPulse({ cooldownMinutes: options?.cooldownMinutes }).catch(() => {});
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        triggerSupabaseDripPulse({ cooldownMinutes: options?.cooldownMinutes }).catch(() => {});
      }, 500);
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(execute, delayMs);
  } else {
    window.addEventListener('load', () => {
      setTimeout(execute, delayMs);
    }, { once: true });
  }
}

/**
 * 触发 Google SSO 登录
 */
export async function signInWithGoogle() {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/marketplace'
      }
    });
    if (error) throw error;
    return data;
  } else {
    // Local / Demo Fallback
    const mockUser: UserProfile = {
      id: 'usr-google-' + Date.now().toString(36),
      email: 'builder@gmail.com',
      name: 'Google Builder',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=GoogleBuilder',
      role: 'client'
    };
    localStorage.setItem('agentuniver_auth_user', JSON.stringify(mockUser));
    window.dispatchEvent(new Event('agentuniver_auth_change'));
    return { user: mockUser };
  }
}

/**
 * 触发 GitHub OAuth 登录
 */
export async function signInWithGithub() {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/marketplace'
      }
    });
    if (error) throw error;
    return data;
  } else {
    // Local / Demo Fallback
    const mockUser: UserProfile = {
      id: 'usr-github-' + Date.now().toString(36),
      email: 'dev@github.com',
      name: 'GitHub Developer',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=GitHubDev',
      role: 'developer'
    };
    localStorage.setItem('agentuniver_auth_user', JSON.stringify(mockUser));
    window.dispatchEvent(new Event('agentuniver_auth_change'));
    return { user: mockUser };
  }
}

/**
 * 登出
 */
export async function signOutUser() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('agentuniver_auth_user');
  window.dispatchEvent(new Event('agentuniver_auth_change'));
}

/**
 * 获取当前登录用户
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Agent Builder',
        avatarUrl: user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + user.id,
        role: 'client'
      };
    }
  }
  
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('agentuniver_auth_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

/**
 * 下发雇佣任务工单
 */
export async function hireAgentTask(taskData: Omit<TaskOrder, 'id' | 'createdAt' | 'status' | 'platformFeeUsd'>): Promise<TaskOrder> {
  const platformFee = Number((taskData.budgetUsd * 0.1).toFixed(2));
  const newOrder: TaskOrder = {
    ...taskData,
    id: 'ord-' + Math.random().toString(36).substring(2, 10),
    platformFeeUsd: platformFee,
    status: 'processing',
    createdAt: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('agent_tasks')
        .insert([newOrder])
        .select()
        .single();
      if (!error && data) return data as TaskOrder;
    } catch (err) {
      console.warn('Supabase insert failed, fallback to local storage:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    const orders = JSON.parse(localStorage.getItem('agentuniver_hired_tasks') || '[]');
    orders.unshift(newOrder);
    localStorage.setItem('agentuniver_hired_tasks', JSON.stringify(orders));
  }

  return newOrder;
}
