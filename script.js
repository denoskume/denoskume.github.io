// Function to open the side navigation menu
function openNav() {
    console.log("Opening side navigation..."); // Debugging log
    document.getElementById("sideNav").style.width = "75px"; // Open the side navigation to 150px
}

// Function to close the side navigation menu
function closeNav() {
    console.log("Closing side navigation..."); // Debugging log
    document.getElementById("sideNav").style.width = "0"; // Collapse the side navigation to 0
}

// Function to detect clicks outside of the sideNav and close it
document.addEventListener('click', function(event) {
    var sideNav = document.getElementById("sideNav");
    var hamburger = document.querySelector('.hamburger');

    console.log("Click detected"); // Debugging log
    
    // Check if sideNav is open
    if (sideNav.style.width === "75px") {
        // If click is outside of sideNav and hamburger, close sideNav
        if (!sideNav.contains(event.target) && !hamburger.contains(event.target)) {
            console.log("Click outside sideNav, closing...");
            closeNav();
        } else {
            console.log("Click inside sideNav or hamburger, keeping it open");
        }
    }
});

// Add event listener to prevent event propagation on sideNav and hamburger clicks
document.getElementById("sideNav").addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent closing the menu when clicking inside it
    console.log("Click inside sideNav, stopping propagation");
});

document.querySelector('.hamburger').addEventListener('click', function(event) {
    openNav(); // Open the sideNav when clicking the hamburger
    event.stopPropagation(); // Prevent closing the menu immediately
    console.log("Click on hamburger, opening sideNav and stopping propagation");
});
