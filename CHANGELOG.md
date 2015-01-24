## 1.1.0

Features:

- Arbitrary attributes may now be given to `extend` and `embed` and are added to the partial's data context.

## 1.0.0

Breaking changes:

- Consolidated `append`, `prepend`, and `replace` helpers into a single `content` helper that accepts a `mode` attribute. (Thank you [Assemble](https://github.com/assemble/handlebars-helpers/blob/master/lib/helpers/helpers-layouts.js#L86) contributors).

Features:

- Deep inheritance.
- Added an `embed` helper to insert a partial that extends from its own layout.
- Added test server for use with Express.

Bugfixes:

- Browserify build was not properly wrapping module with UMD due to missing `standalone` option. Fixes AMD issues.

## 0.3.3

Bugfixes:

- Corrected git paths in `package.json`.

## 0.3.2

Features:

- Added support for Assemble-style registration by exposing a `register` method.

## 0.3.0 - 0.3.1

Features:

- Refactor.
- Switched from Grunt to Gulp.
- Improved tests including coverage.

## 0.2.0

Features:

- Blocks may now be appended to, prepended to, and replaced multiple times.

## 0.1.4

Bugfixes:

- Support precompiled templates.
