# `handlebars-layouts`

> Handlebars helpers which implement layout blocks similar to Jade, Jinja, and Twig.

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

## Install

With [Node.js](http://nodejs.org):

```sh
$ npm install handlebars-layouts
```

With [Bower](http://bower.io):

```sh
$ bower install shannonmoeller/handlebars-layouts
```

## Helpers

### `#block`

Defines a named block, with optional default content. Blocks may have content appended, prepended, or replaced entirely when extended. You may append and prepend to the same block multiple times.

```html
{{#block "header"}}
    <h1>Hello World</h1>
{{/block}}

{{#block "content"}}
    <p>Lorem ipsum...</p>
{{/block}}

{{#block "footer"}}
    <p>&copy; 1970</p>
{{/block}}
```

### `#extend`

Loads a layout partial of a given name. May contain `replace`, `append`, and `prepend` block overrides.

```html
{{#extend "layout"}}
    ...
{{/extend}}
```

### `#embed`

Allows you to render a partial which itself extends from a layout without conflicting. A layout-safe replacement for `{{> partial}}` syntax plus optional overrides.

```html
{{#extend "layout"}}
    {{#replace "body"}}
        {{#embed "confirm"}}
            {{#replace "title"}}Image 1{{/replace}}
            {{#replace "body"}}<img src="1.png" alt="" />{{/replace}}
        {{/embed}}
    {{/replace}}
{{/extend}}
```

### `#append`

Adds new content after a `{{#block}}`.

Layout:

```html
<html>
    ...
    <body>
        {{#block "header"}}
            <h1>Hello World</h1>
        {{/block}}
        ...
    </body>
</html>
```

Page:

```html
{{#extend "layout"}}

    {{#append "header"}}
        <h2>Goodnight Moon</h2>
    {{/append}}

{{/extend}}
```

Output:

```html
<html>
    ...
    <body>
        <h1>Hello World</h1>
        <h2>Goodnight Moon</h2>
        ...
    </body>
</html>
```

### `#prepend`

Inserts content before a `{{#block}}`.

Layout:

```html
<html>
    ...
    <body>
        {{#block "header"}}
            <h1>Hello World</h1>
        {{/block}}
        ...
    </body>
</html>
```

Page:

```html
{{#extend "layout"}}

    {{#prepend "header"}}
        <h2>Goodnight Moon</h2>
    {{/prepend}}

{{/extend}}
```

Output:

```html
<html>
    ...
    <body>
        <h2>Goodnight Moon</h2>
        <h1>Hello World</h1>
        ...
    </body>
</html>
```

### `#replace`

Replaces the content of a `{{#block}}` with new content.

Layout:

```html
<html>
    ...
    <body>
        {{#block "header"}}
            <h1>Hello World</h1>
        {{/block}}
        ...
    </body>
</html>
```

Page:

```html
{{#extend "layout"}}

    {{#replace "header"}}
        <h2>Goodnight Moon</h2>
    {{/replace}}

{{/extend}}
```

Output:

```html
<html>
    ...
    <body>
        <h2>Goodnight Moon</h2>
        ...
    </body>
</html>
```

## Api

Helpers are registered by passing in your instance of Handlebars. This allows
you to selectively register the helpers on various instances of Handlebars.

```js
var Handlebars = require('handlebars');

require('handlebars-layouts')(Handlebars);
```

### `.register(Handlebars)`

Helpers are also exposed via a `register` method for use with [Assemble](http://assemble.io/).

```js
require('handlebars-layouts').register(Handlebars);

// or

grunt.initConfig({
    assemble: {
        options: {
            helpers: ['path/to/handlebars-layouts.js']
        }
    }
});
```

## Example

### Layout Partial

```html
<!doctype html>
<html lang="en-us">
<head>
    {{#block "head"}}
        <title>{{title}}</title>

        <link rel="stylesheet" href="assets/css/screen.css" />
    {{/block}}
</head>
<body>
    <div class="site">
        <div class="site-hd" role="banner">
            {{#block "header"}}
                <h1>{{title}}</h1>
            {{/block}}
        </div>

        <div class="site-bd" role="main">
            {{#block "body"}}
                <h2>Hello World</h2>
            {{/block}}
        </div>

        <div class="site-ft" role="contentinfo">
            {{#block "footer"}}
                <small>&copy; 2013</small>
            {{/block}}
        </div>
    </div>

    {{#block "foot"}}
        <script src="assets/js/controllers/home.js"></script>
    {{/block}}
</body>
</html>
```

### Template

```html
{{#extend "layout"}}
    {{#append "head"}}
        <link rel="stylesheet" href="assets/css/home.css" />
    {{/append}}

    {{#replace "body"}}
        <h2>Welcome Home</h2>

        <ul>
            {{#items}}
                <li>{{.}}</li>
            {{/items}}
        </ul>
    {{/replace}}

    {{#prepend "foot"}}
        <script src="assets/js/analytics.js"></script>
    {{/prepend}}
{{/extend}}
```

### Putting Them Together

```js
// Load Handlebars
var Handlebars = require('handlebars');

// Register helpers
require('handlebars-layouts')(Handlebars);

// Register partials
Handlebars.registerPartial('layout', fs.readFileSync('layout.html', 'utf8'));

// Compile template
var template = Handlebars.compile(fs.readFileSync('template.html', 'utf8'));

// Render template
var output = template({
    title: 'Layout Test',
    items: [
        'apple',
        'orange',
        'banana'
    ]
});

console.log(output);
```

### Output (prettified for readability)

```html
<!doctype html>
<html lang="en-us">
<head>
    <title>Layout Test</title>

    <link rel="stylesheet" href="assets/css/screen.css" />
    <link rel="stylesheet" href="assets/css/home.css" />
</head>
<body>
    <div class="site">
        <div class="site-hd" role="banner">
            <h1>Layout Test</h1>
        </div>

        <div class="site-bd" role="main">
            <h2>Welcome Home</h2>
            <ul>
                <li>apple</li>
                <li>orange</li>
                <li>banana</li>
            </ul>
        </div>

        <div class="site-ft" role="contentinfo">
            <small>&copy; 2013</small>
        </div>
    </div>

    <script src="assets/js/analytics.js"></script>
    <script src="assets/js/controllers/home.js"></script>
</body>
</html>
```

## Test

```sh
$ npm test
```

## License

MIT

[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/handlebars-layouts/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/handlebars-layouts
[downloads-img]: http://img.shields.io/npm/dm/handlebars-layouts.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/chat-shannonmoeller/handlebars-layouts-blue.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/handlebars-layouts
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/handlebars-layouts.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/handlebars-layouts
[travis-img]:    http://img.shields.io/travis/shannonmoeller/handlebars-layouts.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/handlebars-layouts
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/handlebars-layouts.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/handlebars-layouts
