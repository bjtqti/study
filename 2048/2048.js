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
	var grids = container.children;
	this.container = container;
	this.$score = score;
	this.addEvents();
	
	for(var i=0;i<4;i++){
		board[i] = [];
		for(var j=0;j<4;j++){
			board[i][j] = null;
			//生成4 X 4的棋盘格子
			this.layerout(i,j,grids);
		}
	}

	this.status = 'init';
	this.start();
}

//开始游戏
Game2048.prototype.start = function(){
	this.score = 0;
	this.cleanGrid();
	this.updateScore(this.score);
	this.randomCell();
	this.randomCell();

}

//初始化视图
Game2048.prototype.layerout = function(i,j,grids){
	var index = this.getCellId(i,j);
	this.updateGirdView(i,j,grids[index]);
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

//更新分数
Game2048.prototype.updateScore = function(score){
	this.score += score;
	this.$score.innerHTML = this.score;
}

//局部刷新视图
Game2048.prototype.updateGirdView = function(i,j,grid){
	var left = this.getLeft(i,j);
	var top = this.getTop(i,j);
	grid.style.cssText = "left:"+left+"px;top:"+top+"px";
}

//全局刷新视图
Game2048.prototype.updateBoardView =function(){
	var board = this.board;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]){
				this.updateGirdView(i,j,board[i][j].cell);
			}
		}
	}
}

//获取left的值
Game2048.prototype.getLeft = function(i,j){
	return this.blank+(this.width+this.blank) * j;
}

//获取top的值
Game2048.prototype.getTop = function(i,j){
	return this.blank+(this.height+this.blank) * i;
}

//获取格式的id
Game2048.prototype.getCellId = function(i,j){
	return 4 * i + j;
}

//随机生成一个格子
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
    	return false;
    }

	//随机取一个格子
	var n = Math.round(Math.random() * len);
	this.addCell(cells[n][0],cells[n][1]);
}

//添加一个带数字的格子
Game2048.prototype.addCell = function(i,j){
	//创建一个格子
	var cell = document.createElement('li');
	//随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
	cell.className = 'number-cell';
	cell.innerHTML = randNumber;
	this.container.appendChild(cell); 
 	//保存格子
	this.board[i][j] = {"cell":cell,"num":randNumber,"axis":[i,j]};
	//更新视图
	this.updateGirdView(i,j,cell);
	this.status = 'dirty';
}

//判断是否在水平方向有阻挡
Game2048.prototype.noBlockHorizontal = function(row , col1 , col2){
	var board = this.board;
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]){
			return true;
		}
	}
	return false;
}

Game2048.prototype.noBlockVertical = function(col , row1 , row2){
	var board = this.board;
	for( var i = row1 + 1 ; i < row2 ; i ++ ){
        if( board[i][col]){
            return true;
        }
	}
    return false;
}

//移除一个格子
Game2048.prototype.delCell = function(cell){
	this.container.removeChild(cell);
}

//游戏结束
Game2048.prototype.gameOver = function(){
	 
}

//左移
Game2048.prototype.moveLeft = function(){
	var board = this.board;

	for(var i = 0;i<4;i++){
		//左边第1列肯定是不能再往左移动的 
		for(var j = 1;j<4;j++){
			//左边第2列起，能移动的格子必须要有数字
			if(board[i][j]){
				//遍历待移动的数字之前的格子,检测是否可以移动
				for(var k=0;k<j;k++){
 					if(!this.noBlockHorizontal(i,k,j) && !board[i][k]){
 						// 1.没有阻挡并且前面为空
 						//move
 						board[i][k] = board[i][j];
 						this.updateGirdView(i,k,board[i][k].cell);
 						board[i][j] = null;
 						break;
 					}else if(!this.noBlockHorizontal(i,k,j) && board[i][k]==board[i][j]){
						// 2.没有阻挡并且与之相等
						//move  , 合并 , 加分
						var grid = board[i][k];
						board[i][k] = board[i][j];
						board[i][j] = null;
						this.updateGirdView(i,k,board[i][k].cell);
						this.delCell(grid.cell);
						this.updateScore(board[i][k].num);
						break;
 					}
				}
			} 
		}
	}
}

Game2048.prototype.moveRight = function(){
	var board = this.board;

	for(var i = 0;i<4;i++){
		//右边第1列肯定是不能再往右移动的 
		for(var j = 2;j>-1;j--){
			if(board[i][j]){
				//遍历待移动的数字之前的格子,检测是否可以移动
				for(var k=3;k>j;k--){
 					if(!this.noBlockHorizontal(i,j,k) && !board[i][k]){
 						board[i][k] = board[i][j];
 						this.updateGirdView(i,k,board[i][k].cell);
 						board[i][j] = null;
 						break;
 					}else if(!this.noBlockHorizontal(i,j,k) && board[i][k]==board[i][j]){
						var grid = board[i][k];
						board[i][k] = board[i][j];
						board[i][j] = null;
						this.updateGirdView(i,k,board[i][k].cell);
						this.delCell(grid.cell);
						this.updateScore(board[i][k].num);
						break;
 					}
				}
			} 
		}
	}
}

Game2048.prototype.moveUp = function(){
	
}

Game2048.prototype.moveDown = function(){
	var board = this.board;

	//最一面一行是不能移动的
	for(var j=0;j<4;j++){
		for(var i=2;i>-1;i--){
			if(board[i][j]){
				for( var k = 3 ; k > i ; k -- ){
					if( !board[k][j] && !this.noBlockVertical( j , i , k)){
						board[k][j] = board[i][j];
						board[i][j] = null;
						this.updateGirdView(k,j,board[k][j].cell);
						break;
					}else if(!this.noBlockVertical( j , i , k) && board[k][j]==board[i][j]){
						var grid = board[k][j];
						board[k][j] = board[i][j];
						board[i][j] = null;
						this.updateGirdView(k,j,board[k][j].cell);
						this.delCell(grid.cell);
						this.updateScore(board[k][j].num);
						break;
					}
				}
			}
		}
	}
}

//监听事件
Game2048.prototype.addEvents = function(){
	var self = this;
	//键盘操作
	document.onkeyup = function(e){
		switch(e.keyCode){
			case 37: // left
				self.moveLeft();
				break;
			case 38: // up
				self.moveUp();
				break;
			case 39: // right
				self.moveRight();
				break;
			case 40: // down
				self.moveDown();
				break;
		}
		//console.log(e)
	}
}

//******************************************

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