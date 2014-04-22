# Handlebars Layouts

> Handlebars helpers which implement Jade-like layout blocks.

[![NPM version](https://badge.fury.io/js/handlebars-layouts.png)](http://badge.fury.io/js/handlebars-layouts)
[![Build Status](https://travis-ci.org/shannonmoeller/handlebars-layouts.png?branch=master)](https://travis-ci.org/shannonmoeller/handlebars-layouts)
[![Coverage Status](https://coveralls.io/repos/shannonmoeller/handlebars-layouts/badge.png?branch=master)](https://coveralls.io/r/shannonmoeller/handlebars-layouts?branch=master)
[![Dependency Status](https://david-dm.org/shannonmoeller/handlebars-layouts.png?theme=shields.io)](https://david-dm.org/shannonmoeller/handlebars-layouts)

## Install

With [Node.js](http://nodejs.org):

    $ npm install handlebars-layouts

With [Bower](http://bower.io):

    $ bower install handlebars-layouts

With [Component](http://component.io):

    $ component install shannonmoeller/handlebars-layouts

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
var template = Handlebars.compile(fs.readFileSync('template.html', 'uft8'));

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

    $ npm test

## License

MIT
