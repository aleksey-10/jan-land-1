// carousel

class Carousel {
	constructor(container) {
		this.container = container;
		return this;
	}

	create(URLs) {
		this.putIMGs(URLs);
		this.setImgSize();
		this.createButtons();
	}

	setImgSize() {
		let img = this.container.querySelector('img');

		for (let img of this.container.querySelectorAll('img'))
			img.style.width = this.container.clientWidth + 'px';

		this.imgWidth = img.clientWidth;
		this.container.style.width = this.imgWidth + 'px';

	}


	putIMGs (URLs) {
		this.$imgContainer = createDiv(this.container, 'galery'); // <<< used global fn

		for (let url of URLs) {
			let img = document.createElement('img');
			img.src = url;
			this.$imgContainer.append(img);
		}
	}

	createButtons() {
		const $div = createDiv(this.container, 'buttons');

		let $left = document.createElement('button'),
			$right = document.createElement('button');

		$left.className = "fas fa-caret-left";
		$right.className = "fas fa-caret-right";

		$div.addEventListener('click', event => {
			if (event.target == $left) this.moveLeft();
			if (event.target == $right) this.moveRight();
		});

		this.currentPosition = 0;

		$div.append($left, $right);
	}


 	
 	moveRight() {
		let galeryWidth = this.imgWidth*this.$imgContainer.children.length,
			margin = this.container.clientWidth - galeryWidth;

		this.currentPosition -= this.imgWidth;

		if (this.currentPosition < margin) {
			this.$imgContainer.style.marginLeft = `${margin}px`;
			return this.currentPosition = margin;
		}

		this.$imgContainer.style.marginLeft = `${this.currentPosition}px`;
	}

	moveLeft() {
		this.currentPosition += this.imgWidth;

		if (this.currentPosition > 0) { 
			this.$imgContainer.style.marginLeft = 0;
			return this.currentPosition = 0;
		}

		this.$imgContainer.style.marginLeft = `${this.currentPosition}px`;
	}


} 

function createDiv (container, id = '_child') {
	let $div = document.createElement('div');
	container.append($div);

	(id == '_child') ? $div.id = container.id + id + container.children.length 	: 	$div.id = id ; 

	return $div;
}

const imgURL = ['https://dommebelikiev.com.ua/assets/images/products/1637/01-tokio-vls26act5-01.jpg', 'https://dommebelikiev.com.ua/assets/images/products/1609/krovat-stile-style-(3).jpg', 'https://dommebelikiev.com.ua/assets/images/products/1786/301-aa456.jpg', 'https://dommebelikiev.com.ua/assets/images/products/1784/301-d51e9.jpg'];


new Carousel(document.querySelector('.carousel')).create( imgURL );