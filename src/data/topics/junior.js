/**
 * Junior (0–1 yr) topic data.
 * Each entry: { cat: string, topics: { slug: string, t: string, d: string, r: string }[] }
 *
 * IMPORTANT: `slug` is the stable primary key for this topic.
 * Never change a slug once shipped — change `t` (display title) freely instead.
 */
export const JUNIOR_TOPICS = [
  {
    cat: 'html-css',
    topics: [
      { slug: 'html5-semantic-elements',          t: 'HTML5 Semantic Elements',          d: 'header, nav, main, section, article, aside, footer', r: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' },
      { slug: 'forms-and-validation',             t: 'Forms & Validation',               d: 'input types, required, pattern, form submission', r: 'https://developer.mozilla.org/en-US/docs/Learn/Forms' },
      { slug: 'css-selectors-and-specificity',    t: 'CSS Selectors & Specificity',      d: 'class, id, attribute, pseudo-class, combinators', r: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity' },
      { slug: 'box-model-and-layout-basics',      t: 'Box Model & Layout Basics',        d: 'margin, padding, border, display, position', r: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model' },
      { slug: 'flexbox-layout',                   t: 'Flexbox Layout',                   d: 'flex-direction, justify-content, align-items, flex-wrap, gap', r: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
      { slug: 'css-grid-basics',                  t: 'CSS Grid Basics',                  d: 'grid-template, fr units, gap, grid-area', r: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
      { slug: 'responsive-design-media-queries',  t: 'Responsive Design & Media Queries', d: 'breakpoints, mobile-first, viewport meta', r: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
      { slug: 'css-variables-custom-properties',  t: 'CSS Variables (Custom Properties)', d: '--var declarations, var() usage, theming basics', r: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
      { slug: 'basic-animations-and-transitions', t: 'Basic Animations & Transitions',   d: 'transition property, @keyframes, transform', r: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions' },
      { slug: 'bem-naming-convention',            t: 'BEM Naming Convention',            d: 'Block, Element, Modifier methodology', r: 'https://getbem.com/' },
    ],
  },
  {
    cat: 'javascript',
    topics: [
      { slug: 'variables-and-data-types',       t: 'Variables & Data Types',       d: 'let, const, var, primitives, objects, type coercion', r: 'https://javascript.info/types' },
      { slug: 'functions-and-scope',            t: 'Functions & Scope',            d: 'declarations, expressions, arrow functions, lexical scope', r: 'https://javascript.info/function-basics' },
      { slug: 'arrays-and-array-methods',       t: 'Arrays & Array Methods',       d: 'map, filter, reduce, find, some, every, forEach, spread', r: 'https://javascript.info/array-methods' },
      { slug: 'objects-and-destructuring',      t: 'Objects & Destructuring',      d: 'dot/bracket notation, destructuring, spread/rest, Object methods', r: 'https://javascript.info/destructuring-assignment' },
      { slug: 'dom-manipulation',               t: 'DOM Manipulation',             d: 'querySelector, addEventListener, createElement, classList', r: 'https://javascript.info/document' },
      { slug: 'events-and-event-delegation',    t: 'Events & Event Delegation',    d: 'bubbling, capturing, event.target, delegation pattern', r: 'https://javascript.info/event-delegation' },
      { slug: 'es6-plus-features',              t: 'ES6+ Features',                d: 'template literals, default params, optional chaining, nullish coalescing', r: 'https://javascript.info/' },
      { slug: 'closures-and-lexical-scope',     t: 'Closures & Lexical Scope',     d: 'closure definition, practical uses, IIFE, module pattern', r: 'https://javascript.info/closure' },
      { slug: 'promises-and-async-await',       t: 'Promises & Async/Await',       d: 'Promise creation, chaining, async/await, error handling', r: 'https://javascript.info/async' },
      { slug: 'error-handling',                 t: 'Error Handling',               d: 'try/catch/finally, custom errors, error types', r: 'https://javascript.info/error-handling' },
      { slug: 'fetch-api-and-http-basics',      t: 'Fetch API & HTTP Basics',      d: 'GET, POST, headers, JSON parsing, status codes', r: 'https://javascript.info/fetch' },
      { slug: 'local-storage-and-session-storage', t: 'Local Storage & Session Storage', d: 'setItem, getItem, JSON serialization', r: 'https://javascript.info/localstorage' },
    ],
  },
  {
    cat: 'typescript',
    topics: [
      { slug: 'basic-types-and-type-annotations', t: 'Basic Types & Type Annotations', d: 'string, number, boolean, arrays, tuples, any, unknown', r: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
      { slug: 'interfaces-and-type-aliases',      t: 'Interfaces & Type Aliases',      d: 'interface vs type, optional/readonly props, extending', r: 'https://www.typescriptlang.org/docs/handbook/2/objects.html' },
      { slug: 'functions-with-types',             t: 'Functions with Types',            d: 'parameter types, return types, optional params, overloads', r: 'https://www.typescriptlang.org/docs/handbook/2/functions.html' },
      { slug: 'enums-and-literal-types',          t: 'Enums & Literal Types',           d: 'string enums, numeric enums, const enums, union literals', r: 'https://www.typescriptlang.org/docs/handbook/enums.html' },
      { slug: 'generics-basics',                  t: 'Generics Basics',                 d: 'generic functions, generic interfaces, constraints', r: 'https://www.typescriptlang.org/docs/handbook/2/generics.html' },
    ],
  },
  {
    cat: 'framework',
    topics: [
      { slug: 'component-architecture-basics',   t: 'Component Architecture Basics',       d: 'components, props/inputs, state, lifecycle', r: 'https://angular.dev/guide/components' },
      { slug: 'template-syntax-and-data-binding',t: 'Template Syntax & Data Binding',      d: 'interpolation, property binding, event binding, two-way binding', r: 'https://angular.dev/guide/templates' },
      { slug: 'routing-fundamentals',            t: 'Routing Fundamentals',                d: 'route configuration, router-outlet, routerLink, params', r: 'https://angular.dev/guide/routing' },
      { slug: 'services-and-dependency-injection',t: 'Services & Dependency Injection',    d: 'injectable services, providedIn, constructor injection', r: 'https://angular.dev/guide/di' },
      { slug: 'http-client-and-api-calls',       t: 'HTTP Client & API Calls',             d: 'HttpClient, observables, error handling, interceptors intro', r: 'https://angular.dev/guide/http' },
      { slug: 'forms-template-driven-and-reactive',t: 'Forms — Template-driven & Reactive',d: 'FormControl, FormGroup, validators, ngModel', r: 'https://angular.dev/guide/forms' },
      { slug: 'pipes-and-directives',            t: 'Pipes & Directives',                  d: 'built-in pipes, custom pipes, structural/attribute directives', r: 'https://angular.dev/guide/pipes' },
    ],
  },
  {
    cat: 'state',
    topics: [
      { slug: 'component-state-management', t: 'Component State Management', d: 'local state, lifting state up, input/output', r: '' },
      { slug: 'services-as-state-stores',   t: 'Services as State Stores',   d: 'BehaviorSubject pattern, shared services', r: '' },
      { slug: 'introduction-to-rxjs',       t: 'Introduction to RxJS',       d: 'Observable, Subject, basic operators (map, filter, tap)', r: 'https://rxjs.dev/guide/overview' },
    ],
  },
  {
    cat: 'testing',
    topics: [
      { slug: 'unit-testing-basics',    t: 'Unit Testing Basics (Jest/Jasmine)', d: 'describe, it, expect, matchers, setup/teardown', r: 'https://jestjs.io/docs/getting-started' },
      { slug: 'testing-components',     t: 'Testing Components',                 d: 'TestBed, component fixtures, DOM queries', r: 'https://angular.dev/guide/testing' },
      { slug: 'writing-testable-code',  t: 'Writing Testable Code',              d: 'pure functions, dependency injection, mocking basics', r: '' },
    ],
  },
  {
    cat: 'performance',
    topics: [
      { slug: 'browser-devtools-network-performance', t: 'Browser DevTools — Network & Performance', d: 'waterfall, throttling, flame chart basics', r: 'https://developer.chrome.com/docs/devtools/' },
      { slug: 'image-optimization',                   t: 'Image Optimization',                       d: 'lazy loading, srcset, WebP, compression', r: 'https://web.dev/fast/#optimize-your-images' },
      { slug: 'minification-and-bundling-basics',     t: 'Minification & Bundling Basics',           d: 'what bundlers do, minification, tree-shaking concept', r: '' },
    ],
  },
  {
    cat: 'accessibility',
    topics: [
      { slug: 'semantic-html-for-accessibility', t: 'Semantic HTML for Accessibility', d: 'landmark roles, heading hierarchy, alt text', r: 'https://www.w3.org/WAI/tutorials/' },
      { slug: 'keyboard-navigation-basics',      t: 'Keyboard Navigation Basics',      d: 'tab order, focus indicators, skip links', r: 'https://webaim.org/techniques/keyboard/' },
      { slug: 'aria-basics',                     t: 'ARIA Basics',                     d: 'roles, aria-label, aria-describedby, aria-hidden', r: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA' },
      { slug: 'color-contrast-and-visual-design',t: 'Color Contrast & Visual Design',  d: 'WCAG contrast ratios, axe tool, color blindness awareness', r: 'https://webaim.org/resources/contrastchecker/' },
    ],
  },
  {
    cat: 'tooling',
    topics: [
      { slug: 'git-fundamentals',                   t: 'Git Fundamentals',                       d: 'init, add, commit, push, pull, branch, merge, rebase basics', r: 'https://git-scm.com/book' },
      { slug: 'npm-yarn-package-management',        t: 'npm/yarn Package Management',            d: 'package.json, installing, scripts, semantic versioning', r: 'https://docs.npmjs.com/' },
      { slug: 'vs-code-productivity',               t: 'VS Code Productivity',                   d: 'shortcuts, extensions, debugging, settings', r: '' },
      { slug: 'browser-devtools-mastery',           t: 'Browser DevTools Mastery',               d: 'Elements, Console, Network, Application tabs', r: 'https://developer.chrome.com/docs/devtools/' },
      { slug: 'linting-and-formatting-eslint-prettier', t: 'Linting & Formatting (ESLint, Prettier)', d: 'configuration, rules, auto-fix, pre-commit hooks', r: 'https://eslint.org/docs/latest/' },
    ],
  },
  {
    cat: 'dsa',
    topics: [
      { slug: 'big-o-notation-and-complexity',   t: 'Big-O Notation & Complexity',          d: 'time/space complexity, common complexities', r: 'https://www.bigocheatsheet.com/' },
      { slug: 'arrays-strings-two-pointer',      t: 'Arrays & Strings — Two Pointer',       d: 'sorted arrays, palindromes, container with water', r: 'https://leetcode.com/tag/two-pointers/' },
      { slug: 'hash-maps-and-frequency-counters',t: 'Hash Maps & Frequency Counters',       d: 'two sum, anagrams, group anagrams', r: 'https://leetcode.com/tag/hash-table/' },
      { slug: 'stacks-and-queues',               t: 'Stacks & Queues',                      d: 'valid parentheses, min stack, queue using stacks', r: 'https://leetcode.com/tag/stack/' },
      { slug: 'basic-sorting-and-searching',     t: 'Basic Sorting & Searching',            d: 'binary search, merge sort, quick sort concepts', r: 'https://leetcode.com/tag/sorting/' },
      { slug: 'linked-lists-basics',             t: 'Linked Lists Basics',                  d: 'traversal, reversal, detect cycle, merge two sorted', r: 'https://leetcode.com/tag/linked-list/' },
      { slug: 'recursion-fundamentals',          t: 'Recursion Fundamentals',               d: 'base case, recursive case, call stack, factorial, fibonacci', r: '' },
    ],
  },
  {
    cat: 'ai',
    topics: [
      { slug: 'what-are-ai-coding-assistants',     t: 'What are AI Coding Assistants',     d: 'GitHub Copilot, Cursor, Codeium — overview and comparison', r: 'https://github.com/features/copilot' },
      { slug: 'using-copilot-cursor-effectively',  t: 'Using Copilot/Cursor Effectively',  d: 'writing good comments, accepting/rejecting suggestions, tab completion', r: '' },
      { slug: 'basic-prompt-engineering',          t: 'Basic Prompt Engineering',          d: 'clear instructions, examples, iterating on prompts', r: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    ],
  },
  {
    cat: 'soft',
    topics: [
      { slug: 'communication-in-standups',         t: 'Communication in Standups',         d: 'what I did, what I will do, blockers — concise updates', r: '' },
      { slug: 'code-review-etiquette',             t: 'Code Review Etiquette',             d: 'giving constructive feedback, accepting feedback gracefully', r: '' },
      { slug: 'time-management-and-task-estimation',t: 'Time Management & Task Estimation', d: 'breaking down tasks, estimating hours, managing deadlines', r: '' },
      { slug: 'writing-good-documentation',        t: 'Writing Good Documentation',        d: 'README, inline comments, JSDoc/TSDoc basics', r: '' },
    ],
  },
]
