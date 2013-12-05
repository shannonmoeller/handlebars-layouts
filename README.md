# Handlebars Layouts [![Build Status](https://travis-ci.org/shannonmoeller/handlebars-layouts.png)](https://travis-ci.org/shannonmoeller/handlebars-layouts)

> Handlebars helpers which implement Jade-like layout blocks.

## Installation

### Server-side

#### ([Node.js](http://nodejs.org)):

```sh
$ npm install handlebars-layouts
```

### Client-side

#### ([bower](http://bower.io/)):

```sh
$ bower install handlebars-layouts
```

#### ([component(1)](http://component.io)):

```sh
$ component install shannonmoeller/handlebars-layouts
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
var handlebarsLayouts = require('handlebars-layouts')(Handlebars);

// Register partials
Handlebars.registerPartial('layout', fs.readFileSync('layout.html', 'utf8'));

// Compile
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

## Testing

```sh
$ grunt test
```

[![browser support](http://ci.testling.com/shannonmoeller/handlebars-layouts.png)](http://ci.testling.com/shannonmoeller/handlebars-layouts)

## License

MIT

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/shannonmoeller/handlebars-layouts/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
