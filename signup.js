document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would handle the sign-up logic, such as sending data to a server

    // For simplicity, let's assume sign-up is successful and redirect to the notepad page
    window.location.href = 'game.html';
});
