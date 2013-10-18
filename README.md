canvasFont
==========

by Girish Budhwani - http://www.audsin.in

canvasFont is a customizable font for canvas. It can be used like any other font but with lots of extra features.
Check the demo <a href="http://auds1n.github.io/canvasFont/">here</a>.

- **Version:** 0.0.1
- **Compressed:** 39kb
- **Uncompressed:** 15kb

# Basic Usage

### Include canvasFont.js

```
<script src = "canvasFont.min.js"></script>
```

### Initialize and create

```javascript
// Font is a global variable
// pass the canvas 2d context. let's say you have stored the context in ctx variable
Font.initConfig({
  context: ctx
});

// create font by passing x, y coordinates, fontsize and string and you are good to go...
Font.create(x, y, fontsize, string);
// see example below and Currently I have only implemented UPPERCASE ALPHABETS.
Font.create(10, 10, 50, 'MICHAEL');
