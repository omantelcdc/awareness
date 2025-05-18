function submitForm() {
    const emailInput = document.getElementById('emailInput').value;
    if (emailInput) {
        document.getElementById('popup').style.display = 'flex';
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('emailInput').value = '';
}