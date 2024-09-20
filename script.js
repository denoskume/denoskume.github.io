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

// Search data for suggestions
const searchData = [
    { title: "UEFA Champions League Dashboard", page: "uefa", keywords: ["football", "UEFA", "dashboard", "analysis", "champions"] },
    { title: "Netflix Data Analysis", page: "netflix", keywords: ["Netflix", "data analysis", "SQL", "Python"] },
    { title: "IoT Embedded Systems", page: "iot", keywords: ["IoT", "embedded systems", "devices", "data collection"] },
    { title: "AI-Powered Fraud Detection", page: "fraud", keywords: ["fraud detection", "AI", "machine learning"] },
    { title: "Supply Chain Management Dashboard", page: "supply-chain", keywords: ["supply chain", "Power BI", "inventory", "dashboard"] },
    { title: "AI-Based Predictive Maintenance", page: "predictive-maintenance", keywords: ["AI", "predictive maintenance", "machine learning"] }
];

// Function to show search suggestions
function showSuggestions(value) {
    const suggestionsBox = document.getElementById('search-suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    if (value.length === 0) {
        suggestionsBox.style.display = 'none'; // Hide suggestions when input is empty
        return;
    }

    const results = searchData.filter(item =>
        item.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
    );

    if (results.length > 0) {
        results.forEach(result => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `<strong>${result.title}</strong>`;
            suggestionDiv.onclick = function () {
                loadContent(result.page); // Load the corresponding page dynamically
                suggestionsBox.style.display = 'none'; // Hide suggestions once a result is clicked
            };
            suggestionsBox.appendChild(suggestionDiv);
        });
        suggestionsBox.style.display = 'block'; // Show the suggestions
    } else {
        suggestionsBox.style.display = 'none'; // Hide suggestions if no matches
    }
}

// Add event listener for the search input
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        showSuggestions(this.value);
    });
}
