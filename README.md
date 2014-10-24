# `handlebars-layouts`

> Handlebars helpers which implement layout blocks similar to Jade, Jinja, Swig, and Twig.

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]

## Install

With [Node.js](http://nodejs.org):

    $ npm install handlebars-layouts

With [Bower](http://bower.io):

    $ bower install shannonmoeller/handlebars-layouts

## Helpers

### `{{#extend [partial]}}`

- `partial` `String` - Name of partial to render.

Loads a layout partial of a given name and defines block content.

```html
{{#extend "layout"}}
    {{#content "title" mode="prepend"}}Example - {{/content}}
{{/extend}}
```

### `{{#embed [partial]}}`

- `partial` `String` - Name of partial to render.

Allows you to load a partial which itself extends from a layout. Blocks defined in embedded partials will not conflict with those in the primary layout.

```html
{{#extend "layout"}}

    {{#content "body"}}
        {{#embed "gallery"}}
            {{#content "body"}}
                <img src="1.png" alt="" />
                <img src="2.png" alt="" />
            {{/content}}
        {{/embed}}

        {{#embed "modal"}}
            {{#content "title" mode="prepend"}}Image 1 - {{/content}}
            {{#content "body"}}<img src="1.png" alt="" />{{/content}}
        {{/embed}}
    {{/content}}

{{/extend}}
```

### `{{#block [name]}}`

- `name` `String` - Block identifier.

Defines a named block, with optional default content. Blocks may have content appended, prepended, or replaced entirely when extending or embedding. You may append and prepend to the same block multiple times.

```html
{{#block "header"}}
    <h1>Hello World</h1>
{{/block}}

{{#block "main"}}
    <p>Lorem ipsum...</p>
{{/block}}

{{#block "footer"}}
    <p>&copy; 1970</p>
{{/block}}
```

### `{{#content [name] mode="(append|prepend|replace)"}}`

- `name` `String` - Identifier of the block to modify.
- `mode` `String` _(Optional)_ - Means of providing block content. Default: `replace`.

Sets block content, optionally appending or prepending using the `mode` attribute.

Layout:

```html
<html>
    ...
    <body>
        {{#block "header"}}
            <h1>Hello World</h1>
        {{/block}}

        {{#block "main"}}
            <p>Lorem ipsum.</p>
        {{/block}}

        {{#block "footer"}}
            <p>&copy; 1999</p>
        {{/block}}
    </body>
</html>
```

Page:

```html
{{#extend "layout"}}

    {{#content "header"}}
        <h1>Goodnight Moon</h1>
    {{/content}}

    {{#content "main" mode="append"}}
        <p>Dolor sit amet.</p>
    {{/content}}

    {{#content "footer" mode="prepend"}}
        <p>MIT License</p>
    {{/content}}

{{/extend}}
```

Output:

```html
<html>
    ...
    <body>
        <h1>Goodnight Moon</h1>

        <p>Lorem ipsum.</p>
        <p>Dolor sit amet.</p>

        <p>MIT License</p>
        <p>&copy; 1999</p>
    </body>
</html>
```

## Api

Helpers are registered by passing in your instance of Handlebars. This allows
you to selectively register the helpers on various instances of Handlebars.

### `layouts(handlebars)`

- `handlebars` `Handlebars` - An instance of Handlebars.

```js
var handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');

layouts(handlebars);
```

### `layouts.register(handlebars)`

- `handlebars` `Handlebars` - An instance of Handlebars.

Helpers are also exposed via a `register` method for use with [Assemble](http://assemble.io/).

```js
var handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');

layouts.register(handlebars);

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
    {{#content "head" mode="append"}}
        <link rel="stylesheet" href="assets/css/home.css" />
    {{/content}}

    {{#content "body"}}
        <h2>Welcome Home</h2>

        <ul>
            {{#items}}
                <li>{{.}}</li>
            {{/items}}
        </ul>
    {{/content}}

    {{#content "foot" mode="prepend"}}
        <script src="assets/js/analytics.js"></script>
    {{/content}}
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

## Contribute

[![Tasks][waffle-img]][waffle-url] [![Chat][gitter-img]][gitter-url] [![Tip][gittip-img]][gittip-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

## License

MIT

[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/handlebars-layouts/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/handlebars-layouts
[downloads-img]: http://img.shields.io/npm/dm/handlebars-layouts.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/chat-shannonmoeller/handlebars--layouts-blue.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/handlebars-layouts
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/handlebars-layouts.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/handlebars-layouts
[travis-img]:    http://img.shields.io/travis/shannonmoeller/handlebars-layouts.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/handlebars-layouts
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/handlebars-layouts.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/handlebars-layouts
