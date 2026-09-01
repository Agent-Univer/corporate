# AgentUniver (优尼客) 官方网站 Landing Page PRD v1.1

## 1. 项目概述

### 1.1 项目定位与基准

参考 **[Stardrive (https://astro-stardrive.com/)][1]** 的顶级视觉完成度与叙事节奏，建设 **AgentUniver（优尼客）高转化官方企业门户 Landing Page**。

定位：**自主智能体中枢与协作网络** (Autonomous AI Workspace & Agent Fabric)。

---

## 2. 核心视觉设计准则 (Visual Direction)

本项目整体视觉定位由 5 大支柱构成：

```text
Visual Direction

Modern Technology       (现代科技：前沿、克制、严谨、深色科技底色)
+
Premium Minimal         (高级极简：Less but Better，大间距 Whitespace，拒绝廉价插画)
+
Product-led             (产品驱动：真实产品 UI/特性与真实作品为视觉主体)
+
Editorial Typography    (编辑级排版：大字阶 H1/H2 建立从容且强烈的视觉层级)
+
Conversion-oriented     (转化导向：全流程穿插明确 CTA，打造丝滑商业闭环)
```

---

## 3. 网站信息架构

采用单页极速响应 Landing Page 架构。

```text
/
├── Header (Logo · 公司 · 产品 · 案例 · 团队 · 伙伴 · 联系 · [开始合作])
├── Hero (Agent-Workspace · Inference-Mesh · Personal-AI)
├── 公司 (#company - 自主协同，驱动全场景数字生产力跃迁)
├── 核心产品 (#products - 4大支柱产品矩阵)
├── 案例 (#cases - 3大真实标杆落地)
├── 团队 (#team - 4位核心领袖)
├── 生态伙伴 (#partners - 6家全球基础设施联盟)
├── 伙伴计划 (#contact - 极简商业直连通道与意向表单)
└── Footer (AgentUniver · Product / Useful / Company)
```

---

## 4. 页面模块与文案定义

### 4.1 Header 顶部导航

* **Logo**：`AU AgentUniver`（自主智能体中枢与协作网络）
* **导航锚点**：
  * `公司` (`#company`)
  * `产品` (`#products`)
  * `案例` (`#cases`)
  * `团队` (`#team`)
  * `伙伴` (`#partners`)
  * `联系` (`#contact`)
* **操作区**：
  * 多语言切换：`English` / `中文`
  * 主 CTA：`[开始合作]`（平滑滚动至 `#contact`）
* **移动端**：自适应抽屉菜单，点击自动收起。

---

### 4.2 Hero 首屏区

* **业务标签（3 Tags）**：`Agent-Workspace` · `Inference-Mesh` · `Personal-AI`
* **主标题（H1）**：
  > **企业级自主智能体中枢、推理调度与个人 AI 智能助理**
* **辅助文案**：
  > AgentUniver（优尼客）构建面向未来的智能体宇宙：LibraOn 天秤 AI 协作工作空间、LibraFlux 高通量模型推理调度引擎与 OhBona 个人智能助理（Just Say OK）。
* **行动号召（双 CTA）**：
  * Primary: `[开始合作]` (`#contact`)
  * Secondary: `[了解产品]` (`#products`)
* **信任背书指标（Trust Stats）**：
  * `4` 核心智能体产线
  * `100万+` 每日协同任务
  * `99.99%` 企业级可用性
  * `<15ms` 路由调度延迟

---

### 4.3 公司 Section (`#company`)

* **Badge**：`公司 · COMPANY`
* **主标题（H2）**：
  > **自主协同，驱动全场景数字生产力跃迁**
* **定位描述**：
  AgentUniver（优尼客）致力于研发新一代自主智能体协作中枢与高并发模型调度架构，消除组织知识孤岛与人机交互壁垒，让企业与个人轻松驾驭 AI 生产力。
* **使命与愿景**：
  * **使命 (Mission)**：让智能体如同电力般自主运转，赋能每一个组织与个体的生产力飞跃。
  * **愿景 (Vision)**：成为全球领先的企业级智能体中枢与普惠个人 AI 智能网络。
* **量化数据网格**：
  * `4` 核心产品
  * `100万+` 日任务量
  * `99.99%` 服务 SLA
  * `<15ms` 路由延迟

---

### 4.4 核心产品 Section (`#products`)

* **Badge**：`产品 · PRODUCTS`
* **主标题（H2）**：
  > **核心产品**
* **4 大支柱产品矩阵**：

| 序号 | 产品名称 | 定位分类 | 核心能力与链接 |
| :--- | :--- | :--- | :--- |
| 1 | **LibraOn (天秤AI)** | `Enterprise AI` | 企业级协同智能工作空间 (libraon.com)。聚合团队知识库、多 Agent 自动化协同流与企业级数据安全沙箱。入口：`libraon.com` |
| 2 | **LibraFlux (天秤流转)** | `Inference Mesh` | 高吞吐大模型推理调度引擎与 Agent 工作流总线。支持动态负载均衡、微秒级 Token 流式分发与智能路由。入口：`#contact` |
| 3 | **OhBona 智能助理** | `Just Say OK` | 面向个人的全能智能生活与办公助理 (ohbona.com / justsayok.com)。一句指令搞定日程、搜索、创作与跨端执行。入口：`ohbona.com` |
| 4 | **AgentUniver Platform** | `Agent Fabric` | 自主智能体网络开发者平台 (agentuniver.com)。提供标准 Agent 通信协议、工具调用 API 市场与多租户隔离沙盒。入口：`agentuniver.com` |

---

### 4.5 案例 Section (`#cases`)

* **Badge**：`实战证明 · CASES`
* **主标题（H2）**：
  > **案例**
* **3 大真实标杆作品**：
  1. **跨国金融科技集团**（LibraOn）：
     * 挑战：多部门文档孤岛严重，跨部门业务提效与敏感数据审计难以兼顾。
     * 方案：部署 LibraOn 私有知识中枢与数据安全沙箱，全流程自动化合规审计。
     * 成果：`280% 协同流转提速`，`100% 数据安全合规`。
  2. **高并发大模型聚合平台**（LibraFlux）：
     * 挑战：多模型供应商并发配额受限，高峰期请求排队超时严重。
     * 方案：集成 LibraFlux 智能多模型流转总线，毫秒级故障自动漂移与成本最优路由。
     * 成果：`+350% 集群吞吐提升`，`<12ms 平均首Token延迟`。
  3. **十万级个人创作者与高管**（OhBona）：
     * 挑战：跨软件切换碎片化严重，复杂信息整理与跨端日程处理耗时耗力。
     * 方案：使用 OhBona (Just Say OK) 自然语言极简指令，自动化执行复杂工作流。
     * 成果：`96% 任务自动化率`，`4.9/5 用户满意度评分`。

---

### 4.6 团队 Section (`#team`)

* **Badge**：`核心团队 · TEAM`
* **主标题（H2）**：
  > **团队**
* **4 位核心领袖**：
  1. **Founder & CEO**：创始人兼首席执行官，统筹全球战略、商业化增长与智能体生态治理。（GitHub / LinkedIn）
  2. **智能体中枢首席架构师 (Head of LibraOn)**：主导 LibraOn 企业级智能工作空间架构、知识语义中枢与安全沙箱隔离。（GitHub）
  3. **推理调度系统科学家 (Head of LibraFlux)**：专注于超高并发大模型推理路由算法、流式总线分发与成本动态优化。（GitHub）
  4. **个人 AI 产品负责人 (Head of OhBona)**：主导 OhBona 跨端自然交互、极简工作流执行与个人私有数据安全体系。（X）

---

### 4.7 生态伙伴 Section (`#partners`)

* **Badge**：`生态共建 · PARTNERS`
* **主标题（H2）**：
  > **生态伙伴**
* **6 家全球伙伴 Logo Wall**：
  * `OpenRouter`（大模型聚合 API）
  * `NATS.io`（分布式消息总线）
  * `Cloudflare`（边缘安全网络）
  * `Vercel Edge`（Serverless 部署）
  * `Tencent Cloud`（多云边缘算力）
  * `AFN Network`（智能体传输协议）
* **伙伴计划 Banner**：加入 AgentUniver 智能体生态伙伴计划，享受 API 优先接入、高比例分润与方案联合推广（CTA: `成为伙伴 →`）。

---

### 4.8 伙伴计划 Section (`#contact`)

* **Badge**：`合作对接 · COLLABORATION`
* **主标题（H2）**：
  > **伙伴计划**
* **左侧直达通道**：
  * 商务与生态合作：`contact@agentuniver.com`
  * 投资者关系 (IR)：`ir@agentuniver.com`
  * 服务响应标准：24 小时内专属顾问直连响应
* **右侧表单**：
  * 姓名（Name）
  * 联系电话 / 微信 / 邮箱（Contact）
  * 合作类型（LibraOn企业版部署 / LibraFlux调度总线 / 渠道方案商 / 机构战略投资）
  * 合作需求说明（Message）
  * 提交按钮：`[联系我们]`

---

### 4.9 Footer 页脚

* **品牌**：`AgentUniver`（优尼客）
* **三列分类导航**：
  * **Product**：LibraOn (天秤AI)、LibraFlux (推理调度)、OhBona (个人助理)、AgentUniver Platform
  * **Useful**：客户案例、生态伙伴、伙伴计划、开源协议
  * **Company**：关于我们、核心团队、商务合作、投资者关系
* **社交链接**：`GitHub · LinkedIn · X`
* **法律条款与版权**：`Privacy Policy · Terms of Service` / `© 2026 AgentUniver Inc. All rights reserved.`

[1]: https://astro-stardrive.com/ "Stardrive - the Astro Boilerplate"
