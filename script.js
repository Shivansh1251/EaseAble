function toggleMenu() {
    document.querySelector(".mobile-menu").classList.toggle("active");
}

// Dark Mode Toggle Functionality in Navbar
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check if dark mode is enabled in localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to Sun
}

// Toggle Dark Mode
darkModeToggle.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior

    body.classList.toggle("dark-mode");

    // Save preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for Light Mode
    } else {
        localStorage.setItem("dark-mode", "disabled");
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for Dark Mode
    }
});

// Handle "Help" Button Click
// Emergency Help Button Click Event
document.querySelector(".help-button").addEventListener("click", function() {
    triggerEmergency("help");
});

// Voice Recognition Function
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        let speechResult = event.results[0][0].transcript.toLowerCase();
        document.getElementById("voiceResult").innerText = `You said: "${speechResult}"`;

        // Trigger emergency if key words are spoken
        if (speechResult.includes("emergency") || speechResult.includes("danger") || speechResult.includes("help")) {
            triggerEmergency(speechResult);
        }
    };

    recognition.onerror = function(event) {
        console.error("Error occurred: ", event.error);
    };
}

// Function to Show Emergency Pop-Up
function showEmergencyPopup(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalMessage").innerText = message;
    document.getElementById("emergencyModal").style.display = "block";

    // Close modal after 5 seconds automatically
    setTimeout(() => {
        document.getElementById("emergencyModal").style.display = "none";
    }, 5000);
}

// Function to Handle Emergency Actions
function triggerEmergency(type) {
    if (type.includes("emergency") || type.includes("danger")) {
        showEmergencyPopup("⚠️ Emergency Alert!", "Calling SOS... 🚨");
        document.getElementById("siren").play();

        // Call emergency services after 3 seconds
        setTimeout(() => {
            window.location.href = "tel:112"; // Change to your country's emergency number
        }, 3000);
    } 
    else if (type.includes("help")) {
        showEmergencyPopup("📞 Caretaker Alert!", "Calling your caretaker...");
        
        // Call caretaker after 3 seconds
        setTimeout(() => {
            window.location.href = "tel:+919306290891"; // Change to caretaker's number
        }, 3000);
    }
}

function openAccessibleMap() {
    window.open("https://www.google.com/maps/search/wheelchair+accessible+places", "_blank");
}

// Close Pop-Up on Click
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("emergencyModal").style.display = "none";
});



// Text Size Controls
let textSize = 16;

document.querySelector(".increase-text").addEventListener("click", function() {
    textSize += 2;
    document.body.style.fontSize = textSize + "px";
});

document.querySelector(".decrease-text").addEventListener("click", function() {
    if (textSize > 12) {
        textSize -= 2;
        document.body.style.fontSize = textSize + "px";
    }
});

// Screen Reader Toggle
let readerEnabled = false;

document.querySelector(".reader-button").addEventListener("click", function() {
    readerEnabled = !readerEnabled;
    alert(readerEnabled ? "Screen Reader Enabled" : "Screen Reader Disabled");
});



let speechSynthesisActive = false;
let speechUtterance = null;

// Function to Read the Entire Page Aloud
function startReader() {
    if (!speechSynthesisActive) {
        // Get all readable text from the page
        let textContent = document.body.innerText;
        
        // Create speech synthesis instance
        speechUtterance = new SpeechSynthesisUtterance(textContent);
        speechUtterance.lang = 'en-US'; // Set language
        speechUtterance.rate = 1; // Normal speed
        speechUtterance.pitch = 1; // Normal pitch

        // Start speaking
        window.speechSynthesis.speak(speechUtterance);
        speechSynthesisActive = true;
        document.querySelector(".reader-button").innerText = "Reading...";
    }
}

// Function to Stop the Reader
function stopReader() {
    if (speechSynthesisActive) {
        window.speechSynthesis.cancel();
        speechSynthesisActive = false;
        document.querySelector(".reader-button").innerText = "Enable Reader";
    }
}

// Attach event listeners to buttons
document.querySelector(".reader-button").addEventListener("click", startReader);
document.querySelector(".stop-reader-button").addEventListener("click", stopReader);


// Redirect to another page when "Enable Reminder" is clicked
document.querySelector(".enable-reminder-button").addEventListener("click", function() {
    window.location.href = "Reminder.html"; // Change to the actual page URL if needed
});


// Image Slideshow for .image-content
// Image Slideshow for .image-content
const images = ["Images/image1.jpeg", "Images/image2.jpg", "Images/readboy.jpeg"]; // Corrected paths
let currentIndex = 0;
const imageElement = document.getElementById("changingImage");

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; // Loop back after last image
    imageElement.style.opacity = "0"; // Fade out effect

    setTimeout(() => {
        imageElement.src = images[currentIndex]; // Change image
        imageElement.style.opacity = "1"; // Fade in effect
    }, 500); // Delay for smooth transition
}

// Change image every 3 seconds
setInterval(changeImage, 3000);

