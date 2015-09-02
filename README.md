canvasFont
==========

by Girish Budhwani

canvasFont is a customizable font for canvas. It can be used like any other font but with lots of extra features.
Check the demo <a href="http://girish3.github.io/canvasFont/">here</a>.

- **Version:** 0.0.1
- **Compressed:** 15kb
- **Uncompressed:** 39kb

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
```

# Advance Usage

### Initialization

An Object to Font.initConfig() can be passed with 9 different properties(not mandatory), namely

```javascript
// An object to be passed to Font.initConfig
data = {
  // canvas 2d context
  context: ctx,
  // radius of the marbles used in the font in pixels
  radius: 5,
  // color of the font, all css color values are allowed
  color: '#ab7d1e'
  // animation type
  // allowed values 'random', 'sameOrigin1', 'sameOrigin2', 'off'
  animation: 'random',
  // for manually controlling the animation
  manualAnimation: 'false',
  // shape of the marbles 
  // allowed values 'circle', 'square', 'triangle', 'random'
  shape: 'circle',
  // acceleration of the marble, how fast it reaches its destination
  acceleration: 0.5,
  // surface friction, allowed values from 0 to 1
  friction: 0.9,
  // if you require gradient pattern instead of color
  gradient: true,
  // pass this object if gradient is true
  gradObjec: {
    // start color, see demo
    start: 'white'
    // end color, see demo
    end: 'blue'
  }
};
/* if manualAnimation is true then you have to call 
* Font.animateFrame() in you animation loop
*/

Font.initConfig(data);
```

### Create

```javascript
// Font.create also takes data object as parameter which has 4 properties, namely
// radius, color, animation and shape
// same as for initConfig
Font.create(x, y, fontsize, string, data);
```

# Want to contribute ?
  
+ There are many things I have not implemented yet, like smallercase Alphabets, numbers, or other symbols 
which you can easily add to letters object in canvasFont.js
+ If you have some other ideas, then I would love to here them.



  
  
  
  
  
  
  
  
  
  
  
  
  
