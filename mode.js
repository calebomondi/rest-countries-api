//selectors
const toggler = document.querySelector('.mode');
const body = document.body;

//state
const theme = localStorage.getItem('theme');

//on-mount
if(theme) {
    body.classList.add(theme);
    toggler.innerHTML = `<i class='bx bx-sun'></i>`;
}

//handlers
handleThemeToggle = () => {
    body.classList.toggle('dark-mode');
    if(body.classList.contains('dark-mode')) {
        localStorage.setItem('theme','dark-mode');
        toggler.innerHTML = `<i class='bx bx-sun'></i>`;
    } else {
        localStorage.removeItem('theme');
        toggler.innerHTML = `<i class='bx bxs-moon'></i>`;
    }
};

//events
toggler.addEventListener('click', handleThemeToggle);