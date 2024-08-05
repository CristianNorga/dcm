let listArray = [];
let dictyonary = {};

function addToList(count = 500) {
	for (let i = 0; i < count; i++) {
		listArray.push(new objectExample(i));
	}
}

function addToDictyonary(count = 500) {
	for (let i = 0; i < count; i++) {
		dictyonary[i] = new objectExample(i);
	}
}

class objectExample {
	constructor(index) {
		this.id = index;
		this.name = 'name';
		//age ramdom number between 0 and 30
		this.age = Math.floor(Math.random() * 30);
		this.type = '';
	}
}

//=========
function searchInList() {
	console.time('searchInList');
	let result = listArray.filter((item) => item.age === 15);
	console.log(result);
	console.timeEnd('searchInList');
}

function setItemsInList() {
  console.time('setItemsInList');
  count = 0;
  listArray.forEach((item) => {
    if (item.age < 15) {
      item.type = 'boy';
      count++;
    }
  });
  console.timeEnd('setItemsInList');
  console.log(count);
}

//discard
function removeItemsInList() {
	console.time('removeItemsInList');
	listArray = listArray.filter((item) => item.age < 15);
	console.timeEnd('removeItemsInList');
	console.log(listArray);
}

//=========

function searchInDictyonaryOpt1() {
	console.time('searchInDictyonaryOpt1');
	let result = Object.values(dictyonary).filter((item) => item.age === 15);
	console.log(result);
	console.timeEnd('searchInDictyonaryOpt1');
}

function setItemsInDictyonary() {
  console.time('setItemsInDictyonary');
  count = 0;
  Object.keys(dictyonary).forEach((item) => {
    if (dictyonary[item].age < 15) {
      dictyonary[item].type = "boy"
      count++;
    }
  });
  console.timeEnd('setItemsInDictyonary');
  console.log(count);
}

function removeItemsInDictyonary() {
  console.time('removeItemsInDictyonary');
  Object.keys(dictyonary).forEach((item) => {
    if (dictyonary[item].age < 15) {
      delete dictyonary[item];
    }
  });
  console.timeEnd('removeItemsInDictyonary');
}

//=========

//discard
function searchInDictyonaryOpt2() {
  console.time('searchInDictyonaryOpt2');
  let result = [];
  for (let key in dictyonary) {
    if (dictyonary[key].age === 15) {
      result.push(dictyonary[key]);
    }
  }
  console.log(result);
  console.timeEnd('searchInDictyonaryOpt2');
}
