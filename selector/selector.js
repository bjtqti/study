			/**
       *  下拉菜单
       *  @param {string} id 节点#ID
       */
      function Selecter (id) {
          var parent = document.getElementById(id),
              nodes = parent.children;
          this.parent = parent;
          this.title = nodes[0];
          this.menu = nodes[1];
          this.init();
      }

      /**
       * 初始化
       */
      Selecter.prototype.init = function(){
        var doc = document;
        this.selected = null;
        this.maxLen = this.menu.children.length;
        doc.addEventListener('click',this,false);
        doc.addEventListener('keydown',this,false);
        this.menu.addEventListener('mouseover',this,false);
        this.menu.addEventListener('mouseout',this,false);
      }

      /**
       * 事件处理
       * @param {object} event 事件对象
       */
      Selecter.prototype.handleEvent = function(event){
        var target = event.target || event.srcElement;
        switch(target.nodeName){
          //点击三角时
          case 'CITE':
            this.menuShow();
            break;
           // 滑过滑过、离开、点击每个选项时
          case 'A':
            this.removeLight();
            this.selected = target;
            this.menuUpdate();
            this.hightLight();
            if(event.type=='click'){
              this.menuHide();
            }
            break;
            // 点击页面空白处时
          case 'HTML':
            this.menuHide();
            break;
          //键盘操作
          default:
            this.keydown(event.keyCode);
            break;
        }
        return
      }

      /**
       *  更新菜单值
       */
      Selecter.prototype.menuUpdate = function(){
        this.title.innerHTML = this.selected.innerHTML;
      }

      /**
       * 高亮选中项
       */
      Selecter.prototype.hightLight = function(){
        if(this.selected){
          this.selected.style.backgroundColor = 'gray';
        }
      }

      /**
       * 移除高亮
       */
      Selecter.prototype.removeLight = function(){
        if(this.selected){
          this.selected.style.backgroundColor = 'white';
        }
      }

      /**
       * 显示菜单项
       */
      Selecter.prototype.menuShow = function(){
        this.menu.style.display = 'block';
        this.hightLight();
      }

      /**
       * 隐藏菜单项
       */
      Selecter.prototype.menuHide = function(){
        this.menu.style.display = 'none';
      }

      /**
       * 取下一项
       */
      Selecter.prototype.next= function(){
        var target = this.selected;
        var index = target ? target.getAttribute('selectid')-1 : -1;

        this.removeLight();
        index = ++index % this.maxLen;
        this.selected = this.menu.children[index].children[0];
        this.hightLight();
      }

      /**
       * 取上一项
       */
      Selecter.prototype.prev = function(){
        var target = this.selected;
        var index = target ? target.getAttribute('selectid')-1 : 1;

        this.removeLight();
        index = --index < 0 ? 0 : index;
        this.selected = this.menu.children[index].children[0];
        this.hightLight();
      }

      /**
       *  键盘操作
       * @param {number} code ASSIC码
       */
      Selecter.prototype.keydown = function(code){
        switch(code){
          case 40: //down
            this.next();
            break;
          case 38://up
            this.prev();
            break;
          case 13:
            this.menuUpdate();
            this.menuHide();
            break;
          default:
            break;
        }
      }
//调用
  window.onload=function(){
    var menu = new Selecter('divselect');
  }