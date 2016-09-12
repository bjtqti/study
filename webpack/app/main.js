console.log('main.js');
var app = document.getElementById('app');
var p = document.createElement('p');
p.innerHTML  = 'hello webpack : at '+ Date.now() + '!!';
app.appendChild(p)
