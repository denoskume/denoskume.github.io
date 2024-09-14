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
// Function to open the side navigation menu
function openNav() {
    document.getElementById("sideNav").style.width = "250px"; // Open the side navigation to 250px
}

// Function to close the side navigation menu
function closeNav() {
    document.getElementById("sideNav").style.width = "0"; // Collapse the side navigation to 0
}

// Function to detect clicks outside of the sideNav and close it
document.addEventListener('click', function(event) {
    var sideNav = document.getElementById("sideNav");
    
    // If the menu is open and the click is outside the sideNav or hamburger, close the sideNav
    if (sideNav.style.width === "250px" && !sideNav.contains(event.target) && !event.target.classList.contains('hamburger')) {
        closeNav();
    }
});
