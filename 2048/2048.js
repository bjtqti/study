/**
 * 2048 游戏
 * Created by 它山之石 on 14-4-11.
 * email <278500368@qq.com>
 */


function Game2048(id){
	this.board = [];
	this.height = 100;
	this.width = 100;
	this.blank = 20;
	this.id = id;
	this.init();
}


//初始化数据
Game2048.prototype.init = function(){
	var board = this.board;
	var i,j;

	this.getCells();

	for(i=0;i<4;i++){
		board[i] = [];
		for(j=0;j<4;j++){
			board[i][j] = null;
			this.layerout(i,j);
		}
	}

	this.randomCell();
	this.randomCell();
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
	var container = document.getElementById(this.id);
	var cells = container.children;
	this.cells = cells;
	this.container = container;
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
	this.board[i][j] = cell;
}


window.onload = function(){
	var game = new Game2048('grid-container');
	var body = document.body;
	body.onclick = function(e){
		var target = e.target || e.srcElement;
		if(target.className == 'start'){
			//game.init();
			return false;
		}
	}
}