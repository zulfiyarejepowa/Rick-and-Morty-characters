'use strict'

const url = 'https://rickandmortyapi.com/api/character/';
let favCards = document.querySelector('.fav-card');
let favorites = localStorage.getItem('favorite-characters');
console.log(favorites);
let parseFav = JSON.parse(favorites);
console.log(parseFav);
let characterArray = [...new Set(parseFav)];
console.log(characterArray);

//Create cards of favorites
const createCard = (character) => {
	let favCharacter = document.createElement('div');

	let favImg = document.createElement('img');
	favImg.src = character.image;

	let favName = document.createElement('h1');
	favName.textContent = character.name;

	let removeButton = document.createElement('button');
	removeButton.dataset.favId = character.id;
	removeButton.dataset.action = "remove";
	removeButton.textContent = 'Remove from favorites';
	removeButton.classList.add('remove-from-fav');
	removeButton.addEventListener('click', removeItem);

	favCharacter.appendChild(favImg);
	favCharacter.appendChild(favName);
	favCharacter.appendChild(removeButton);

	favCharacter.classList.add('favorite-character');
	favCards.appendChild(favCharacter);
};

fetch(`${url}${characterArray.join(',')}`, {
	method: 'GET',
}).then((res) => res.json())
	.then((parseData) => {
		if (characterArray.length === 1) {
			createCard(parseData);
		} else {
			parseData.forEach((character) => {
				createCard(character);
			});
		}
	});

//Remove from favotites
function removeItem(event) {
	console.log({ event });
	const localFavs = localStorage.getItem('favorite-characters')
	const parsed = JSON.parse(localFavs)
	if (localFavs !== null) {
		const filteredArray = parsed.filter((id) => {
			const buttonId = Number(event.target.dataset.favId)
			if (id !== buttonId)
				return id
		})
		console.log(filteredArray);
		localStorage.setItem('favorite-characters', JSON.stringify(filteredArray));
	}
}

window.addEventListener("click", function (event) {
	console.log(event);
	if (event.target.dataset.action === "remove") {
		event.target.closest(".favorite-character").remove();
	}
})