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

            // Initialize the book effect when loading a page with the book
            if (document.getElementById("book")) {
                $("#book").turn({
                    width: 800,
                    height: 600,
                    autoCenter: true
                });
            }
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

    // Show all suggestions when input is empty, or filter based on input
    const results = value.length === 0 
        ? searchData // Show all suggestions if no input
        : searchData.filter(item =>
            item.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase()))
        );

    if (results.length > 0) {
        results.forEach(result => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `<strong>${result.title}</strong>`;
            suggestionDiv.onclick = function () {
                loadContent(result.page); // Load the corresponding page dynamically
                suggestionsBox.style.display = 'none'; // Hide suggestions once a result is clicked
                clearSearchInput(); // Clear the search input after a selection is made
            };
            suggestionsBox.appendChild(suggestionDiv);
        });
        suggestionsBox.style.display = 'block'; // Show the suggestions
    } else {
        suggestionsBox.style.display = 'none'; // Hide suggestions if no matches
    }
}

// Function to clear search input
function clearSearchInput() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.value = ''; // Clear the input
    }
}

// Function to show suggestions popup on focus (whether or not there is input)
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('focus', function () {
        showSuggestions(''); // Show all suggestions on focus/click
    });
    searchInput.addEventListener('input', function () {
        showSuggestions(this.value); // Show filtered suggestions as the user types
    });
}

// Close suggestions popup and clear search input when clicking outside
document.addEventListener('click', function (event) {
    const suggestionsBox = document.getElementById('search-suggestions');
    const searchBar = document.querySelector('.search-bar input');
    if (suggestionsBox && searchBar) {
        if (!searchBar.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = 'none'; // Hide the suggestions if clicked outside
            clearSearchInput(); // Clear the search input when clicking outside
        }
    }
});

// Language Selector Data
const languageData = {
    en: {
        home: "Home",
        about: "About Me",
        education: "Education",
        experience: "Experience",
        training: "Training",
        certification: "Certification",
        projects: "Projects",
        contact: "Contact",
    },
    fr: {
        home: "Accueil",
        about: "À propos de moi",
        education: "Éducation",
        experience: "Expérience",
        training: "Formation",
        certification: "Certification",
        projects: "Projets",
        contact: "Contact",
    },
    es: {
        home: "Inicio",
        about: "Sobre mí",
        education: "Educación",
        experience: "Experiencia",
        training: "Formación",
        certification: "Certificación",
        projects: "Proyectos",
        contact: "Contacto",
    }
};

// Function to update the page language dynamically
function setLanguage(language) {
    const langElements = document.querySelectorAll("[data-lang-key]");
    langElements.forEach(element => {
        const key = element.getAttribute("data-lang-key");
        if (languageData[language][key]) {
            element.textContent = languageData[language][key];
        }
    });
}

// Event Listener for language selection
const languageSelector = document.getElementById("language-selector");
if (languageSelector) {
    languageSelector.addEventListener("change", function() {
        const selectedLang = this.value;
        setLanguage(selectedLang); // Update the page content based on the selected language
    });
}

// Set default language to English
window.addEventListener('load', function() {
    setLanguage('en'); // Set English as the default language on page load
});

// CERTIFICATES SECTION    

document.addEventListener('DOMContentLoaded', function() {
    loadCertificates();

    // Handle form submission
    document.getElementById('certificateForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form data
        const title = document.getElementById('certificate-title').value;
        const provider = document.getElementById('certificate-provider').value;
        const issueDate = document.getElementById('certificate-date').value;
        const credentialID = document.getElementById('credential-id').value;
        const certificateLink = document.getElementById('certificate-link').value;
        const certificateImage = document.getElementById('certificate-image').files[0];

        // Handle image upload and store it as Base64
        if (certificateImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageBase64 = event.target.result;
                addCertificate(title, provider, issueDate, credentialID, certificateLink, imageBase64);
                saveCertificate(title, provider, issueDate, credentialID, certificateLink, imageBase64);
            };
            reader.readAsDataURL(certificateImage);
        } else {
            addCertificate(title, provider, issueDate, credentialID, certificateLink, null);
            saveCertificate(title, provider, issueDate, credentialID, certificateLink, null);
        }

        // Reset the form
        document.getElementById('certificateForm').reset();
    });
});

// Function to add certificate to the page
function addCertificate(title, provider, issueDate, credentialID, certificateLink, imageBase64) {
    const certificateItem = document.createElement('div');
    certificateItem.classList.add('certificate-item');

    certificateItem.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Provider:</strong> ${provider}</p>
        <p><strong>Issued:</strong> ${issueDate}</p>
        <p><strong>Credential ID:</strong> ${credentialID}</p>
        <a href="${certificateLink}" target="_blank" class="view-credential">Show credential</a>
    `;

    // Display the image if provided
    if (imageBase64) {
        const imgElement = document.createElement('img');
        imgElement.src = imageBase64;
        certificateItem.appendChild(imgElement);
    }

    // Append to the certificate list
    document.getElementById('certificate-list').appendChild(certificateItem);
}

// Function to save certificate to local storage
function saveCertificate(title, provider, issueDate, credentialID, certificateLink, imageBase64) {
    const certificate = {
        title: title,
        provider: provider,
        issueDate: issueDate,
        credentialID: credentialID,
        certificateLink: certificateLink,
        imageBase64: imageBase64
    };

    let certificates = JSON.parse(localStorage.getItem('certificates')) || [];
    certificates.push(certificate);
    localStorage.setItem('certificates', JSON.stringify(certificates));
}

// Function to load certificates from local storage
function loadCertificates() {
    const certificates = JSON.parse(localStorage.getItem('certificates')) || [];

    certificates.forEach(cert => {
        addCertificate(cert.title, cert.provider, cert.issueDate, cert.credentialID, cert.certificateLink, cert.imageBase64);
    });
}
