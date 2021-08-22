const perPerson = document.querySelector('.per-person');
const total = document.querySelector('.total');
const buttons = document.querySelector('#tip-btns').children;
const bill = document.querySelector('#bill-input');
const tip = document.querySelector('#tip-input');
const people = document.querySelector('#people-input');
const errors = document.querySelectorAll('.error-msg');
const reset = document.querySelector('.reset');

let values = ['', '', ''];
let selected = false;

function updateTip() {
	if (selected && values[0] && values[1] && values[2]) {
		perPerson.innerText =
			'$' + ((values[0] * values[1]) / 100 / values[2]).toFixed(2);
		total.innerText =
			'$' +
			((values[0] * ('1' + values[1])) / 100 / values[2]).toFixed(2);
	}
}

function select() {
	this.classList.toggle('selected');
	for (var i = 0; i < buttons.length; i++) {
		if (this === buttons[i]) continue;
		buttons[i].classList.remove('selected');
	}
	selected = this.classList.value.includes('selected');
	if (selected) {
		values[0] = bill.value;
		values[1] = this.value;
		values[2] = people.value;
	}
	updateTip();
}

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', select);
}

bill.onkeypress = function (e) {
	values[0] = this.value;
	if (e.key === '0' && !this.value.length) errors[0].classList.add('showing');
	if (/^[1-9][0-9]{0,4}(\.)?((?<=\.)(\d{1,2}))?$/g.test(values[0] + e.key)) {
		errors[0].classList.remove('showing');
		values[0] += e.key;
		updateTip();
		return true;
	}
	return false;
};

tip.onkeypress = function (e) {
	values[1] = this.value;
	if (e.key === '0' && !this.value.length) errors[1].classList.add('showing');
	if (/^[1-9][0-9]{0,1}$|^100$/g.test(values[1] + e.key)) {
		errors[1].classList.remove('showing');
		values[1] += e.key;
		updateTip();
		return true;
	}
	return false;
};

people.onkeypress = function (e) {
	values[2] = this.value;
	if (e.key === '0' && !this.value.length) errors[2].classList.add('showing');
	if (/^[1-9][0-9]{0,1}$|^100$/g.test(values[2] + e.key)) {
		errors[2].classList.remove('showing');
		values[2] += e.key;
		updateTip();
		return true;
	}
	return false;
};

reset.onclick = function () {
	values = ['', '', ''];
	for (button of buttons) {
		button.classList.remove('selected');
	}
	for (err of errors) {
		err.classList.remove('showing');
	}
	this.classList.add('idle');
	selected = false;
	perPerson.innerText = '$0.00';
	total.innerText = '$0.00';
	bill.value = '';
	people.value = '';
	tip.value = '';
};

function deleteHandler(e) {
	if (!this.value) {
		perPerson.innerText = '$0.00';
		total.innerText = '$0.00';
	}
	if (
		e.inputType === 'deleteContentBackward' ||
		e.inputType === 'deleteContentForward'
	) {
		let name = this.id.split('-')[0];
		let i =
			name === 'bill'
				? 0
				: name === 'tip'
				? 1
				: name === 'people'
				? 2
				: '';

		values[i] = this.value;
		updateTip();
	}
}

for (elem of document.querySelectorAll('input')) {
	elem.onpaste = function () {
		return false;
	};
}

bill.oninput = deleteHandler;
tip.oninput = deleteHandler;
people.oninput = deleteHandler;
