/**
 * 2048 游戏
 * Created by 它山之石 on 14-4-11.
 * email <278500368@qq.com>
 * @param options 
 */


function Game2048(options){
	this.board = [];
	this.height = options.height||100;
	this.width = options.width ||100;
	this.blank = options.blank ||20;
	this.id = options.boardId;
	this.scoreId = options.scoreId;
	this.init();
}


//初始化数据
Game2048.prototype.init = function(){
	var board = this.board;
	var container = document.getElementById(this.id);
	var score = document.getElementById(this.scoreId);
	var i,j;
	this.container = container;
	this.$score = score;
	this.getCells();

	//生成4 X 4的棋盘格子
	for(i=0;i<4;i++){
		board[i] = [];
		for(j=0;j<4;j++){
			board[i][j] = null;
			this.layerout(i,j);
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

//初始化界面
Game2048.prototype.layerout =function(i,j){
	var id = this.getCellId(i,j);
	var left = this.getLeft(i,j);
	var top = this.getTop(i,j);
 
	this.cells[id].style.cssText = "left:"+left+"px;top:"+top+"px";
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
	var cell = document.createElement('li');
	var left = this.getLeft(i,j);
	var top = this.getTop(i,j);
	//随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
	cell.className = 'cell numberCell';
	cell.innerHTML = randNumber;
	cell.style.cssText = "left:"+left+"px;top:"+top+"px";
	this.container.appendChild(cell); 
	this.board[i][j] = {"cell":cell,"num":randNumber};
	this.status = 'dirty';
}


window.onload = function(){
	var game = new Game2048({
		boardId : 'grid-container',
		scoreId : 'grid-score',
		width : 100,
		height : 100,
		blank : 20
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