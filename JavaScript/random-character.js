'use strict'

let image = document.querySelector('#random-img');
let id = document.querySelector('#random-id');
let name = document.querySelector('#random-name');

let favButton = document.querySelector('#add-to-fav');
let randomButton = document.querySelector('#get-random');

//Get Random character
const getRandomNumber = () => Math.floor(Math.random() * (826 - 1 + 1)) + 1;
let currentCharacter = null;

const getRandomCharacter = () => {
    fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`, {method: 'GET'})
    .then((res) => res.json())
    .then((parseData) => {
        currentCharacter = parseData;
        image.src = parseData.image;
        id.textContent = parseData.id;
        name.textContent = parseData.name;
   });
}
getRandomCharacter()

randomButton.onclick = getRandomCharacter

//Add to favorites
favButton.onclick = () => {
    let favCharacters = localStorage.getItem('favorite-characters')
    if (favCharacters) {
        let parsedCharacters = JSON.parse(favCharacters);
        if(!parsedCharacters.includes(currentCharacter.id)) {
            parsedCharacters.push(currentCharacter.id);
        }
        localStorage.setItem('favorite-characters', JSON.stringify(parsedCharacters));
    } else {
        let characterArray = JSON.stringify([currentCharacter.id]);
        localStorage.setItem('favorite-characters', characterArray);
    }
}