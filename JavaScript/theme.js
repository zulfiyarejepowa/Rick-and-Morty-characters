let wrapper = document.querySelector('body');
let toggleButton = document.querySelector('#toggle-theme');
let currentTheme = document.querySelector('#current-theme');

if (wrapper.dataset.theme === 'light') currentTheme.textContent = 'Light';
else currentTheme.textContent = 'Dark';

//Change theme
toggleButton.onclick = () => {
	if (wrapper.dataset.theme === 'light') {
		currentTheme.textContent = 'Dark';
		wrapper.dataset.theme = 'dark';
	} else {
		currentTheme.textContent = 'Light';
		wrapper.dataset.theme = 'light';
	}
};