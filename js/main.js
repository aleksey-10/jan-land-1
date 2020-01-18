// scroll to top button

let topBtn = document.querySelector('#scrollTopButton');

window.addEventListener('scroll', function() {
	(!window.pageYOffset) ? topBtn.hidden = true : topBtn.hidden = false;
})

topBtn.onclick = () =>	document.documentElement.scrollTop = 0;

// #menu

const mobWidth = 900;

let hCont = document.querySelector('#headContent'), menu = hCont.querySelector('#menu'), logo = hCont.querySelector('#logo');

function setMenuDisp() {
	(document.body.clientWidth < mobWidth) ? menu.hidden = true : menu.hidden = false;
}

setMenuDisp();
window.oresize = setMenuDisp;

hCont.querySelector('.button-item').addEventListener('click', function(event) {
	for (let elem of this.children)
		elem.hidden =false;

	event.target.hidden = true;

	menu.hidden = false;
	menu.style.top = hCont.clientHeight + 'px';

	let coor = menu.getBoundingClientRect();
	if (coor.left != 0) return menu.style.left = 0;
	menu.style.left = '100%';
})

menu.addEventListener('click', function(event){
	if (event.target.tagName != 'A' || document.body.clientWidth > mobWidth) return;
	menu.style.left = '100%';
	for ( let elem of hCont.querySelector('.button-item').children) {
		elem.hidden = !elem.hidden; 
	} 
	setTimeout(() => menu.hidden = true, 1000);
})

menu.addEventListener('transitionend', () => { if (menu.getBoundingClientRect().left) menu.hidden = true; } );


// products

const prod = document.querySelector('#products');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

for (let li of prod.querySelectorAll('li') ) {
	let red = getRandomInt(255), 
		green = getRandomInt(255), 
		blue = getRandomInt(255);

	li.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}


// service

class Service {
	constructor(container){
		this.container = container;
	}

	hideAll() {
		this.pArr = this.container.querySelectorAll('p');
		this.pShortArr = [];

		for (let i = 0; i < this.pArr.length; i++) {

			this.container.querySelectorAll('p')[i].replaceWith( this.crop(i) );
		}
	}

	crop(callIndex) {
		let pShort = document.createElement('p');
			pShort.innerHTML = this.pArr[callIndex].innerHTML.slice(0,90) + '...';

		this.pShortArr.push(pShort);

		return pShort;
	}


	handleEvent(event) {
		if ( event.target.tagName != 'I') return;

		event.target.parentElement.hidden = true;

		let btnSpan = event.target.parentElement,
			div = btnSpan.parentElement,
			li = div.parentElement,
			ul = li.parentElement;

		for (let i = 0; i < ul.children.length; i++){
			if (ul.children[i].querySelector('.show') == btnSpan) { this.setSelected(li, i); break; } 

			if (ul.children[i].querySelector('.hide') == btnSpan) { this.setUnselected(li, i); break; }
		}		

		btnSpan.hidden = true;
	}

	setSelected(li, callIndex) {
		let shortP = li.querySelector('p'), hideBtn = li.querySelector('.hide'), p = this.pArr[callIndex];

		shortP.replaceWith(p);

		li.style.background = '#b8ffeb';
		li.style.color = 'black';

		let pHeight = p.clientHeight + 'px'; 
		p.style.height = shortP.clientHeight + 'px';
		setTimeout( () => p.style.height = pHeight, 0);

		hideBtn.hidden = false;
	}

	setUnselected(li, callIndex) {
		let p = li.querySelector('p'), showBtn = li.querySelector('.show'), shortP = this.pShortArr[callIndex];

		p.replaceWith(shortP);

		li.style.backgroundColor = '';
		li.style.color = '';

		showBtn.hidden = false;
	}

	setBG (url) {
		for (let i = 0; i < url.length; i++)
			this.container.firstElementChild.children[i].style.background = `url(${url[i]})`
	}
}

let servElem = document.querySelector('.serv');

const bgURL = ['https://dommebelikiev.com.ua/assets/images/products/2455/43022.970x0.jpg'];

let service = new Service(servElem);
	service.hideAll();
	// service.setBG(bgURL);

servElem.addEventListener('click', service);
