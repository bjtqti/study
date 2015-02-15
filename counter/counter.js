    /**
     * 计数器
     * @param {Element} eles [description]
     */
    function Animate(eles){
        var idx = 0;
        this.index = idx;
        this.eles = eles;
        this.max = eles.length-1;
        this.init();
    }

    /**
     * 初始状态
     * @return {[type]} [description]
     */
    Animate.prototype.init = function(){
        this.eles[0].className = 'curr';
    }

    Animate.prototype.start = function(){
        var i = this.index;
        var max = this.max

        if(this.index == 0){
            this.prev = null;
            this.curr = this.eles[i];
            this.next = this.eles[i+1];
        }else if(i == max){
            this.prev = this.eles[i-1];
            this.curr = this.eles[i];
            this.next = null;
        }else{
            this.prev = this.eles[i-1];
            this.curr = this.eles[i];
            this.next = this.eles[i+1];
        }

        this.doAnit();
    }

    /**
     * 循环计数
     * @return {[type]} [description]
     */
    Animate.prototype.doAnit = function(){
        if(!this.next){
            this.init();
            this.prev.removeAttribute('class');
            this.curr.className = 'prev';
            this.index = -1;
        }else if(!this.prev){
            this.curr.className = 'prev';
            this.next.className = 'curr';
						  this.eles[this.max].removeAttribute('class')  
        }else{
            this.prev.removeAttribute('class');
            this.curr.className = 'prev';
            this.next.className = 'curr';
        }
        this.index++;
        var that = this;
        var t = setTimeout(function(){
            clearTimeout(t)
            that.start();
        },1000)
    }
					
/**************************************************/
    window.onload = function(){
        var noop = document.querySelector('#noop');

        document.onclick = function(){
            a.start();
            this.onclick = null;
        }

        var a = new Animate(noop.children);
    }