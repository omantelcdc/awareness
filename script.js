async function submitForm() {
    const emailInput = document.getElementById('emailInput').value;
    if (emailInput) {
        try {
            // Show the pop-up immediately
            document.getElementById('popup').style.display = 'flex';

            // Fetch current bin state
            const getResponse = await fetch('https://api.jsonbin.io/v3/b/682a717c8561e97a5016d732', {
                method: 'GET',
                headers: {
                    'X-Master-Key': '$2a$10$ooSlj32mpbBXv4TxcPxjvOfeUbi1eUAmMCS8GvYelVz6hpFnjL2Xe'
                }
            });

            if (!getResponse.ok) {
                throw new Error('Failed to fetch bin state: ' + getResponse.statusText);
            }

            const binData = await getResponse.json();
            const currentEmails = binData.record.emails || [];

            // Append new email with timestamp
            const newEmail = { email: emailInput, timestamp: new Date().toISOString() };
            currentEmails.push(newEmail);

            // Update bin with new emails array
            const putResponse = await fetch('https://api.jsonbin.io/v3/b/682a717c8561e97a5016d732', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$ooSlj32mpbBXv4TxcPxjvOfeUbi1eUAmMCS8GvYelVz6hpFnjL2Xe'
                },
                body: JSON.stringify({ emails: currentEmails })
            });

            if (!putResponse.ok) {
                throw new Error('Failed to update bin: ' + putResponse.statusText);
            }
        } catch (error) {
            console.error('Error interacting with JSONBin:', error);
        }
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('emailInput').value = '';
    
}
