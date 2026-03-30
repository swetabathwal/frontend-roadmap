/**
 * Staff / Lead (6+ yr) topic data.
 * IMPORTANT: `slug` is the stable primary key — never change it once shipped.
 */
export const STAFF_TOPICS = [
  { cat: 'html-css', topics: [
    { slug: 'web-platform-futures-and-standards', t: 'Web Platform Futures & Standards', d: 'TC39, W3C, WHATWG — tracking and influencing web standards', r: 'https://github.com/tc39/proposals' },
    { slug: 'cross-platform-design-systems',      t: 'Cross-platform Design Systems',    d: 'design tokens spec, multi-platform, versioning, governance', r: '' },
    { slug: 'rendering-engine-internals',         t: 'Rendering Engine Internals',        d: 'Blink/WebKit rendering pipeline, layout, paint, composite', r: '' },
  ]},
  { cat: 'javascript', topics: [
    { slug: 'tc39-proposals-and-language-evolution', t: 'TC39 Proposals & Language Evolution', d: 'stage 0-4 proposals, pattern matching, records/tuples, decorators', r: 'https://github.com/tc39/proposals' },
    { slug: 'compiler-and-bundler-design',           t: 'Compiler & Bundler Design',           d: 'writing Babel/SWC plugins, custom bundler logic, AST at scale', r: '' },
    { slug: 'webassembly-integration',               t: 'WebAssembly Integration',             d: 'WASM modules, Emscripten, performance-critical computation offloading', r: 'https://webassembly.org/' },
    { slug: 'browser-apis-advanced',                 t: 'Browser APIs — Advanced',             d: 'File System Access, Web Serial, Web Bluetooth, FedCM', r: '' },
  ]},
  { cat: 'typescript', topics: [
    { slug: 'type-system-design-large-codebases',    t: 'Type System Design for Large Codebases',   d: 'type architecture, branded types, opaque types, domain modeling', r: '' },
    { slug: 'custom-language-services-ide-extensions',t: 'Custom Language Services & IDE Extensions',d: 'TS language server protocol, custom IDE plugins, codemods at scale', r: '' },
    { slug: 'type-safe-distributed-systems',         t: 'Type-safe Distributed Systems',           d: 'tRPC, GraphQL codegen, contract-first API development', r: 'https://trpc.io/' },
  ]},
  { cat: 'framework', topics: [
    { slug: 'framework-evaluation-and-selection',         t: 'Framework Evaluation & Selection',           d: 'evaluating frameworks for org needs, migration cost analysis', r: '' },
    { slug: 'platform-architecture-multi-app-ecosystems', t: 'Platform Architecture — Multi-app Ecosystems',d: 'shared libraries, versioning strategy, dependency governance', r: '' },
    { slug: 'build-system-architecture-at-scale',         t: 'Build System Architecture at Scale',         d: 'remote caching, distributed builds, custom Nx plugins, performance budgets', r: '' },
    { slug: 'framework-internals',                        t: 'Framework Internals',                        d: 'Angular compiler, React Fiber reconciler, Vue reactivity — deep understanding', r: '' },
    { slug: 'emerging-frameworks-analysis',               t: 'Emerging Frameworks Analysis',               d: 'Qwik, Solid, Astro, HTMX — understanding paradigm shifts', r: '' },
  ]},
  { cat: 'state', topics: [
    { slug: 'distributed-state-and-event-sourcing', t: 'Distributed State & Event Sourcing', d: 'event sourcing for frontend, CQRS patterns, eventual consistency UI', r: '' },
    { slug: 'state-architecture-at-org-scale',      t: 'State Architecture at Org Scale',    d: 'standardizing state patterns across teams, shared state libraries', r: '' },
    { slug: 'offline-first-architecture',           t: 'Offline-first Architecture',         d: 'IndexedDB, sync engines, conflict resolution at scale', r: '' },
  ]},
  { cat: 'testing', topics: [
    { slug: 'testing-strategy-for-org',           t: 'Testing Strategy for Org',              d: 'defining testing standards, quality metrics, test infrastructure investment', r: '' },
    { slug: 'test-infrastructure-custom-frameworks',t: 'Test Infrastructure & Custom Frameworks',d: 'custom test runners, shared test utilities, test data factories', r: '' },
    { slug: 'ab-testing-infrastructure',          t: 'A/B Testing Infrastructure',           d: 'experiment platforms, statistical significance, feature flags, rollout', r: '' },
    { slug: 'synthetic-monitoring-slo-sla',       t: 'Synthetic Monitoring & SLO/SLA',       d: 'uptime monitoring, performance SLOs, error budgets, alerting', r: '' },
  ]},
  { cat: 'performance', topics: [
    { slug: 'performance-culture-and-budgets',              t: 'Performance Culture & Budgets',             d: 'defining performance budgets, team accountability, performance in CI', r: '' },
    { slug: 'application-level-caching-architecture',       t: 'Application-level Caching Architecture',   d: 'cache layers, invalidation strategies, cache stampede prevention', r: '' },
    { slug: 'performance-at-scale',                         t: 'Performance at Scale',                     d: 'performance for 10M+ users, geographic optimization, progressive enhancement', r: '' },
  ]},
  { cat: 'accessibility', topics: [
    { slug: 'org-wide-accessibility-program',         t: 'Org-wide Accessibility Program',       d: 'building a11y culture, training programs, champions network, maturity model', r: '' },
    { slug: 'accessibility-governance-and-compliance',t: 'Accessibility Governance & Compliance', d: 'audit processes, VPAT creation, vendor assessment, legal risk management', r: '' },
    { slug: 'assistive-technology-innovation',        t: 'Assistive Technology Innovation',       d: 'emerging AT, voice interfaces, AI-powered accessibility, personalization', r: '' },
  ]},
  { cat: 'tooling', topics: [
    { slug: 'developer-experience-architecture', t: 'Developer Experience (DX) Architecture', d: 'internal developer portals, golden paths, self-service tooling', r: 'https://backstage.io/' },
    { slug: 'platform-engineering',              t: 'Platform Engineering',                   d: 'internal platforms, self-service CI/CD, environment provisioning', r: '' },
    { slug: 'observability-architecture',        t: 'Observability Architecture',             d: 'distributed tracing, log aggregation, metrics correlation, custom dashboards', r: '' },
    { slug: 'cost-optimization',                 t: 'Cost Optimization',                     d: 'cloud cost management, CDN optimization, compute right-sizing', r: '' },
    { slug: 'security-architecture',             t: 'Security Architecture',                 d: 'threat modeling, security review processes, OWASP integration, CSP at scale', r: '' },
  ]},
  { cat: 'design', topics: [
    { slug: 'architecture-for-scale-10m-users', t: 'Architecture for Scale (10M+ users)', d: 'horizontal scaling, microservices decomposition, event-driven architecture', r: '' },
    { slug: 'design-youtube-netflix',           t: 'Design YouTube / Netflix',            d: 'video streaming, CDN, transcoding, recommendation system HLD', r: '' },
    { slug: 'design-uber-ride-sharing',         t: 'Design Uber / Ride-sharing',          d: 'real-time location, matching algorithm, geospatial indexing', r: '' },
    { slug: 'design-slack-chat-system',         t: 'Design Slack / Chat System',          d: 'messaging at scale, presence, channels, search, WebSocket architecture', r: '' },
    { slug: 'technology-radar-and-strategy',    t: 'Technology Radar & Strategy',         d: 'evaluating tech, build vs buy, migration roadmaps, risk assessment', r: '' },
    { slug: 'api-gateway-and-bff-patterns',     t: 'API Gateway & BFF Patterns',          d: 'Backend for Frontend, API composition, GraphQL federation', r: '' },
  ]},
  { cat: 'dsa', topics: [
    { slug: 'algorithm-design-for-production',     t: 'Algorithm Design for Production',      d: 'choosing algorithms for real systems, trade-off analysis, benchmarking', r: '' },
    { slug: 'distributed-systems-algorithms',      t: 'Distributed Systems Algorithms',       d: 'Raft consensus, Paxos, vector clocks, gossip protocols', r: '' },
    { slug: 'data-intensive-application-patterns', t: 'Data-Intensive Application Patterns',  d: 'stream processing, batch processing, lambda architecture', r: '' },
    { slug: 'probabilistic-data-structures',       t: 'Probabilistic Data Structures',        d: 'bloom filters, count-min sketch, HyperLogLog — when and why', r: '' },
  ]},
  { cat: 'ai', topics: [
    { slug: 'ai-strategy-for-engineering-teams',  t: 'AI Strategy for Engineering Teams',   d: 'where AI adds value, tool selection, training, ROI measurement', r: '' },
    { slug: 'building-ai-native-applications',    t: 'Building AI-native Applications',     d: 'AI-first architecture, LLM orchestration, agent frameworks, eval pipelines', r: '' },
    { slug: 'mcp-ecosystem-and-custom-tooling',   t: 'MCP Ecosystem & Custom Tooling',      d: 'building MCP tool ecosystems, multi-agent workflows, custom agent dev', r: 'https://modelcontextprotocol.io/' },
    { slug: 'ai-powered-developer-productivity',  t: 'AI-Powered Developer Productivity',   d: 'code review agents, documentation generators, incident response automation', r: '' },
    { slug: 'ai-infrastructure-and-mlops-basics', t: 'AI Infrastructure & MLOps Basics',   d: 'model serving, A/B testing models, monitoring drift, cost management', r: '' },
    { slug: 'future-of-ai-in-software-engineering',t: 'Future of AI in Software Engineering',d: 'agentic coding, autonomous systems, human-AI collaboration patterns', r: '' },
  ]},
  { cat: 'soft', topics: [
    { slug: 'org-level-technical-vision',   t: 'Org-level Technical Vision',    d: 'setting technical direction, multi-year roadmaps, aligning with business', r: '' },
    { slug: 'influence-without-authority',  t: 'Influence Without Authority',    d: 'cross-org alignment, building coalitions, driving change at scale', r: '' },
    { slug: 'hiring-and-team-building',     t: 'Hiring & Team Building',         d: 'interview design, rubrics, hiring bar, team composition, diversity', r: '' },
    { slug: 'budget-and-resource-planning', t: 'Budget & Resource Planning',     d: 'headcount planning, tool budgets, build vs buy decisions', r: '' },
    { slug: 'executive-communication',      t: 'Executive Communication',        d: 'presenting to leadership, translating tech to business, status reporting', r: '' },
    { slug: 'building-engineering-culture', t: 'Building Engineering Culture',   d: 'values, rituals, learning culture, psychological safety, innovation time', r: '' },
  ]},
]
