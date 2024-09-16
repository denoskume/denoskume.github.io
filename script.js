// Open and close side navigation for mobile
function openNav() {
    document.getElementById("sideNav").style.width = "150px"; // Adjusted width to 150px for mobile view
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0"; // Collapse the side navigation to 0
}

// Function to load content dynamically based on the clicked link
function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("content").innerHTML = this.responseText;
    };
    xhttp.open("GET", `${page}.html`, true); // Load the corresponding HTML file dynamically
    xhttp.send();
}

// Load the home content by default when the page first loads
window.onload = function () {
    loadContent('home'); // Load 'home.html' by default on page load
};

// Function to detect clicks outside of the sideNav and close it
document.addEventListener('click', function (event) {
    const sideNav = document.getElementById("sideNav");
    const hamburger = document.querySelector('.hamburger');

    // If the menu is open and the click is outside the sideNav or hamburger, close the sideNav
    if (sideNav.style.width === "150px" && !sideNav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav();
    }
});

// Prevent event propagation on sideNav and hamburger clicks
document.getElementById("sideNav").addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents clicks inside sideNav from closing it
});

document.querySelector('.hamburger').addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents clicks on the hamburger from closing the sideNav
});

// Function to translate the page using Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en', // Default language of the page
        includedLanguages: 'en,fr,es', // Languages you want to support
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Add a smooth scroll to internal links (optional feature)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Optionally, add a sticky class to header when user scrolls
window.onscroll = function () {
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
};



//FOOTER SCRIPT BEGIN

<script>
        function updateTime() {
            const timeElement = document.getElementById('time');
            const dateElement = document.getElementById('date');
            
            const now = new Date();

            // Update Time
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const currentTime = `${hours}:${minutes}:${seconds}`;
            timeElement.textContent = currentTime;

            // Update Date
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = now.getFullYear();
            const currentDate = `${day}/${month}/${year}`;
            dateElement.textContent = currentDate;
        }

        setInterval(updateTime, 1000);  // Update every second
        updateTime();  // Initial call to display the time and date immediately
    </script>




//END FOOTER SCRIPT 

