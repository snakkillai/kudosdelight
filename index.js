import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"

// Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB1f_e8lo7eT156I9gNaApEjl40PHpRFFs",
  authDomain: "kudosdelight-c3a7c.firebaseapp.com",
  databaseURL: "https://kudosdelight-c3a7c-default-rtdb.firebaseio.com",
  projectId: "kudosdelight-c3a7c",
  storageBucket: "kudosdelight-c3a7c.appspot.com",
  messagingSenderId: "4769790839",
  appId: "1:4769790839:web:5f0eb44512e205c6573f72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const complimentsRef = ref(database, "compliments");

// Select DOM elements
const generateButton = document.getElementById('generateButton');
const complimentDisplay = document.getElementById('compliment-display');
const complimentForm = document.getElementById('complimentForm');
const complimentInput = document.getElementById('complimentInput');
const toggleFormButton = document.getElementById('toggleFormButton');
const successMessage = document.getElementById('successMessage');

// Toggle visibility of the form
toggleFormButton.addEventListener('click', () => {
  complimentForm.classList.toggle('hidden');
  toggleFormButton.textContent = complimentForm.classList.contains('hidden') ? 'Add Kudos' : 'Hide Form';
});

// Handle form submission
complimentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCompliment = complimentInput.value.trim();

  if (newCompliment !== '') {
    // ✅ Push an object, not a raw string
    push(complimentsRef, { text: newCompliment })
      .then(() => {
        complimentInput.value = '';
        complimentForm.classList.add('hidden');
        toggleFormButton.textContent = 'Add Kudos';
        successMessage.style.display = 'block'; // Show success message
        setTimeout(() => successMessage.style.display = 'none', 3000); // Hide it after 3s
      })
      .catch((error) => {
        console.error('Error adding compliment:', error);
      });
  }
});
