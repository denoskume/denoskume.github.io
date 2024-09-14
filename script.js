// Function to load the content dynamically based on the clicked link
function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("content").innerHTML = this.responseText;
    };
    xhttp.open("GET", `${page}.html`, true); // Load the corresponding HTML file
    xhttp.send();
}

// Load the 'home' content by default when the page is first loaded
window.onload = function() {
    loadContent('home'); // Loads 'home.html' by default
};

// Function to open the side navigation menu
function openNav() {
    document.getElementById("sideNav").style.width = "250px"; // Opens the side navigation to 250px
}

// Function to close the side navigation menu
function closeNav() {
    document.getElementById("sideNav").style.width = "0"; // Closes the side navigation
}

// Function to detect clicks outside of the sideNav and close it when clicking elsewhere
document.addEventListener('click', function(event) {
    const sideNav = document.getElementById("sideNav");
    
    // Close the menu if the click is outside of the sideNav or hamburger icon
    if (sideNav.style.width === "250px" && !sideNav.contains(event.target) && !event.target.classList.contains('hamburger')) {
        closeNav();
    }
});

// Prevent event propagation for sideNav and hamburger click
document.getElementById("sideNav").addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents clicks inside sideNav from closing it
});

document.querySelector('.hamburger').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the click on the hamburger from closing the sideNav
});

// Function to open the pop-up
document.getElementById("socialMediaBtn").addEventListener("click", function() {
    document.getElementById("socialMediaPopup").style.display = "flex"; // Show the pop-up
});

// Function to close the pop-up
function closePopup() {
    document.getElementById("socialMediaPopup").style.display = "none"; // Hide the pop-up
}

// Close the pop-up if the user clicks outside of the content
window.addEventListener('click', function(event) {
    const popup = document.getElementById('socialMediaPopup');
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

