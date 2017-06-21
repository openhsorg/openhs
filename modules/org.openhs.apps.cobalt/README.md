# org.openhs.apps.cobalt

## Typescript compilation

1. TypeScript compiler requires ES6 ECMAScript target version.  In Eclipse go to menu **Window/Preferences** and select **TypeScript/Compiler** in tree.  In dialogue select **ES6** at **ECMAScript target version** listbox.


2. TypeScript files use **Three.js** library.  This requires Typescript definition files for the library and its modules.  Everything is included and working nevertheless there is a method how to get Three.js working with your TypeScript files just in case you needed it:

- Install and setup Three.js with TypeScript is [described here..](http://danielphil.github.io/three.js/typescript/bower/typings/2016/07/10/using-threejs-with-typescript.html)
- Many good TypeScript definitions for Three.js is in [this repository..](https://github.com/slavomirvojacek/adbrain-typescript-definitions/tree/master/threejs)
