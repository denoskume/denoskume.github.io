function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("content").innerHTML = this.responseText;
    };
    xhttp.open("GET", `${page}.html`, true);
    xhttp.send();
}

// Load Home content by default when the page is first loaded
window.onload = function() {
    loadContent('home'); // This will load 'home.html' by default
};
// Toggle the display of the navigation menu
function toggleMenu() {
    const header = document.querySelector('header');
    header.classList.toggle('show-menu');
}
// Function to open the side navigation menu
function openNav() {
    document.getElementById("sideNav").style.width = "250px"; // Open the side navigation to 250px
}

// Function to close the side navigation menu
function closeNav() {
    document.getElementById("sideNav").style.width = "0"; // Collapse the side navigation to 0
}
