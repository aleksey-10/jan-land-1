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

window.addEventListener('scroll', function() {
	if (window.pageYOffset > hCont.clientHeight) return menu.style.top = 0;
	menu.style.top = hCont.clientHeight + 'px';
} )

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
		if ( event.target.tagName != 'SPAN' && event.target.tagName != 'I') return;

		let btnSpan;

		( event.target.tagName == 'SPAN') ? btnSpan = event.target : btnSpan = event.target.parentElement;

		btnSpan.hidden = true;

		let div = btnSpan.parentElement,
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

		let pHeight = p.clientHeight - 20 + 'px'; 
		p.style.height = shortP.clientHeight + 'px';
		setTimeout( () => p.style.height = pHeight, 0);

		hideBtn.hidden = false;
	}

	setUnselected(li, callIndex) {
		let p = li.querySelector('p'), showBtn = li.querySelector('.show'), shortP = this.pShortArr[callIndex];

		p.replaceWith(shortP);

		li.style.backgroundColor = '';
		li.style.color = '';

		let pShortHeight = shortP.clientHeight - 20 + 'px'; 
		

		new Promise( function(resolve, reject) {
			resolve(shortP.style.height = p.clientHeight + 'px');
		} ).then( result => shortP.style.height = pShortHeight);

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


// contacts

let contacts = document.querySelector('#contacts');

class User {
	constructor(form) {
		this.form = form;
	}

	getName() {
		return this.form.querySelector("[name='name']").value;
	}

	getEmail() {
		return this.form.querySelector("[name='email']").value;
	}
}

contacts.querySelector('form').onsubmit = ( function() {
	this.style.opacity = '0';

	this.addEventListener('transitionend', () => { 
		this.hidden = true;

		if (this.nextElementSibling) return;

		let user = new User(this);

		let mess = document.createElement('div');
		this.after(mess);
		mess.className = 'mess';
		mess.innerHTML = `<span>Thanks, ${user.getName()}!</span>We will answer your quastion ASAP to email: ${user.getEmail()}</span>`;

	})

	return false;

});

