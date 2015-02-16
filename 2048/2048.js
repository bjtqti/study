/**
 * 2048 游戏
 * Created by 它山之石 on 14-4-11.
 * email <278500368@qq.com>
 * @param options 
 */


function Game2048(options){
	this.board = [];
	this.height = options.grid.height||100;
	this.width = options.grid.width ||100;
	this.blank = options.grid.blank ||20;
	this.id = options.boardId;
	this.scoreId = options.scoreId;
	this.init();
}


//初始化数据
Game2048.prototype.init = function(){
	var board = this.board;
	var container = document.getElementById(this.id);
	var score = document.getElementById(this.scoreId);
	
	this.container = container;
	this.$score = score;
	this.addEvents();

	var cells = this.getCells();
	var i,j,index;
	
	//生成4 X 4的棋盘格子
	for(i=0;i<4;i++){
		board[i] = [];
		for(j=0;j<4;j++){
			board[i][j] = null;
			index = this.getCellId(i,j);
			this.updateBoardView(i,j,cells[index]);
		}
	}

	this.status = 'init';
	this.start();
}

//开始游戏
Game2048.prototype.start = function(){
	this.score = 0;
	this.cleanGrid();
	this.setScore(this.score);
	this.randomCell();
	this.randomCell();

}

//清理棋盘
Game2048.prototype.cleanGrid = function(){
	if(this.status !== 'dirty') {
		return;
	}
	var board = this.board;
	var container = this.container;
	
	for(var i=0;i<4;i++){
		for(var j =0;j<4;j++){
			if(board[i][j]){
				container.removeChild(board[i][j].cell);
				board[i][j] = null;
			}
		}
	}

	this.status = 'clean';
}

//设置得分
Game2048.prototype.setScore = function(score){
	var $score = this.$score;
	var old = Number($score.innerHTML)||0;
	this.$score.innerHTML = old+score;
}

//刷新视图
Game2048.prototype.updateBoardView =function(i,j,cell){
	var left = this.getLeft(i,j);
	var top = this.getTop(i,j);
	cell.style.cssText = "left:"+left+"px;top:"+top+"px";
}

//获取left的值
Game2048.prototype.getLeft = function(i,j){
	return this.blank+(this.width+this.blank) * j;
}

//获取top的值
Game2048.prototype.getTop = function(i,j){
	return this.blank+(this.height+this.blank) * i;
}

//获取所有格子
Game2048.prototype.getCells = function(){
	var cells = this.container.children;
	this.cells = cells;
	return cells;
}

//获取格式的id
Game2048.prototype.getCellId = function(i,j){
	return 4 * i + j;
}

//随机生成1个格子
Game2048.prototype.randomCell = function(){
	var board = this.board;
	var cells = [];
	//查找可用空间
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] === null){
				cells.push([i,j]);
			}
		}
	}
    var len = cells.length-1;

    if(len < 0) {
    	this.status = 'over';
    	return false;
    }
	//随机第一个格子
	var n = Math.round(Math.random() * len);
	this.addCell(cells[n][0],cells[n][1]);
}

//随机生成一个格子
Game2048.prototype.addCell = function(i,j){
	//创建一个格子
	var cell = document.createElement('li');
	//随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
	cell.className = 'cell numberCell';
	cell.innerHTML = randNumber;
 	//保存格子
	this.board[i][j] = {"cell":cell,"num":randNumber};
	//更新视图
	this.updateBoardView(i,j,cell);
	this.container.appendChild(cell); 
	this.status = 'dirty';
}

Game2048.prototype.move = function(){
	var board = this.board;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(this.board[i][j]){

			}
		}
	}
}

Game2048.prototype.moveLeft = function(){

}

Game2048.prototype.moveRight = function(){
	
}

Game2048.prototype.moveUp = function(){
	
}

Game2048.prototype.moveDown = function(){
	
}

//监听事件
Game2048.prototype.addEvents = function(){
	//键盘操作
	document.onkeyup = function(e){
		switch(e.keyCode){
			case 37: // left
				this.moveLeft();
				break;
			case 38: // up
				this.moveUp();
				break;
			case 39: // right
				this.moveRight();
				break;
			case 40: // down
				this.moveDown();
				break;
		}
		console.log(e)
	}
}


window.onload = function(){
	var game = new Game2048({
		boardId : 'grid-container',
		scoreId : 'grid-score',
		grid : {
			width:100,
			height:100,
			blank:20
		}
	});

	var body = document.body;
	body.onclick = function(e){
		var target = e.target || e.srcElement;
		if(target.className == 'start'){
			game.start();
			return false;
		}
	}
}