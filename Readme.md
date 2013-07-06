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
$ bower install shannonmoeller/handlebars-layouts
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
        <script src="assets/js/analyitics.js"></script>
    {{/prepend}}
{{/extend}}
```

### Putting Them Together

```js
// Load modules
var Handlebars = require('handlebars');
var layoutHelpers = require('handlebars-layouts');

// Read templates
var layout = fs.readFileSync('layout.html', 'utf8');
var template = fs.readFileSync('template.html', 'uft8');

// Register layout helpers
layoutHelpers(Handlebars);

// Register layout partial
Handlebars.registerPartial('layout', layout);

// Compile
var renderer = Handlebars.compile(template);

// Render and output template
console.log(
    renderer({
        title: 'Layout Test',
        items: [
            'apple',
            'orange',
            'banana'
        ]
    })
);
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

        <script src="assets/js/analyitics.js"></script>
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
