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
    console.log("Opening side navigation"); // Debugging log
    document.getElementById("sideNav").style.width = "250px"; // Opens the side navigation to 250px
}

// Function to close the side navigation menu
function closeNav() {
    console.log("Closing side navigation"); // Debugging log
    document.getElementById("sideNav").style.width = "0"; // Closes the side navigation
}

// Detect clicks outside of sideNav and close it if necessary
document.addEventListener('click', function(event) {
    const sideNav = document.getElementById("sideNav");
    const hamburger = document.querySelector('.hamburger');

    console.log("Checking for clicks outside the sideNav or hamburger"); // Debugging log
    
    // Check if the sideNav is open
    if (sideNav.style.width === "250px") {
        // If the click is outside of the sideNav and not on the hamburger, close the sideNav
        if (!sideNav.contains(event.target) && !hamburger.contains(event.target)) {
            console.log("Click detected outside, closing the sideNav");
            closeNav();
        } else {
            console.log("Click detected inside sideNav or hamburger, keeping it open");
        }
    }
});

// Prevent event propagation for sideNav and hamburger clicks
document.getElementById("sideNav").addEventListener('click', function(event) {
    event.stopPropagation(); // Stops clicks inside sideNav from triggering outside click listener
    console.log("Click inside sideNav, stopping propagation");
});

document.querySelector('.hamburger').addEventListener('click', function(event) {
    openNav(); // Open the sideNav when clicking on the hamburger
    event.stopPropagation(); // Prevent the outside click listener from closing the nav
    console.log("Click on hamburger, opening sideNav and stopping propagation");
});

// Function to open the social media pop-up
document.getElementById("socialMediaBtn").addEventListener("click", function() {
    console.log("Opening social media popup"); // Debugging log
    document.getElementById("socialMediaPopup").style.display = "flex"; // Show the pop-up
});

// Function to close the pop-up
function closePopup() {
    console.log("Closing social media popup"); // Debugging log
    document.getElementById("socialMediaPopup").style.display = "none"; // Hide the pop-up
}

// Close the pop-up if the user clicks outside of the content
window.addEventListener('click', function(event) {
    const popup = document.getElementById('socialMediaPopup');
    if (event.target === popup) {
        popup.style.display = "none";
        console.log("Click outside social media popup, closing it");
    }
});
