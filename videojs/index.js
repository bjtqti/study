// Get the Component base class from Video.js
// 从Videojs中获取一个基础组件
var Component = videojs.getComponent('Component');

// The videojs.extend function is used to assist with inheritance. In
// an ES6 environment, `class TitleBar extends Component` would work
// identically.
// videojs.extend方法用来实现继承，等同于ES6环境中的class titleBar extends Component用法
var TitleBar = videojs.extend(Component, {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  // 这个构造函数接收两个参数：
  // player将被用来关联options中的参数
  constructor: function(player, options) {

    // It is important to invoke the superclass before anything else, 
    // to get all the features of components out of the box!
    // 在做其它事之前先调用父类的构造函数是很重要的，
    // 这样可以使父组件的所有特性在子组件中开箱即用。
    Component.apply(this, arguments);

    // If a `text` option was passed in, update the text content of 
    // the component.
    // 如果在options中传了text属性，那么更新这个组件的文字显示
    if (options.text) {
      this.updateTextContent(options.text);
    }
  },

  // The `createEl` function of a component creates its DOM element.
  // 创建一个DOM元素
  createEl: function() {
    return videojs.dom.createEl('div', {

      // Prefixing classes of elements within a player with "vjs-" 
      // is a convention used in Video.js.
      //给元素加vjs-开头的样式名，是videojs内置样式约定俗成的做法
      className: 'vjs-title-bar'
    });
  },

  // This function could be called at any time to update the text 
  // contents of the component.
  // 这个方法可以在任何需要更新这个组件内容的时候调用
  updateTextContent: function(text) {

    // If no text was provided, default to "Text Unknown"
    // 如果options中没有提供text属性，默认显示Text Unknow
    if (typeof text !== 'string') {
      text = 'Text Unknown';
    }

    // Use Video.js utility DOM methods to manipulate the content
    // of the component's element.
    // 使用Video.js提供的DOM方法来操作组件元素
    videojs.dom.emptyEl(this.el());
    videojs.dom.appendContent(this.el(), text);
  }
});

// Register the component with Video.js, so it can be used in players.
// 在videojs中注册这个组件，才可以使用哦.
videojs.registerComponent('TitleBar', TitleBar);

 