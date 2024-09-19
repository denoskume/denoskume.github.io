// Open and close side navigation for mobile
function openNav() {
    const sideNav = document.getElementById("sideNav");
    if (sideNav) {
        sideNav.style.width = "150px"; // Adjusted width to 150px
    }
}

function closeNav() {
    const sideNav = document.getElementById("sideNav");
    if (sideNav) {
        sideNav.style.width = "0"; // Collapse the side navigation to 0
    }
}

// Function to load content dynamically based on the clicked link
function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const content = document.getElementById("content");
        if (content) {
            content.innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", `${page}.html`, true); // Load the corresponding HTML file dynamically
    xhttp.send();
}

// Function to dynamically load external HTML files (header/footer)
function loadExternalHTML(file, placeholderId, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.innerHTML = this.responseText;
            if (callback) callback(); // Execute callback after the content is loaded
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

// Load the home content and header/footer by default when the page first loads
window.onload = function () {
    loadExternalHTML('header.html', 'header-placeholder'); // Load header dynamically
    loadContent('home');  // Load 'home.html' by default
    loadExternalHTML('footer.html', 'footer-placeholder', function () {
        // After loading the footer, initialize the time update function
        const timeDisplay = document.getElementById("time-display");
        if (timeDisplay) {
            updateTime();
            setInterval(updateTime, 1000);  // Update time every second
        }
    });
};

// Function to update date and time dynamically based on user's local time
function updateTime() {
    const timeDisplay = document.getElementById("time-display");
    if (timeDisplay) {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeDisplay.textContent = `${dateString} ${timeString}`;
    }
}

// Function to detect clicks outside of the sideNav and close it
document.addEventListener('click', function (event) {
    const sideNav = document.getElementById("sideNav");
    const hamburger = document.querySelector('.hamburger');

    // If the menu is open and the click is outside the sideNav or hamburger, close the sideNav
    if (sideNav && sideNav.style.width === "150px" && !sideNav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav();
    }
});

// Prevent event propagation on sideNav and hamburger clicks
const sideNav = document.getElementById("sideNav");
if (sideNav) {
    sideNav.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents clicks inside sideNav from closing it
    });
}

const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents clicks on the hamburger from closing the sideNav
    });
}
