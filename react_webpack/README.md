#前端自动化构建方案

* **利用webpack** 打包工具，加上各种配套插件的支持，主要解决以下几个问题
<ol>
	<li>把es7，es6等语法转为目前主流浏览器可以支持的语法</li>
	<li>把react的JSX语法转为js语法</li>
	<li>把less,sass等转为css文件，并自动完成浏览器私有前结结缀补齐</li>
	<li>自动进行文件压缩，优化.加hash值</li>
	<li>在开发环境实现对文件的变化自动重新打包</li>
	<li>浏览器的自动刷新，react-hot热替换?</li>
	<li>其它</li>
</ol>

## 快速开始

```bash
	$ npm install
	$ npm run build
```

## 参考资料

[Learn how to use React in your own project.](http://facebook.github.io/react/docs/getting-started.html)

## Examples

We have several examples [on the website](http://facebook.github.io/react/). Here is the first one to get you started:

```js
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);
```

This example will render "Hello John" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](http://facebook.github.io/react/docs/jsx-in-depth.html). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML. A simple transform is included with React that allows converting JSX into native JavaScript for browsers to digest.

## Installation

The fastest way to get started is to serve JavaScript from the CDN (also available on [cdnjs](https://cdnjs.com/libraries/react) and [jsdelivr](http://www.jsdelivr.com/#!react)):

```html
<!-- The core React library -->
<script src="http://fb.me/react-0.13.0.js"></script>
<!-- In-browser JSX transformer, remove when pre-compiling JSX. -->
<script src="http://fb.me/JSXTransformer-0.13.0.js"></script>
```

We've also built a [starter kit](http://facebook.github.io/react/downloads/react-0.13.0.zip) which might be useful if this is your first time using React. It includes a webpage with an example of using React with live code.

If you'd like to use [bower](http://bower.io), it's as easy as:

```sh
bower install --save react
```

## Contribute

The main purpose of this repository is to continue to evolve React core, making it faster and easier to use. If you're interested in helping with that, then keep reading. If you're not interested in helping right now that's ok too. :) Any feedback you have about using React would be greatly appreciated.

### Building Your Copy of React

The process to build `react.js` is built entirely on top of node.js, using many libraries you may already be familiar with.

#### Prerequisites

* You have `node` installed at v0.10.0+ (it might work at lower versions, we just haven't tested).
* You are familiar with `npm` and know whether or not you need to use `sudo` when installing packages globally.
* You are familiar with `git`.

#### Build

Once you have the repository cloned, building a copy of `react.js` is really easy.

```sh
# grunt-cli is needed by grunt; you might have this installed already
npm install -g grunt-cli
npm install
grunt build
```

At this point, you should now have a `build/` directory populated with everything you need to use React. The examples should all work.

### Grunt

We use grunt to automate many tasks. Run `grunt -h` to see a mostly complete listing. The important ones to know:

```sh
# Build and run tests with PhantomJS
grunt test
# Build and run tests in your browser
grunt test --debug
# For speed, you can use fasttest and add --filter to only run one test
grunt fasttest --filter=ReactIdentity
# Lint the code with ESLint
grunt lint
# Wipe out build directory
grunt clean
```

### License

React is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).

### More…

There's only so much we can cram in here. To read more about the community and guidelines for submitting pull requests, please read the [Contributing document](CONTRIBUTING.md).
