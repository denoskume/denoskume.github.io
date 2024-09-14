function loadContent(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("content").innerHTML = this.responseText;
    };
    xhttp.open("GET", `${page}.html`, true);
    xhttp.send();
}

// Load Home by default
window.onload = function() {
    loadContent('home');
};
