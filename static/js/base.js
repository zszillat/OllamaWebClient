const toggleButton = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
});

console.log("base.js loaded")