// Add subtle input and select animations
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// // Prevent form submission for prototype
// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('This is a prototype - signup functionality not implemented');
// });

// Set max date for DOB to today
const dobInput = document.getElementById('dob');
const today = new Date().toISOString().split('T')[0];
dobInput.setAttribute('max', today);