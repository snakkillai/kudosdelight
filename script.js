import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Firebase configuration using environment variable for security
const firebaseConfig = {
  databaseURL: process.env.KUDOS_DB
};

// Initialize Firebase app and get a reference to the database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get a reference to the "compliments" node in your Realtime Database
const complimentsRef = ref(database, "compliments");

// Select page elements by ID
const generateButton = document.getElementById('generateButton');
const complimentDisplay = document.getElementById('compliment-display');
const complimentForm = document.getElementById('complimentForm');
const complimentInput = document.getElementById('complimentInput');
const toggleFormButton = document.getElementById('toggleFormButton'); // Don't forget to add this element in your HTML

// Show or hide the compliment submission form when button is clicked
toggleFormButton.addEventListener('click', () => {
  complimentForm.classList.toggle('hidden');
  toggleFormButton.textContent = complimentForm.classList.contains('hidden') ? 'Add Kudos' : 'Hide Form';
});

// 🔥 NEW FEATURE: Handle form submission to add a compliment to Firebase
complimentForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  const newCompliment = complimentInput.value.trim(); // Get and trim input

  // Check that the input is not empty
  if (newCompliment.length === 0) {
    alert("Please enter a compliment before submitting.");
    return;
  }

  try {
    // Push the new compliment to the "compliments" node in Firebase
    await push(complimentsRef, newCompliment);

    // Provide feedback to the user
    alert("Compliment added successfully!");
    complimentInput.value = ''; // Clear the input box
    complimentForm.classList.add('hidden'); // Optionally hide the form
    toggleFormButton.textContent = 'Add Kudos'; // Reset toggle button text

  } catch (error) {
    console.error("Error adding compliment: ", error);
    alert("Failed to add compliment. Please try again.");
  }
});
