
function initPikcer(items){
	var picker = [];
	for(var i=0,n=items.length;i<n;i++){
		var pick = items[i],
			input = pick.querySelector('input'),
 		    min = parseInt(input.min,10),
	 		max=parseInt(input.max,10),
	 		value=parseInt(input.value,10),
 		    pkr = new Picker({
	 			element:pick,
	 			value:value,
	 			maxValue:max,
	 			minValue:min
 			});
 		picker.push(pkr); 
	}
	return picker;
}

function initCheckbox(items){
	var box = [];
	for(var i=0,n=items.length;i<n;i++){
		var element = items[i],
			span = element.querySelector('span'),
			chk = new Checkbox({
				element:element,
				checked:span.className==='on' ? true : false 
			});
		box.push(chk);
	}
	return box;
}

function initParsedata(items){
	var data=[];
	for(var i=0,n=items.length;i<n;i++){
		var id = items[i].id,
			val = items[i].querySelector('input').value,
			arr = id.split('-'),
			sid = arr[arr.length-1];
		data.push({id:id,singId:sid,buyed:val,checked:true})
	}
	return data;
}

var data = [],
    shop = document.querySelectorAll('.sales-shop'),
    dialog = new Dialog(document.querySelector('.dialog-container')),
    account = document.querySelector('.cart-account');

for(var i =0,n=shop.length;i<n;i++){
	var s = shop[i],
		g = initParsedata(s.querySelectorAll('.sales-goods')),
 	    p = initPikcer(s.querySelectorAll('.number-picker')),
 		c = initCheckbox(s.querySelectorAll('.checkbox-wrap'));
 	data.push({picker:p,checkbox:c,goods:g});
}

document.querySelector('.content').onclick=function(e){
	if(e.target.className==='delete'){
		dialog.confirm = function(){
			var arr = e.target.id.split('-');
			arr.shift();
			var id = arr.join('-');
			document.getElementById(id).style.display='none';
		}
		dialog.show();
	}
}

data.forEach(function(items,i){
	var checkbox = items.checkbox.concat(),
	    checkAll = checkbox.shift(),
	    checkboxLength= checkbox.length;
	items.picker.forEach(function(item,j){
		item.callback=function(val){
			items.goods[j].buyed = val;
		}
	});

 	checkbox.forEach(function(item,j){
 		item.callback=function(checked){
 			items.goods[j].checked = checked;
 			var needCheckAll = 0;
 			for(var k=0;k<checkboxLength;k++){
 				needCheckAll += checkbox[k].checked === checked ? 1 : 0;
 			}
 			if(checkboxLength===1||needCheckAll===checkboxLength){
				checked ? checkAll.on() : checkAll.off();
			} 
 		}
 	});

 	checkAll.callback=function(checked){
 		checkbox.forEach(function(item,j){
	 		checked ? item.on() : item.off();
	 		items.goods[j].checked = checked;
	 	});
 	}
});

var checkwrap = account.querySelector('.checkbox-wrap'),
    totalMoney = account.querySelector('.total-money'),
    save = account.querySelector('.save-money'),
    buy = account.querySelector('.cart-buy'),
    total = totalMoney.innerHTML,
    toggleAll = new Checkbox({
		element:checkwrap,
		checked:checkwrap.querySelector('span').className==='on' ? true : false 
	});
toggleAll.callback = function(checked){
	data.forEach(function(items,i){
		items.checkbox.forEach(function(item,j){
			if(checked){
				item.on();
				totalMoney.innerHTML = total;
				save.style.display = 'block';
			}else{
				item.off();
				save.style.display = 'none';
				totalMoney.innerHTML = '￥0元';
			}
			if(items.goods[j]){
				items.goods[j].checked = checked;
			}
		});
	})
}

buy.onclick = function(){
	console.log(data)
}
