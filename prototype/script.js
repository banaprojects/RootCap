// Add subtle input animation
const inputs = document.querySelectorAll('input');
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
//     alert('This is a prototype - login functionality not implemented');
// });