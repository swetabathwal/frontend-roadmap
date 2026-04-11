/**
 * Quiz questions bank, keyed by topic slug.
 * Each topic has an array of question objects:
 * { q: string, options: string[4], correct: 0-3 }
 *
 * Minimum 12 questions per topic to support two different 10-question attempts.
 */

export const QUIZ_QUESTIONS = {
  /* ── HTML / CSS ─────────────────────────────────────────────────────── */
  'html5-semantic-elements': [
    { q: 'Which element represents the primary content area of a page?', options: ['<div>', '<section>', '<main>', '<article>'], correct: 2 },
    { q: 'Which tag is used for navigation links?', options: ['<menu>', '<nav>', '<links>', '<header>'], correct: 1 },
    { q: 'What is the correct semantic element for a self-contained piece of content like a blog post?', options: ['<section>', '<div>', '<article>', '<aside>'], correct: 2 },
    { q: '<aside> is semantically used for:', options: ['Navigation links', 'Content tangentially related to the main content', 'Footer information', 'Page headings'], correct: 1 },
    { q: 'Which element defines the footer of a document or section?', options: ['<bottom>', '<foot>', '<footer>', '<end>'], correct: 2 },
    { q: 'What does "semantic HTML" mean?', options: ['HTML that uses inline styles', 'HTML where elements convey meaning about content', 'HTML with JavaScript embedded', 'HTML that uses only div tags'], correct: 1 },
    { q: '<header> can appear:', options: ['Only once at the top of the page', 'Inside any sectioning element', 'Only inside <body>', 'Only inside <main>'], correct: 1 },
    { q: 'Which element is best for grouping related content with a visible heading?', options: ['<div>', '<article>', '<figure>', '<section>'], correct: 3 },
    { q: '<figure> is typically used for:', options: ['Navigation menus', 'Self-contained media like images with captions', 'Form elements', 'Page sections'], correct: 1 },
    { q: 'What is the purpose of <figcaption>?', options: ['To style images', 'To provide a caption for a <figure> element', 'To create image galleries', 'To link images'], correct: 1 },
    { q: 'Which element should wrap site-wide navigation links?', options: ['<ul>', '<header>', '<nav>', '<menu>'], correct: 2 },
    { q: 'Semantic elements improve:', options: ['JavaScript performance only', 'Accessibility and SEO', 'CSS specificity', 'Page load speed only'], correct: 1 },
    { q: 'What is <time> used for?', options: ['Displaying a countdown timer', 'Representing a specific time or date in machine-readable format', 'Controlling animations', 'Setting time zones'], correct: 1 },
    { q: 'Which element is most appropriate for a sidebar?', options: ['<side>', '<nav>', '<aside>', '<section>'], correct: 2 },
    { q: 'What does the <mark> element do?', options: ['Marks text as deleted', 'Highlights text for reference purposes', 'Makes text bold', 'Creates a bookmark'], correct: 1 },
  ],

  'forms-and-validation': [
    { q: 'Which input type is best for email addresses?', options: ['type="text"', 'type="email"', 'type="username"', 'type="contact"'], correct: 1 },
    { q: 'Which attribute makes a form field required?', options: ['mandatory', 'needed', 'required', 'validate'], correct: 2 },
    { q: 'What does the `pattern` attribute do?', options: ['Styles the input', 'Validates input against a regex', 'Sets a placeholder', 'Groups inputs'], correct: 1 },
    { q: 'Which element groups related form controls with a visible label?', options: ['<group>', '<section>', '<fieldset>', '<div>'], correct: 2 },
    { q: 'What is the purpose of <legend>?', options: ['Adds a title to a table', 'Provides a caption for a <fieldset>', 'Creates list items', 'Defines footer text'], correct: 1 },
    { q: 'What does `novalidate` on a <form> do?', options: ['Disables browser form validation', 'Prevents form submission', 'Makes all fields required', 'Adds custom validation'], correct: 0 },
    { q: 'Which input type shows a date picker in modern browsers?', options: ['type="calendar"', 'type="date"', 'type="datetime"', 'type="picker"'], correct: 1 },
    { q: 'The `for` attribute on <label> should match:', options: ['The input name attribute', 'The input id attribute', 'The input class attribute', 'The form id attribute'], correct: 1 },
    { q: 'Which attribute provides hint text inside an input?', options: ['hint', 'placeholder', 'label', 'description'], correct: 1 },
    { q: 'What event fires when a form is submitted?', options: ['click', 'change', 'submit', 'input'], correct: 2 },
    { q: 'How do you prevent default form submission in JavaScript?', options: ['event.stop()', 'event.preventDefault()', 'form.cancel()', 'return null'], correct: 1 },
    { q: 'Which attribute limits the number of characters in an input?', options: ['max', 'limit', 'maxlength', 'size'], correct: 2 },
    { q: 'Input type="range" creates:', options: ['A number input', 'A slider', 'A dropdown', 'A color picker'], correct: 1 },
    { q: 'Which attribute auto-focuses a field on page load?', options: ['focus', 'autofocus', 'default', 'active'], correct: 1 },
    { q: 'The `autocomplete` attribute helps:', options: ['Validate input automatically', 'The browser suggest previously entered values', 'Auto-submit forms', 'Fill placeholders'], correct: 1 },
  ],

  'css-selectors-and-specificity': [
    { q: 'Which selector has the highest specificity?', options: ['#id', '.class', 'element', '*'], correct: 0 },
    { q: 'What is the specificity of an inline style?', options: ['0,0,1,0', '0,1,0,0', '1,0,0,0', '0,0,0,1'], correct: 2 },
    { q: 'What does the `>` combinator mean?', options: ['Any descendant', 'Direct child only', 'Adjacent sibling', 'General sibling'], correct: 1 },
    { q: 'Which pseudo-class matches the first child element?', options: [':first-element', ':first-of-type', ':first-child', ':nth-child(1)'], correct: 2 },
    { q: 'What does the `+` combinator select?', options: ['All siblings', 'The immediately following sibling', 'Direct children', 'Any descendant'], correct: 1 },
    { q: 'What does `[attr^="value"]` match?', options: ['Elements whose attr ends with value', 'Elements whose attr contains value', 'Elements whose attr starts with value', 'Elements whose attr equals value'], correct: 2 },
    { q: 'Which selector matches an element when hovered?', options: ['::hover', ':hover', '[hover]', ':focus'], correct: 1 },
    { q: 'What is the specificity of `.nav a:hover`?', options: ['0,1,1,1', '0,2,1,0', '0,1,2,0', '0,0,2,1'], correct: 0 },
    { q: '!important in CSS:', options: ['Increases specificity by 1', 'Overrides any declaration regardless of specificity', 'Only works on inline styles', 'Has no effect on cascading'], correct: 1 },
    { q: 'What does `:nth-child(2n+1)` select?', options: ['Even children', 'Odd children', 'Every 2nd child', 'Only the 3rd child'], correct: 1 },
    { q: 'What is the universal selector?', options: ['#', '.', '*', '&'], correct: 2 },
    { q: 'The `~` combinator selects:', options: ['Direct children', 'Adjacent sibling only', 'All following siblings', 'Parent elements'], correct: 2 },
    { q: '::before and ::after are:', options: ['Pseudo-classes', 'Pseudo-elements', 'Attribute selectors', 'Combinators'], correct: 1 },
    { q: 'Which has higher specificity: `div p` or `.text`?', options: ['div p (0,0,0,2)', '.text (0,0,1,0)', 'They are equal', 'It depends on source order'], correct: 1 },
    { q: ':not() pseudo-class:', options: ['Selects no elements', 'Selects elements that do NOT match the argument', 'Only works with class selectors', 'Is not supported in modern CSS'], correct: 1 },
  ],

  'box-model-and-layout-basics': [
    { q: 'What does the CSS box model consist of?', options: ['content, padding, border, margin', 'width, height, color, font', 'display, position, float, clear', 'flex, grid, block, inline'], correct: 0 },
    { q: 'With `box-sizing: border-box`, the width includes:', options: ['Only the content', 'Content and padding', 'Content, padding, and border', 'Content, padding, border, and margin'], correct: 2 },
    { q: 'What is the default value of `position`?', options: ['relative', 'absolute', 'fixed', 'static'], correct: 3 },
    { q: 'Which `display` value removes an element from the document flow?', options: ['inline-block', 'none', 'inline', 'flex'], correct: 1 },
    { q: 'What is the difference between margin and padding?', options: ['Margin is inside the border, padding is outside', 'Padding is inside the border, margin is outside', 'They are identical', 'Margin only works horizontally'], correct: 1 },
    { q: 'What does `position: absolute` position an element relative to?', options: ['The viewport', 'The body', 'The nearest positioned ancestor', 'The document root'], correct: 2 },
    { q: 'What causes margin collapse?', options: ['Using padding instead of margin', 'Adjacent vertical margins combining into one', 'Setting overflow: hidden', 'Using flexbox'], correct: 1 },
    { q: '`position: fixed` positions an element relative to:', options: ['Parent element', 'Document body', 'The viewport', 'Nearest positioned ancestor'], correct: 2 },
    { q: 'What does `overflow: hidden` do?', options: ['Hides the element', 'Clips content that exceeds the element dimensions', 'Adds a scrollbar', 'Prevents interaction'], correct: 1 },
    { q: 'Which display value makes an element appear on its own line but respect width/height?', options: ['inline', 'block', 'inline-block', 'flex'], correct: 1 },
    { q: 'What is the initial containing block?', options: ['The html element', 'The viewport', 'The body element', 'The root positioned ancestor'], correct: 1 },
    { q: '`z-index` only works when position is:', options: ['static', 'Not static (relative, absolute, fixed, sticky)', 'absolute only', 'fixed only'], correct: 1 },
    { q: 'What does `display: inline` NOT support?', options: ['Width and height properties', 'Color properties', 'Font properties', 'Text alignment'], correct: 0 },
    { q: 'What is `position: sticky`?', options: ['Always fixed to viewport', 'Relative until a scroll threshold, then fixed within its container', 'Same as absolute', 'Removed from document flow'], correct: 1 },
    { q: 'Which property controls the stacking order of elements?', options: ['stack', 'order', 'z-index', 'layer'], correct: 2 },
  ],

  'flexbox-layout': [
    { q: 'Which property establishes a flex container?', options: ['flex: 1', 'display: flex', 'flex-direction: row', 'flex-wrap: nowrap'], correct: 1 },
    { q: 'What is the default `flex-direction`?', options: ['column', 'row-reverse', 'column-reverse', 'row'], correct: 3 },
    { q: 'Which property aligns items along the main axis?', options: ['align-items', 'align-content', 'justify-content', 'justify-items'], correct: 2 },
    { q: 'Which property aligns items along the cross axis?', options: ['justify-content', 'align-items', 'flex-align', 'cross-align'], correct: 1 },
    { q: '`justify-content: space-between` means:', options: ['Equal space around all items', 'Items packed to start', 'Equal space between items, no space at edges', 'Items packed to end'], correct: 2 },
    { q: 'What does `flex: 1` mean?', options: ['flex-grow: 1, flex-shrink: 0, flex-basis: auto', 'flex-grow: 1, flex-shrink: 1, flex-basis: 0%', 'flex-basis: 100%', 'flex-grow: 0'], correct: 1 },
    { q: 'Which property controls how flex items wrap?', options: ['flex-flow', 'flex-wrap', 'wrap', 'overflow'], correct: 1 },
    { q: '`align-self` on a flex item:', options: ['Overrides container align-items for that item', 'Changes the main axis', 'Sets item flex-grow', 'Affects all items'], correct: 0 },
    { q: 'What does `flex-shrink: 0` mean?', options: ['Item will not grow', 'Item will not shrink below its flex-basis', 'Item is hidden', 'Item takes no space'], correct: 1 },
    { q: 'Which property sets the initial size of a flex item before free space is distributed?', options: ['flex-grow', 'flex-basis', 'width', 'min-width'], correct: 1 },
    { q: 'What does `order` do in flexbox?', options: ['Sets z-index of item', 'Controls visual rendering order without changing DOM order', 'Sets item priority', 'Reverses flex direction'], correct: 1 },
    { q: 'When flex-direction is column, `justify-content` aligns items:', options: ['Horizontally', 'Vertically', 'Both directions', 'Neither direction'], correct: 1 },
    { q: '`gap` in flexbox:', options: ['Only works in CSS Grid', 'Adds space between flex items', 'Adds margin to container', 'Sets padding on items'], correct: 1 },
    { q: 'What does `flex-wrap: wrap` do?', options: ['Wraps text inside flex items', 'Allows items to wrap onto multiple lines', 'Reverses item order', 'Hides overflowing items'], correct: 1 },
    { q: 'To center a single item both horizontally and vertically in a flex container:', options: ['justify-content: center + align-items: center', 'margin: auto on container', 'flex: center on item', 'position: center'], correct: 0 },
  ],

  'css-grid-basics': [
    { q: 'Which property creates a grid container?', options: ['grid: true', 'display: grid', 'grid-template: 1fr', 'layout: grid'], correct: 1 },
    { q: 'What does `grid-template-columns: repeat(3, 1fr)` create?', options: ['3 rows of equal height', '3 columns of equal width', '3 items with fixed width', 'A 3×3 grid'], correct: 1 },
    { q: 'What is the `fr` unit in CSS Grid?', options: ['Fixed ratio unit', 'Fractional unit of remaining free space', 'Font ratio', 'Frame unit'], correct: 1 },
    { q: 'Which property places an item spanning 2 columns?', options: ['grid-column: span 2', 'column-span: 2', 'grid-width: 2', 'col-span: 2'], correct: 0 },
    { q: 'What does `grid-area` do when used with named template areas?', options: ['Sizes the grid item', 'Places item in named area of template', 'Creates grid rows', 'Hides a grid cell'], correct: 1 },
    { q: 'What does `auto-fill` do in `repeat(auto-fill, minmax(200px, 1fr))`?', options: ['Fills all rows automatically', 'Creates as many columns as fit, possibly leaving empty tracks', 'Same as auto-fit', 'Disables column sizing'], correct: 1 },
    { q: 'The `gap` property in grid sets:', options: ['Padding inside cells', 'Space between rows and columns', 'Margin around the container', 'Border between cells'], correct: 1 },
    { q: 'What is a grid track?', options: ['A named area', 'The space between two grid lines', 'The grid container', 'An explicit grid item'], correct: 1 },
    { q: '`grid-template-areas` uses:', options: ['Numeric coordinates', 'Named strings arranged visually', 'Percentages', 'CSS variables'], correct: 1 },
    { q: 'What is the difference between explicit and implicit grid?', options: ['There is no difference', 'Explicit is defined by template properties; implicit is auto-created for overflow items', 'Implicit requires JavaScript', 'Explicit items are always visible'], correct: 1 },
    { q: 'Which property aligns grid items within their cell along the block axis?', options: ['justify-items', 'align-items', 'place-items', 'grid-align'], correct: 1 },
    { q: 'What does `minmax(100px, 1fr)` mean?', options: ['Exactly 100px or 1fr', 'At least 100px, at most 1fr of free space', 'Between 100px and 1fr random size', 'Max 100px, grows with 1fr'], correct: 1 },
    { q: 'Which shorthand sets both `justify-items` and `align-items` at once?', options: ['place-content', 'grid-items', 'place-items', 'align-justify'], correct: 2 },
    { q: 'What does `grid-column: 1 / -1` mean?', options: ['First column only', 'Span from column line 1 to last column line', 'Negative indexing is invalid', 'Two-column span from left'], correct: 1 },
    { q: 'auto-fit vs auto-fill:', options: ['They are identical', 'auto-fit collapses empty tracks; auto-fill keeps them', 'auto-fill collapses empty tracks; auto-fit keeps them', 'auto-fit only works with fixed sizes'], correct: 1 },
  ],

  'responsive-design-media-queries': [
    { q: 'Which meta tag is required for responsive design?', options: ['<meta name="responsive">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta name="mobile">', '<meta charset="utf-8">'], correct: 1 },
    { q: 'What is mobile-first design?', options: ['Designing only for mobile', 'Starting with mobile styles, adding complexity for larger screens', 'Using a mobile framework', 'Hiding content on desktop'], correct: 1 },
    { q: 'Which media query targets screens wider than 768px?', options: ['@media (max-width: 768px)', '@media (min-width: 768px)', '@media screen and (768px)', '@media (width: 768px)'], correct: 1 },
    { q: 'What does `em` unit in media queries reference?', options: ['The root font-size', 'The parent font-size', 'The browser default font-size (typically 16px)', 'The current element font-size'], correct: 2 },
    { q: 'Which breakpoint approach is considered best practice?', options: ['Desktop-first with max-width', 'Mobile-first with min-width', 'Fixed pixel breakpoints only', 'No breakpoints, use only fluid units'], correct: 1 },
    { q: 'What does `@media (orientation: landscape)` target?', options: ['Printed pages', 'Screens where width > height', 'Screens where height > width', 'Desktop screens only'], correct: 1 },
    { q: 'The `vw` unit equals:', options: ['1% of the viewport height', '1% of the viewport width', '1px', '1% of the parent width'], correct: 1 },
    { q: 'What is a fluid layout?', options: ['A layout with fixed pixel widths', 'A layout using percentages/viewport units that adapts to screen size', 'A layout with CSS animations', 'A layout using JavaScript for resizing'], correct: 1 },
    { q: 'Which CSS property prevents horizontal scroll on mobile?', options: ['overflow: hidden on body', 'max-width: 100vw', 'overflow-x: hidden on html/body', 'width: device-width'], correct: 2 },
    { q: 'What does `clamp(min, preferred, max)` do?', options: ['Creates a clipping mask', 'Sets a value that scales between min and max based on viewport', 'Clamps color values', 'Limits animation duration'], correct: 1 },
    { q: 'The `rem` unit is relative to:', options: ['Parent element font size', 'Root html element font size', 'Viewport width', 'Viewport height'], correct: 1 },
    { q: 'Which media feature detects dark mode preference?', options: ['@media (theme: dark)', '@media (color-scheme: dark)', '@media (prefers-color-scheme: dark)', '@media (mode: dark)'], correct: 2 },
    { q: 'What is a common mobile breakpoint in px?', options: ['400px', '600px', '768px', '1024px'], correct: 2 },
    { q: '`srcset` on an <img> is used for:', options: ['Lazy loading', 'Providing different image resolutions for different screen sizes', 'Image compression', 'SVG fallbacks'], correct: 1 },
    { q: 'To hide an element only on mobile (< 768px):', options: ['@media (max-width: 767px) { display: none }', '@media (min-width: 768px) { display: none }', 'visibility: mobile-hidden', 'display: hide-mobile'], correct: 0 },
  ],

  'css-variables-custom-properties': [
    { q: 'How do you declare a CSS custom property?', options: ['$color: red', '--color: red', 'var-color: red', '#color: red'], correct: 1 },
    { q: 'How do you use a CSS custom property?', options: ['$(--color)', 'var(--color)', 'use(--color)', '#{--color}'], correct: 1 },
    { q: 'Where should global CSS variables typically be declared?', options: ['In every selector that uses them', 'On the :root selector', 'Inside @media queries only', 'On the body element'], correct: 1 },
    { q: 'CSS custom properties are:', options: ['Preprocessor-only features', 'Static at compile time', 'Live DOM values that can be updated with JavaScript', 'Only supported in Chrome'], correct: 2 },
    { q: 'What does `var(--size, 16px)` do?', options: ['Sets --size to 16px', 'Uses --size, falls back to 16px if undefined', 'Adds 16px to --size', 'Errors if --size is missing'], correct: 1 },
    { q: 'CSS custom properties follow:', options: ['Global scope only', 'Normal CSS cascade and inheritance', 'Reverse cascade', 'Block scope like JavaScript'], correct: 1 },
    { q: 'To update a CSS variable with JavaScript:', options: ['document.style.setVar()', 'element.style.setProperty("--var", value)', 'CSS.setVariable()', 'document.cssVars.set()'], correct: 1 },
    { q: 'Can CSS custom properties be used inside calc()?', options: ['No, only SASS variables work there', 'Yes, e.g. calc(var(--size) * 2)', 'Only if the variable is a number', 'Only in modern CSS Grid'], correct: 1 },
    { q: 'How do CSS variables enable theming?', options: ['By generating new CSS files', 'By swapping variable values on :root or a theme class', 'By using JavaScript to rewrite styles', 'By importing different stylesheets'], correct: 1 },
    { q: 'Custom properties are case-sensitive: `--Color` and `--color` are:', options: ['The same variable', 'Different variables', 'Both reference white', 'Invalid syntax'], correct: 1 },
    { q: 'A child element can override a parent\'s custom property by:', options: ['It cannot be overridden', 'Declaring the same variable in its own selector', 'Using !important on var()', 'Creating a new property name'], correct: 1 },
    { q: 'What happens when a CSS variable is invalid at computed value time?', options: ['The browser ignores the property entirely', 'The browser uses the property\'s inherited or initial value', 'A JavaScript error is thrown', 'The variable defaults to 0'], correct: 1 },
  ],

  'basic-animations-and-transitions': [
    { q: 'Which CSS property creates a smooth transition between states?', options: ['animation', 'transition', 'transform', 'keyframes'], correct: 1 },
    { q: 'What does `transition: all 0.3s ease` mean?', options: ['Animate all properties over 0.3ms', 'All properties animate over 0.3 seconds with ease timing', 'Only transform animates', 'Sets animation delay to 0.3s'], correct: 1 },
    { q: 'Which property is used to define a CSS animation?', options: ['transition', '@keyframes with animation', 'transform', 'motion'], correct: 1 },
    { q: 'What does `animation-fill-mode: forwards` do?', options: ['Plays animation forward', 'Element retains styles from the last keyframe after animation ends', 'Loops the animation', 'Delays the animation start'], correct: 1 },
    { q: 'Which easing function creates a linear speed animation?', options: ['ease', 'ease-in', 'linear', 'ease-in-out'], correct: 2 },
    { q: '`transform: translate(50px, 0)` moves an element:', options: ['50px down', '50px to the right', '50px to the left', '50% of parent width'], correct: 1 },
    { q: 'What is the performance benefit of using `transform` and `opacity` for animations?', options: ['They run on the main JavaScript thread', 'They can be hardware-accelerated and bypass layout/paint', 'They use less memory', 'They work in IE11'], correct: 1 },
    { q: 'Which keyword in @keyframes represents the start?', options: ['start', 'begin', 'from', '0%'], correct: 2 },
    { q: '`animation-iteration-count: infinite` makes an animation:', options: ['Run once', 'Loop forever', 'Run 3 times by default', 'Run in reverse'], correct: 1 },
    { q: 'What does `will-change: transform` hint to the browser?', options: ['The element will be removed', 'The browser should prepare optimizations for future transform changes', 'Disables transitions', 'Forces GPU rendering always'], correct: 1 },
    { q: 'Which property delays the start of a transition?', options: ['transition-wait', 'transition-delay', 'animation-lag', 'transition-start'], correct: 1 },
    { q: '`scale(2)` in transform:', options: ['Moves the element 2px', 'Doubles the element\'s size', 'Rotates 2 degrees', 'Applies 2x opacity'], correct: 1 },
  ],

  'bem-naming-convention': [
    { q: 'What does BEM stand for?', options: ['Block, Element, Modifier', 'Base, Extend, Mixin', 'Block, Event, Method', 'Bold, Emphasis, Markup'], correct: 0 },
    { q: 'In BEM, how is an element written?', options: ['block.element', 'block--element', 'block__element', 'block-element'], correct: 2 },
    { q: 'In BEM, how is a modifier written?', options: ['block__modifier', 'block-modifier', 'block--modifier', 'block.modifier'], correct: 2 },
    { q: 'What is a "Block" in BEM?', options: ['A CSS block element', 'A standalone, reusable component', 'A div with display:block', 'A CSS block comment'], correct: 1 },
    { q: 'Which class name follows BEM correctly for a button\'s active state?', options: ['button-active', 'button.active', 'button__active', 'button--active'], correct: 3 },
    { q: 'BEM improves CSS by:', options: ['Using only !important for overrides', 'Reducing specificity conflicts through naming conventions', 'Generating CSS automatically', 'Removing the need for classes'], correct: 1 },
    { q: 'Can a BEM element have its own modifiers?', options: ['No, only blocks have modifiers', 'Yes, e.g. block__element--modifier', 'Only in SASS', 'Only with JavaScript'], correct: 1 },
    { q: 'Which is NOT valid BEM?', options: ['nav__item', 'nav--open', 'nav__item--active', 'nav__item__icon'], correct: 3 },
    { q: 'An Element in BEM:', options: ['Can exist independently', 'Is always tied to a Block and has no meaning without it', 'Is always a modifier', 'Must be a semantic HTML element'], correct: 1 },
    { q: 'BEM is primarily a:', options: ['CSS preprocessor', 'CSS naming methodology', 'JavaScript framework', 'Build tool'], correct: 1 },
    { q: 'What problem does BEM solve?', options: ['CSS performance issues', 'Name collisions and unpredictable cascades in large projects', 'Browser compatibility', 'Responsive design'], correct: 1 },
    { q: 'A block modifier in BEM affects:', options: ['Only child elements', 'The block and potentially its elements', 'Only the first element', 'Nothing — modifiers are decorative only'], correct: 1 },
  ],

  /* ── JavaScript ──────────────────────────────────────────────────────── */
  'variables-and-data-types': [
    { q: 'What is the difference between `let` and `const`?', options: ['const is faster', 'let allows reassignment; const does not', 'const only works with numbers', 'let is deprecated'], correct: 1 },
    { q: 'What does `typeof null` return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2 },
    { q: 'Which of the following is a primitive data type?', options: ['Array', 'Object', 'Symbol', 'Function'], correct: 2 },
    { q: 'What happens when you compare `==` vs `===`?', options: ['== checks type too; === does not', '=== allows type coercion; == does not', '== does type coercion; === checks both value and type strictly', 'They are identical'], correct: 2 },
    { q: 'What is `undefined`?', options: ['A variable set to nothing explicitly', 'A variable declared but not assigned a value', 'Same as null', 'An error state'], correct: 1 },
    { q: 'What is the result of `"5" + 3` in JavaScript?', options: ['"8"', '8', '"53"', 'NaN'], correct: 2 },
    { q: 'What is type coercion?', options: ['Converting variables manually', 'JavaScript automatically converting types during operations', 'Declaring typed variables', 'Using TypeScript'], correct: 1 },
    { q: 'Which keyword creates a block-scoped variable that cannot be reassigned?', options: ['var', 'let', 'const', 'fixed'], correct: 2 },
    { q: 'What does `NaN` mean?', options: ['Null and Nothing', 'Not a Number — result of invalid numeric operations', 'New and Needed', 'Network and Node'], correct: 1 },
    { q: 'What is the result of `typeof function(){}`?', options: ['"object"', '"callable"', '"function"', '"method"'], correct: 2 },
    { q: 'The `var` keyword is:', options: ['Block-scoped and not hoisted', 'Function-scoped and hoisted', 'Block-scoped and hoisted', 'Not supported in ES6+'], correct: 1 },
    { q: 'Which value is falsy in JavaScript?', options: ['"false"', '"0"', '0', '[]'], correct: 2 },
    { q: 'What does the `typeof` operator return for an array?', options: ['"array"', '"list"', '"object"', '"collection"'], correct: 2 },
    { q: 'What is the result of `null == undefined`?', options: ['false', 'true', 'null', 'TypeError'], correct: 1 },
    { q: 'Which is a valid way to check if a variable is an array?', options: ['typeof arr === "array"', 'arr instanceof Array', 'arr.isArray()', 'typecheck(arr)'], correct: 1 },
  ],

  'functions-and-scope': [
    { q: 'What is a closure?', options: ['A function with no return value', 'A function that remembers variables from its outer scope even after that scope has ended', 'An immediately invoked function', 'A function with only one parameter'], correct: 1 },
    { q: 'Arrow functions differ from regular functions in that they:', options: ['Cannot return values', 'Do not have their own `this` binding', 'Are always async', 'Cannot take parameters'], correct: 1 },
    { q: 'What is hoisting?', options: ['Moving functions to the top of the file manually', 'JavaScript moving variable/function declarations to the top of their scope at runtime', 'Calling functions before defining them', 'A build tool optimization'], correct: 1 },
    { q: 'What is lexical scope?', options: ['Scope determined at runtime', 'Scope determined by where variables and functions are written in the code', 'Scope within a try/catch block', 'Global scope only'], correct: 1 },
    { q: 'What does `function.length` return?', options: ['Number of times the function was called', 'Number of parameters in the function definition', 'Size of the function body', 'Return value count'], correct: 1 },
    { q: 'A function declaration vs a function expression:', options: ['They are identical', 'Declarations are hoisted entirely; expressions are not', 'Expressions are faster', 'Declarations cannot be assigned to variables'], correct: 1 },
    { q: 'What is an IIFE?', options: ['A type of loop', 'Immediately Invoked Function Expression — runs immediately when defined', 'An interface definition', 'A function that returns itself'], correct: 1 },
    { q: 'Default parameters in ES6 allow:', options: ['Function overloading', 'Providing fallback values when arguments are undefined', 'Making parameters required', 'Returning multiple values'], correct: 1 },
    { q: 'What is the rest parameter (`...args`) used for?', options: ['Spreading an array into arguments', 'Collecting all remaining arguments into an array', 'Async operations', 'Object destructuring'], correct: 1 },
    { q: 'In a regular function, `this` is determined by:', options: ['Where the function is defined', 'How the function is called', 'The file it\'s in', 'The number of arguments'], correct: 1 },
    { q: 'What is a pure function?', options: ['A function with no parameters', 'A function that always returns the same output for same inputs and has no side effects', 'A function used in functional programming only', 'An arrow function'], correct: 1 },
    { q: 'What does `return` without a value return?', options: ['null', '0', 'undefined', 'false'], correct: 2 },
    { q: 'What is the call stack?', options: ['A list of event listeners', 'A data structure that tracks function invocations', 'The browser\'s network queue', 'A type of recursion'], correct: 1 },
    { q: 'What is a first-class function?', options: ['The main function in a file', 'Functions treated as values — can be passed and returned', 'A function that runs first at startup', 'A callback function'], correct: 1 },
    { q: 'Block scope was introduced in JavaScript with:', options: ['ES3', 'ES5', 'ES6 (ES2015)', 'ES2020'], correct: 2 },
  ],

  'arrays-and-array-methods': [
    { q: 'What does `Array.map()` return?', options: ['The original array modified', 'A new array with transformed elements', 'An object with keys', 'undefined'], correct: 1 },
    { q: 'What does `Array.filter()` do?', options: ['Removes duplicates', 'Returns new array with elements that pass a test', 'Modifies original array', 'Sorts the array'], correct: 1 },
    { q: 'What does `Array.reduce()` do?', options: ['Reduces array length by 1', 'Accumulates array values into a single result', 'Filters values below a threshold', 'Reverses the array'], correct: 1 },
    { q: 'What does `arr.find()` return?', options: ['Index of first match', 'The first element that satisfies the condition', 'A new array with matches', 'true or false'], correct: 1 },
    { q: 'What is the spread operator `...` used for with arrays?', options: ['Filtering', 'Creating a shallow copy or merging arrays', 'Sorting', 'Filtering duplicates'], correct: 1 },
    { q: 'What does `Array.some()` return?', options: ['Array of truthy elements', 'Count of matching elements', 'true if at least one element passes the test', 'The first truthy element'], correct: 2 },
    { q: 'What does `Array.every()` return?', options: ['true if all elements pass the test', 'The array unchanged', 'Count of elements', 'An object'], correct: 0 },
    { q: '`arr.forEach()` differs from `arr.map()` in that:', options: ['forEach is faster', 'forEach returns undefined; map returns a new array', 'forEach modifies original; map does not', 'They are identical'], correct: 1 },
    { q: 'What does `arr.flat()` do?', options: ['Sorts the array', 'Converts 2D array to object', 'Flattens nested arrays into one level', 'Removes falsy values'], correct: 2 },
    { q: '`Array.from("hello")` creates:', options: ["['hello']", "['h','e','l','l','o']", 'Error', '"hello"'], correct: 1 },
    { q: 'What does `arr.includes(value)` return?', options: ['Index of value', 'true/false whether value is in array', 'Count of occurrences', 'New array without value'], correct: 1 },
    { q: '`arr.splice(1, 2)` removes:', options: ['First 2 elements', '2 elements starting at index 1', 'Elements with value 1 or 2', 'Last 2 elements'], correct: 1 },
    { q: 'What is a shallow copy?', options: ['A copy where nested objects are shared by reference', 'A copy with all nested objects deeply cloned', 'A copy of only the first element', 'An invalid copy'], correct: 0 },
    { q: '`arr.sort()` without a comparator sorts by:', options: ['Numeric value', 'Unicode character order', 'Insertion order', 'Length'], correct: 1 },
    { q: 'What does `Array.isArray([])` return?', options: ['false', '"array"', 'true', 'undefined'], correct: 2 },
  ],

  'objects-and-destructuring': [
    { q: 'What is object destructuring?', options: ['Deleting object properties', 'Extracting values from objects into variables', 'Cloning objects', 'Converting objects to arrays'], correct: 1 },
    { q: 'What does `const { a, b } = obj` do?', options: ['Creates a new object', 'Extracts properties `a` and `b` from `obj` as variables', 'Merges two objects', 'Modifies the original object'], correct: 1 },
    { q: 'What does the spread operator do with objects?', options: ['Removes all properties', 'Creates a shallow merge/copy of an object', 'Deep clones the object', 'Freezes the object'], correct: 1 },
    { q: 'How do you rename a destructured property?', options: ['const { a as b } = obj', 'const { a: b } = obj', 'const { a => b } = obj', 'const { a: "b" } = obj'], correct: 1 },
    { q: 'What does `Object.keys(obj)` return?', options: ['Object values array', 'Array of property names', 'Array of [key, value] pairs', 'Object prototype chain'], correct: 1 },
    { q: 'What does `Object.assign()` do?', options: ['Compares two objects', 'Copies properties from source to target (shallow)', 'Deep clones an object', 'Removes properties'], correct: 1 },
    { q: 'Optional chaining `?.` prevents:', options: ['Type errors', 'TypeError when accessing property of null/undefined', 'Syntax errors', 'Infinite loops'], correct: 1 },
    { q: 'What is the nullish coalescing operator `??`?', options: ['Returns right side if left is falsy', 'Returns right side if left is null or undefined', 'Strict equality check', 'Deep merge operator'], correct: 1 },
    { q: 'Computed property names allow:', options: ['Dynamic property names using [] in object literals', 'Auto-computing property values', 'Async property access', 'Private properties'], correct: 0 },
    { q: 'What does `Object.freeze()` do?', options: ['Deep clones the object', 'Prevents adding, deleting, or modifying properties', 'Makes object immutable deeply', 'Locks object to a specific type'], correct: 1 },
    { q: 'What does `{ a, b }` shorthand mean in an object literal?', options: ['Same as { a: undefined, b: undefined }', 'Same as { a: a, b: b }', 'Creates empty properties', 'Same as Object.create({a, b})'], correct: 1 },
    { q: 'How do you destructure with a default value?', options: ['const { a || 5 } = obj', 'const { a = 5 } = obj', 'const { a: 5 } = obj', 'const { a ?? 5 } = obj'], correct: 1 },
    { q: 'What does `Object.entries(obj)` return?', options: ['Array of keys', 'Array of values', 'Array of [key, value] pairs', 'Array of prototype methods'], correct: 2 },
    { q: 'Rest in destructuring `const { a, ...rest } = obj` does:', options: ['Copies object to `rest`', 'Puts all properties except `a` into `rest`', 'Spreads rest into `a`', 'Throws an error'], correct: 1 },
    { q: 'What is the prototype chain?', options: ['Array of methods on a class', 'The chain of objects JavaScript searches for properties', 'A linked list data structure', 'The import system'], correct: 1 },
  ],

  'dom-manipulation': [
    { q: 'What does `document.querySelector()` do?', options: ['Returns all matching elements', 'Returns the first element matching the CSS selector', 'Creates an element', 'Removes an element'], correct: 1 },
    { q: 'How do you create a new DOM element?', options: ['document.newElement("div")', 'document.createElement("div")', 'new Element("div")', 'DOM.create("div")'], correct: 1 },
    { q: 'What does `element.appendChild()` do?', options: ['Creates a child element', 'Inserts an element as the last child', 'Removes all children', 'Replaces existing children'], correct: 1 },
    { q: 'How do you add a CSS class to an element?', options: ['element.class.add()', 'element.addClass()', 'element.classList.add()', 'element.style.class = ""'], correct: 2 },
    { q: 'What does `element.textContent` vs `innerHTML` difference?', options: ['They are identical', 'textContent is safe (plain text); innerHTML parses HTML and has XSS risk', 'innerHTML is faster always', 'textContent is deprecated'], correct: 1 },
    { q: 'What does `querySelectorAll` return?', options: ['An Array of elements', 'A static NodeList of all matching elements', 'A live HTMLCollection', 'The first match only'], correct: 1 },
    { q: '`element.setAttribute("data-id", "5")` does:', options: ['Removes the attribute', 'Sets the data-id attribute value to "5"', 'Creates a new element with id 5', 'Triggers a data event'], correct: 1 },
    { q: 'To remove an element from the DOM:', options: ['element.delete()', 'element.remove()', 'document.remove(element)', 'element.destroy()'], correct: 1 },
    { q: 'What does `element.closest()` do?', options: ['Finds the nearest sibling', 'Traverses parents to find the closest matching ancestor', 'Finds the closest text node', 'Gets the center position of an element'], correct: 1 },
    { q: 'What is event delegation?', options: ['Passing events to async functions', 'Attaching one listener to a parent to handle events from children', 'Delegating DOM updates to a worker', 'Removing events after they fire'], correct: 1 },
    { q: 'What is the DOM?', options: ['JavaScript engine', 'A programming language', 'Tree representation of HTML that can be manipulated', 'The browser rendering pipeline'], correct: 2 },
    { q: '`element.insertAdjacentHTML("beforeend", html)` inserts:', options: ['Before the element', 'After the element', 'Inside the element at the end', 'Replaces inner HTML'], correct: 2 },
  ],

  'events-and-event-delegation': [
    { q: 'What is event bubbling?', options: ['Events fire twice', 'Events propagate from the target up through ancestors', 'Events that create new DOM nodes', 'Events fired on window only'], correct: 1 },
    { q: 'What does `event.stopPropagation()` do?', options: ['Prevents the default action', 'Stops the event from bubbling further', 'Removes the event listener', 'Stops all events on the page'], correct: 1 },
    { q: 'What does `event.preventDefault()` do?', options: ['Stops bubbling', 'Prevents the browser\'s default behavior for the event', 'Removes event listeners', 'Pauses execution'], correct: 1 },
    { q: 'What is `event.target`?', options: ['The element the listener is attached to', 'The element that originally triggered the event', 'The window object', 'The event type'], correct: 1 },
    { q: 'What is `event.currentTarget`?', options: ['The element that triggered the event', 'The element the event listener is attached to', 'The parent element', 'The document object'], correct: 1 },
    { q: 'Event delegation works by:', options: ['Adding listeners to every child', 'Adding one listener to a parent and using event.target to handle children', 'Using document.addEventListener', 'Using event capture phase only'], correct: 1 },
    { q: 'What is event capturing?', options: ['Recording events to a log', 'Events propagating from document down to the target before bubbling', 'Preventing default browser actions', 'Cloning events'], correct: 1 },
    { q: 'Which event fires when the DOM is fully loaded but before images?', options: ['load', 'ready', 'DOMContentLoaded', 'domready'], correct: 2 },
    { q: 'How do you add an event listener that fires only once?', options: ['addEventListener("click", fn, {once: true})', 'addEventListener("click", fn, 1)', 'addEventListener("click", fn, {single: true})', 'addSingleEventListener("click", fn)'], correct: 0 },
    { q: 'Which event fires when a form input value changes and loses focus?', options: ['input', 'keyup', 'change', 'blur'], correct: 2 },
    { q: 'What is the `input` event for?', options: ['Fires on form submission', 'Fires every time the value of an input changes', 'Fires when an input is focused', 'Fires on keyboard shortcuts only'], correct: 1 },
    { q: 'To remove an event listener, you need:', options: ['A reference to the exact same function', 'Just the event type', 'A unique event ID', 'It cannot be removed after adding'], correct: 0 },
  ],

  'es6-plus-features': [
    { q: 'What are template literals?', options: ['HTML templates', 'String literals using backticks that support interpolation and multiline', 'A templating framework', 'Literal type annotations'], correct: 1 },
    { q: 'What does optional chaining (`?.`) do?', options: ['Creates optional parameters', 'Short-circuits to undefined if a property is null/undefined instead of throwing', 'Merges two objects optionally', 'Defines optional type constraints'], correct: 1 },
    { q: 'What is the nullish coalescing operator (`??`)?', options: ['Returns the right side if left is any falsy value', 'Returns the right side only if left is null or undefined', 'Strict equality check', 'Converts null to false'], correct: 1 },
    { q: 'Arrow functions are best used when:', options: ['You need `this` to refer to the enclosing scope', 'You need a new `this` binding', 'You need `arguments` object', 'You need a named function expression'], correct: 0 },
    { q: 'What is destructuring in ES6?', options: ['Breaking down objects and arrays into variables', 'Deleting object properties', 'Compiling code', 'A type system feature'], correct: 0 },
    { q: 'What does `...spread` do on a function call?', options: ['Collects arguments into array', 'Spreads an array/iterable as individual arguments', 'Creates default parameters', 'Clones the function'], correct: 1 },
    { q: 'What are default parameters?', options: ['Parameters defined in a config file', 'Values used when an argument is undefined', 'Required parameters', 'Parameters with type annotations'], correct: 1 },
    { q: 'ES6 modules use which syntax to export?', options: ['module.exports = ', 'export / export default', 'require()', 'define()'], correct: 1 },
    { q: 'What is a Symbol in ES6?', options: ['A math operator', 'A unique, immutable primitive value often used as object keys', 'A CSS selector', 'A template placeholder'], correct: 1 },
    { q: '`for...of` loop iterates over:', options: ['Object keys', 'Iterable values (arrays, strings, Maps, Sets)', 'Object property indices', 'Only numeric arrays'], correct: 1 },
    { q: 'What is the purpose of `Object.fromEntries()`?', options: ['Converts object to array', 'Converts array of [key, value] pairs back to an object', 'Lists object keys', 'Creates objects from class definitions'], correct: 1 },
    { q: 'Logical assignment `||=` means:', options: ['Assign only if left is null', 'Assign right to left if left is falsy', 'Assign only if types match', 'OR with assignment priority'], correct: 1 },
  ],

  'closures-and-lexical-scope': [
    { q: 'A closure is created when:', options: ['A function is called', 'A function references variables from its outer scope after the outer function has returned', 'Using the `new` keyword', 'An arrow function is defined'], correct: 1 },
    { q: 'What is lexical scope?', options: ['Runtime scope resolution', 'Scope determined by the physical location of code in source', 'Dynamic scope in strict mode', 'Global-only scope'], correct: 1 },
    { q: 'A common use of closures is:', options: ['Defining classes', 'Creating private variables and function factories', 'Async operations', 'DOM manipulation'], correct: 1 },
    { q: 'What will `setTimeout(() => console.log(i), 0)` inside a `for (let i...)` loop log?', options: ['Always 0', 'Always the last value of i', 'Correct incremented values due to let\'s block scope', 'A ReferenceError'], correct: 2 },
    { q: 'The classic "loop closure bug" with `var` happens because:', options: ['var is broken in loops', 'All callbacks share the same `i` variable due to var\'s function scope', 'setTimeout is async', 'Closures don\'t work with numbers'], correct: 1 },
    { q: 'What is a function factory?', options: ['A design pattern using classes', 'A function that creates and returns other functions with captured state', 'A factory class method', 'A build system term'], correct: 1 },
    { q: 'In the module pattern, closures provide:', options: ['Better performance', 'Private state that can\'t be accessed from outside', 'Async capabilities', 'Prototype chaining'], correct: 1 },
    { q: 'What does it mean for a closure to "close over" a variable?', options: ['It locks the variable\'s type', 'It captures a reference to the variable, not the value at creation time', 'It copies the variable\'s value at creation time', 'It prevents variable mutations'], correct: 1 },
    { q: 'Which keyword introduced true block scoping to JavaScript?', options: ['var', 'function', 'let/const', 'block'], correct: 2 },
    { q: 'Memory leaks from closures occur when:', options: ['Closures are nested too deeply', 'Closures hold references to large objects longer than needed', 'Using let instead of var', 'Returning closures from functions'], correct: 1 },
    { q: 'What is an IIFE and why use it?', options: ['An imported interface — used for types', 'Immediately Invoked Function Expression — used to create a new scope', 'An internal iterator — used for loops', 'An implicit function — used in arrow syntax'], correct: 1 },
    { q: 'Closures allow function composition because:', options: ['They improve performance', 'They capture arguments and return new functions', 'They run synchronously', 'They bypass the call stack'], correct: 1 },
  ],

  'promises-and-async-await': [
    { q: 'What does a Promise represent?', options: ['A guaranteed function return', 'A value that may be available now, in the future, or never', 'An error handler', 'A synchronous callback'], correct: 1 },
    { q: 'What are the three states of a Promise?', options: ['start, running, done', 'pending, fulfilled, rejected', 'waiting, complete, failed', 'new, active, resolved'], correct: 1 },
    { q: 'What does `async` before a function do?', options: ['Makes it run in a web worker', 'Makes the function always return a Promise', 'Makes it synchronous', 'Enables top-level await'], correct: 1 },
    { q: '`await` can only be used:', options: ['Inside any function', 'Inside an async function (or top-level module)', 'Only on Promises', 'Inside try/catch blocks'], correct: 1 },
    { q: 'What does `Promise.all([p1, p2])` do?', options: ['Runs promises sequentially', 'Resolves when all promises resolve; rejects if any reject', 'Returns the first resolved promise', 'Ignores rejections'], correct: 1 },
    { q: 'What does `.catch()` on a Promise do?', options: ['Stops promise execution', 'Handles a rejected promise', 'Creates a new promise', 'Adds a timeout'], correct: 1 },
    { q: '`Promise.race([p1, p2])` resolves/rejects with:', options: ['The last settled promise', 'The first promise to settle', 'Only fulfilled promises', 'Only rejected promises'], correct: 1 },
    { q: 'What does `Promise.allSettled()` do?', options: ['Same as Promise.all', 'Waits for all to settle regardless of result', 'Returns only fulfilled results', 'Cancels other promises'], correct: 1 },
    { q: 'Error handling in async/await uses:', options: ['reject() callback', 'try/catch blocks', '.error() method', 'Promise.catch only'], correct: 1 },
    { q: 'What is the event loop\'s role with Promises?', options: ['It creates Promises', 'It processes microtask queue (resolved callbacks) before the next task', 'It rejects timed-out Promises', 'It converts callbacks to Promises'], correct: 1 },
    { q: 'Promise chaining works by:', options: ['Nesting then() inside then()', 'Each .then() returning a new Promise', 'Using await inside then()', 'Calling resolve() multiple times'], correct: 1 },
    { q: 'What does `Promise.resolve(value)` create?', options: ['A rejected Promise', 'A pending Promise', 'An already-fulfilled Promise', 'A synchronous value'], correct: 2 },
  ],

  'error-handling': [
    { q: 'What does `try/catch` do?', options: ['Prevents errors from occurring', 'Catches and handles errors thrown in the try block', 'Logs errors to console', 'Retries failed code'], correct: 1 },
    { q: 'What is `finally` block used for?', options: ['Runs only if no error occurs', 'Runs regardless of whether an error was thrown or not', 'Rethrows errors', 'Defines fallback values'], correct: 1 },
    { q: 'How do you create a custom error?', options: ['throw new CustomError()', 'class MyError extends Error {}', 'Both A and B', 'Using error factories only'], correct: 2 },
    { q: 'What does `throw` do?', options: ['Logs an error', 'Terminates the program', 'Throws an exception that propagates up the call stack', 'Retries the operation'], correct: 2 },
    { q: 'What types of values can be thrown?', options: ['Only Error instances', 'Only strings', 'Any value', 'Only numbers and strings'], correct: 2 },
    { q: 'How do you catch errors in async/await?', options: ['.catch() only', 'try/catch around await calls', 'Promise.reject()', 'Errors in async functions cannot be caught'], correct: 1 },
    { q: 'What is `error.message`?', options: ['The error type', 'The human-readable description of the error', 'The stack trace', 'The error code'], correct: 1 },
    { q: 'What is `error.stack`?', options: ['An array of error objects', 'The error message only', 'A string showing where the error was thrown and call history', 'The number of stack frames'], correct: 2 },
    { q: 'What is an unhandled promise rejection?', options: ['A rejected Promise with no .catch() or try/catch handler', 'A Promise rejected with null', 'A Promise that times out', 'A synchronous error in a Promise'], correct: 0 },
    { q: 'What is a common use case for custom error classes?', options: ['Styling error messages', 'Different error types for more specific error handling', 'Making errors async', 'Replacing try/catch'], correct: 1 },
    { q: 'What does re-throwing an error mean?', options: ['Throwing a new error', 'Catching an error and then throwing it again to propagate further', 'Logging and ignoring an error', 'Converting error type'], correct: 1 },
    { q: 'What is the Error object\'s `name` property?', options: ['The variable name', 'The error type (e.g., "TypeError", "RangeError")', 'The file name where error occurred', 'The function name'], correct: 1 },
  ],

  'fetch-api-and-http-basics': [
    { q: 'What does `fetch()` return?', options: ['The response data directly', 'A Promise that resolves to a Response object', 'An XMLHttpRequest object', 'The JSON data'], correct: 1 },
    { q: 'What is a GET request used for?', options: ['Creating new resources', 'Retrieving data from a server', 'Deleting resources', 'Updating resources'], correct: 1 },
    { q: 'Which status code means "Not Found"?', options: ['200', '201', '401', '404'], correct: 3 },
    { q: 'What does HTTP status 200 mean?', options: ['Created', 'No Content', 'OK — request succeeded', 'Redirect'], correct: 2 },
    { q: 'How do you send JSON data with `fetch`?', options: ['fetch(url, { data: obj })', 'fetch(url, { method: "POST", body: JSON.stringify(obj), headers: {"Content-Type": "application/json"} })', 'fetch.post(url, obj)', 'fetch(url, obj)'], correct: 1 },
    { q: 'What does `.json()` on a Response do?', options: ['Converts response to string', 'Returns a Promise resolving to parsed JSON', 'Validates JSON format', 'Serializes data to JSON'], correct: 1 },
    { q: 'What is CORS?', options: ['A type of HTTP method', 'Cross-Origin Resource Sharing — a browser security mechanism', 'A caching strategy', 'A form of authentication'], correct: 1 },
    { q: 'Which HTTP method should be used to partially update a resource?', options: ['PUT', 'POST', 'PATCH', 'GET'], correct: 2 },
    { q: 'What does an HTTP header do?', options: ['Defines HTML structure', 'Passes additional metadata with requests/responses', 'Encrypts requests', 'Specifies image formats'], correct: 1 },
    { q: 'Which status code means "Unauthorized"?', options: ['400', '403', '401', '500'], correct: 2 },
    { q: 'What is the purpose of async/await with fetch?', options: ['Speeds up network requests', 'Allows writing async code in a synchronous-looking style', 'Cancels failed requests', 'Adds retry logic automatically'], correct: 1 },
    { q: 'What does HTTP 500 status mean?', options: ['Bad Request', 'Not Found', 'Internal Server Error', 'Service Unavailable'], correct: 2 },
  ],

  'local-storage-and-session-storage': [
    { q: 'What is the difference between localStorage and sessionStorage?', options: ['localStorage is faster', 'localStorage persists after browser close; sessionStorage is cleared when tab closes', 'sessionStorage stores more data', 'They are identical'], correct: 1 },
    { q: 'How do you save data to localStorage?', options: ['localStorage.set("key", value)', 'localStorage.setItem("key", value)', 'localStorage["key"] = value', 'storage.save("key", value)'], correct: 1 },
    { q: 'What data types can localStorage store?', options: ['Any JavaScript type', 'Only strings', 'Strings and Numbers', 'JSON objects directly'], correct: 1 },
    { q: 'How do you store an object in localStorage?', options: ['localStorage.setItem("key", object)', 'localStorage.setItem("key", JSON.stringify(object))', 'localStorage.setObject("key", object)', 'object.saveToStorage("key")'], correct: 1 },
    { q: 'What does `localStorage.getItem("key")` return if key doesn\'t exist?', options: ['undefined', '0', 'null', 'false'], correct: 2 },
    { q: 'How do you retrieve and parse a stored object?', options: ['localStorage.getItem("key")', 'JSON.parse(localStorage.getItem("key"))', 'localStorage.getObject("key")', 'JSON.get(localStorage, "key")'], correct: 1 },
    { q: 'What is the typical localStorage storage limit?', options: ['512KB', '1MB', '5-10MB', '100MB'], correct: 2 },
    { q: 'How do you remove a single item from localStorage?', options: ['localStorage.delete("key")', 'delete localStorage["key"]', 'localStorage.removeItem("key")', 'localStorage.clear("key")'], correct: 2 },
    { q: 'What does `localStorage.clear()` do?', options: ['Clears only one item', 'Removes all items from localStorage for this origin', 'Resets to default values', 'Clears sessionStorage too'], correct: 1 },
    { q: 'localStorage is scoped to:', options: ['The specific tab', 'The browser only', 'The same origin (protocol + domain + port)', 'The user account'], correct: 2 },
    { q: 'What event fires when localStorage is modified in another tab?', options: ['change', 'storage', 'localchange', 'sync'], correct: 1 },
    { q: 'localStorage can cause issues with sensitive data because:', options: ['It expires quickly', 'It is accessible via JavaScript and not encrypted — XSS attacks can read it', 'It uses too much memory', 'It requires HTTPS'], correct: 1 },
  ],

  /* ── TypeScript ──────────────────────────────────────────────────────── */
  'basic-types-and-type-annotations': [
    { q: 'What is the purpose of TypeScript?', options: ['To replace JavaScript', 'To add static type checking to JavaScript', 'To compile to WebAssembly', 'To add runtime type checking'], correct: 1 },
    { q: 'What is the `unknown` type?', options: ['Same as `any`', 'A type-safe counterpart to `any` — requires type narrowing before use', 'An undefined variable', 'An error type'], correct: 1 },
    { q: 'What does `never` type represent?', options: ['A nullable type', 'Values that never occur (unreachable code, infinite loops, always-throwing functions)', 'An empty array', 'A void function'], correct: 1 },
    { q: 'What is a tuple type in TypeScript?', options: ['An object type', 'An array with a fixed number of elements of specific types at specific positions', 'A generic array', 'A named pair'], correct: 1 },
    { q: 'What is `any` in TypeScript?', options: ['The base type', 'Disables type checking for that value — opt out of the type system', 'A union of all types', 'A strict type'], correct: 1 },
    { q: 'How do you annotate a string parameter in TypeScript?', options: ['param: String', 'param: string', 'string param', 'param as string'], correct: 1 },
    { q: 'What does `readonly` modifier do?', options: ['Makes field private', 'Prevents reassignment after initialization', 'Makes the field optional', 'Creates a getter only'], correct: 1 },
    { q: 'What is a union type?', options: ['Merging two objects', 'A value that can be one of several types: `string | number`', 'Inheriting from multiple interfaces', 'A function that returns different types'], correct: 1 },
    { q: 'What is type inference?', options: ['Manual type declaration', 'TypeScript automatically deducing types from values', 'Runtime type checking', 'Casting types'], correct: 1 },
    { q: 'What does the `?` in `name?: string` mean?', options: ['name can be null only', 'name is optional (string | undefined)', 'Ternary type', 'name is deprecated'], correct: 1 },
    { q: 'What does `as` keyword do in TypeScript?', options: ['Assigns a value', 'Performs a type assertion (tells TS to treat value as a type)', 'Imports a module alias', 'Creates an alias for a class'], correct: 1 },
    { q: 'TypeScript compiles to:', options: ['Machine code', 'WebAssembly', 'JavaScript', 'Bytecode'], correct: 2 },
  ],

  'interfaces-and-type-aliases': [
    { q: 'What is the key difference between `interface` and `type`?', options: ['interface is faster', 'Interfaces can be extended/merged; types are more flexible (unions, tuples)', 'type supports methods; interface does not', 'They are completely interchangeable'], correct: 1 },
    { q: 'How do you extend an interface?', options: ['interface B = A', 'interface B extends A {}', 'interface B implements A {}', 'interface B inherits A {}'], correct: 1 },
    { q: 'What is declaration merging?', options: ['Merging two files', 'Multiple declarations of the same interface being combined automatically', 'Merging classes and interfaces', 'Combining types with &'], correct: 1 },
    { q: 'What does `&` (intersection type) do?', options: ['Combines any type with unknown', 'Creates a type that must satisfy both types', 'Same as extends', 'Removes properties from types'], correct: 1 },
    { q: 'How do you make an interface property optional?', options: ['property!: string', 'property?: string', 'optional property: string', 'property: string?'], correct: 1 },
    { q: 'A type alias can represent:', options: ['Only object shapes', 'Only primitives', 'Any type including unions, intersections, tuples, primitives', 'Only functions'], correct: 2 },
    { q: 'What is the `Partial<T>` utility type?', options: ['Makes all properties required', 'Makes all properties optional', 'Removes all properties', 'Returns a subset type'], correct: 1 },
    { q: 'What does `Required<T>` do?', options: ['Makes all properties readonly', 'Makes all optional properties required', 'Removes all methods', 'Validates required fields at runtime'], correct: 1 },
    { q: 'What is an index signature?', options: ['A numeric key for arrays', 'A way to describe types for objects with dynamic property names: [key: string]: Type', 'The index of a type in a union', 'A unique identifier interface'], correct: 1 },
    { q: 'What does `Pick<T, K>` do?', options: ['Removes properties K from T', 'Creates type with only properties K from T', 'Picks the default values', 'Makes K properties readonly'], correct: 1 },
    { q: 'What is structural typing in TypeScript?', options: ['Type compatibility based on names', 'Type compatibility based on structure — if it has all required properties, it matches', 'Type checking based on inheritance', 'Runtime type checking'], correct: 1 },
    { q: 'What does `Omit<T, K>` do?', options: ['Keeps only K properties', 'Creates type with all properties of T except K', 'Makes K optional', 'Removes methods'], correct: 1 },
  ],

  'generics-basics': [
    { q: 'What are generics in TypeScript?', options: ['Global variables', 'A way to create reusable components that work with multiple types', 'A performance optimization', 'Built-in utility types'], correct: 1 },
    { q: 'How do you write a generic function?', options: ['function fn[T](arg: T)', 'function fn<T>(arg: T)', 'generic function fn(arg)', 'function fn(arg: generic)'], correct: 1 },
    { q: 'What does `T extends string` mean as a generic constraint?', options: ['T must be exactly string', 'T must be a subtype of string (has string properties)', 'T is a string variable', 'T extends the string prototype'], correct: 1 },
    { q: 'What is a generic interface?', options: ['An interface with optional methods', 'An interface with a type parameter: interface Container<T> { value: T }', 'An interface used by many classes', 'A base interface'], correct: 1 },
    { q: 'What is type inference in generics?', options: ['Explicitly passing type parameters', 'TypeScript deducing the type parameter from the argument', 'Runtime type resolution', 'Default type assignment'], correct: 1 },
    { q: 'What does `keyof T` produce?', options: ['Array of T\'s values', 'Union type of all keys of T', 'Array of T\'s methods', 'Object with T\'s keys'], correct: 1 },
    { q: 'What is a generic class?', options: ['A class with no methods', 'A class with a type parameter: class Box<T> { constructor(value: T) {} }', 'A base abstract class', 'A class that extends multiple classes'], correct: 1 },
    { q: 'What does `Array<T>` represent?', options: ['T is always a number', 'An array where every element is of type T', 'A generic object', 'A tuple type'], correct: 1 },
    { q: 'What is a default type parameter?', options: ['The type used when none is specified: <T = string>', 'The required type parameter', 'The runtime default', 'Only used with interfaces'], correct: 0 },
    { q: 'What does `Record<K, V>` represent?', options: ['A recorded history of values', 'An object with keys of type K and values of type V', 'A key-value store database type', 'An indexed array'], correct: 1 },
    { q: 'Generics help with:', options: ['Performance improvements', 'Code reuse with type safety', 'Runtime type checking', 'Async operations'], correct: 1 },
    { q: 'What is a conditional type?', options: ['A type that depends on runtime values', 'A type that resolves based on a condition: T extends U ? X : Y', 'An optional type', 'A union or intersection'], correct: 1 },
  ],

  /* ── Testing ─────────────────────────────────────────────────────────── */
  'unit-testing-basics': [
    { q: 'What is a unit test?', options: ['A test of the entire application', 'A test of a small, isolated piece of functionality', 'A performance test', 'An end-to-end test'], correct: 1 },
    { q: 'What does `describe()` do in Jest?', options: ['Describes the test runner', 'Groups related tests together', 'Runs only one test', 'Skips a test group'], correct: 1 },
    { q: 'What does `it()` or `test()` do?', options: ['Defines a group of tests', 'Defines a single test case', 'Sets up test environment', 'Asserts test values'], correct: 1 },
    { q: 'What is `expect()` used for?', options: ['Logging expected values', 'Creating assertions about values', 'Defining test data', 'Importing test utilities'], correct: 1 },
    { q: 'What does `beforeEach()` do?', options: ['Runs after each test', 'Runs before each test in a describe block', 'Runs once before all tests', 'Sets up mock data permanently'], correct: 1 },
    { q: 'What is mocking in tests?', options: ['Testing UI appearance', 'Replacing real implementations with controlled substitutes', 'Writing mock documentation', 'Creating sample data'], correct: 1 },
    { q: 'What does `jest.fn()` create?', options: ['A test suite', 'A mock function that records calls', 'A timer mock', 'A module mock'], correct: 1 },
    { q: 'What is TDD (Test-Driven Development)?', options: ['Writing tests after implementation', 'Writing tests first, then implementing code to make them pass', 'Testing only critical paths', 'Automated testing only'], correct: 1 },
    { q: 'What does `.toBe()` vs `.toEqual()` test?', options: ['They are identical', 'toBe checks reference equality; toEqual checks deep value equality', 'toEqual is stricter than toBe', 'toBe is for objects; toEqual is for primitives'], correct: 1 },
    { q: 'What is test coverage?', options: ['Number of tests written', 'Percentage of code executed during tests', 'Number of passing tests', 'Test file size'], correct: 1 },
    { q: 'What is `afterAll()` used for?', options: ['Cleaning up after each test', 'Running once after all tests in a block complete', 'The last assertion in a test', 'Closing test suites'], correct: 1 },
    { q: 'What does `expect(fn).toThrow()` test?', options: ['That fn throws any error', 'That fn runs slowly', 'That fn returns undefined', 'That fn has no parameters'], correct: 0 },
  ],

  /* ── DSA ─────────────────────────────────────────────────────────────── */
  'big-o-notation-and-complexity': [
    { q: 'What does O(1) mean?', options: ['Linear time', 'Constant time — independent of input size', 'Quadratic time', 'Logarithmic time'], correct: 1 },
    { q: 'What is O(n²) complexity?', options: ['Linear', 'Logarithmic', 'Quadratic — typically from nested loops', 'Factorial'], correct: 2 },
    { q: 'What is Big-O notation used for?', options: ['Measuring exact execution time', 'Describing worst-case growth rate of an algorithm relative to input size', 'Counting lines of code', 'Profiling memory usage precisely'], correct: 1 },
    { q: 'What is O(log n) typical of?', options: ['Linear search', 'Binary search and divide-and-conquer algorithms', 'Bubble sort', 'Nested loops'], correct: 1 },
    { q: 'What is space complexity?', options: ['How fast an algorithm runs', 'How much extra memory an algorithm uses', 'The size of the input', 'Number of function calls'], correct: 1 },
    { q: 'What is the time complexity of accessing an array by index?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correct: 2 },
    { q: 'What is O(n log n)?', options: ['Worse than O(n²)', 'Typical of efficient sorting algorithms like merge sort', 'Better than O(1)', 'Typical of linear search'], correct: 1 },
    { q: 'What does "amortized" complexity mean?', options: ['Worst-case always', 'Average cost per operation over a sequence of operations', 'Best-case only', 'Space complexity only'], correct: 1 },
    { q: 'For an unsorted array, search is:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2 },
    { q: 'What does "drop the constants" mean in Big-O?', options: ['Ignore all constants in the algorithm', 'O(2n) simplifies to O(n) — constants don\'t affect growth rate', 'Set all values to 1', 'Remove non-loop operations'], correct: 1 },
    { q: 'O(n!) is typical of:', options: ['Sorting algorithms', 'Brute-force permutation problems', 'Hashing', 'Binary trees'], correct: 1 },
    { q: 'What is the time complexity of inserting at the end of an array (amortized)?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 3 },
  ],

  'git-fundamentals': [
    { q: 'What does `git init` do?', options: ['Clones a repository', 'Creates a new Git repository in the current directory', 'Initializes a commit', 'Resets the working tree'], correct: 1 },
    { q: 'What does `git add .` do?', options: ['Commits all changes', 'Stages all changed files for the next commit', 'Pushes to remote', 'Creates a new branch'], correct: 1 },
    { q: 'What does `git commit -m "message"` do?', options: ['Saves staged changes to the repository with a message', 'Pushes code to GitHub', 'Creates a new branch', 'Stages files'], correct: 0 },
    { q: 'What is the difference between `git merge` and `git rebase`?', options: ['They are identical', 'merge creates a merge commit; rebase replays commits on top of another branch', 'rebase is only for hotfixes', 'merge is faster'], correct: 1 },
    { q: 'What does `git pull` do?', options: ['Pushes local commits to remote', 'Fetches and merges remote changes into current branch', 'Creates a new branch', 'Stashes local changes'], correct: 1 },
    { q: 'What is a branch in Git?', options: ['A copy of the repository', 'A lightweight pointer to a specific commit', 'A backup of the code', 'A remote server reference'], correct: 1 },
    { q: 'What does `git stash` do?', options: ['Deletes uncommitted changes', 'Temporarily saves uncommitted changes to a stack', 'Commits changes with a stash message', 'Archives the repository'], correct: 1 },
    { q: 'What is `HEAD` in Git?', options: ['The first commit', 'A pointer to the currently checked-out commit/branch', 'The remote origin', 'The main branch'], correct: 1 },
    { q: 'What does `git log --oneline` show?', options: ['Only merge commits', 'A compact list of commits with short hash and message', 'The diff of each commit', 'Remote branch info'], correct: 1 },
    { q: 'What is a merge conflict?', options: ['Two branches with the same name', 'When the same lines were changed differently in two branches', 'A failed push to remote', 'A detached HEAD state'], correct: 1 },
    { q: 'What does `git revert` do vs `git reset`?', options: ['They are identical', 'revert creates a new commit undoing changes; reset moves HEAD backward (rewrites history)', 'reset is safer than revert', 'revert deletes commits'], correct: 1 },
    { q: 'What is a `.gitignore` file used for?', options: ['Listing team members', 'Specifying files/patterns that Git should not track', 'Documenting commit messages', 'Setting Git configuration'], correct: 1 },
  ],
}

/**
 * Get questions for a topic slug.
 * Returns array of question objects, shuffled differently each attempt.
 * @param {string} slug - topic slug
 * @param {number} attempt - attempt number (0-indexed) to vary questions
 * @param {number} count - number of questions to return
 */
export function getQuizQuestions(slug, attempt = 0, count = 10) {
  const pool = QUIZ_QUESTIONS[slug]
  if (!pool || pool.length === 0) return []

  // Seeded shuffle so attempt 0 and attempt 1 give different orderings
  const shuffled = seededShuffle([...pool], `${slug}-${attempt}`)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Deterministic shuffle using a string seed.
 */
function seededShuffle(arr, seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (Math.imul(hash, 1664525) + 1013904223) | 0
    const j = Math.abs(hash) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Returns true if a topic has quiz questions */
export function hasQuizQuestions(slug) {
  return !!(QUIZ_QUESTIONS[slug] && QUIZ_QUESTIONS[slug].length >= 10)
}
