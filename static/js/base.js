const toggleButton = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const btnSettings = document.getElementById('btnSettings');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
});


btnSettings.addEventListener('click', () => { window.location.href = "/settings"; })

console.log("base.js loaded")

document.addEventListener('DOMContentLoaded', () => {

});