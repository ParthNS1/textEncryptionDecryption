// Function to display a popup for entering the secret key
function showKeyPrompt(callback) {
    const secretKey = prompt("Enter the secret key:");
    callback(secretKey);
}

// Function to show the secret key input popup
function showKeyPopup(isEncrypt) {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const closePopup = document.getElementById('close-popup');
    const submitKey = document.getElementById('submit-key');
    const secretKeyInput = document.getElementById('secret-key');

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    submitKey.addEventListener('click', function () {
        const encryptionKey = secretKeyInput.value;

        if (encryptionKey) {
            popup.style.display = 'none';

            if (isEncrypt) {
                handleEncryption(true, encryptionKey); // Encrypt
            } else {
                handleEncryption(false, encryptionKey); // Decrypt
            }
        }
    });
}

// Function to handle encryption and decryption
function handleEncryption(isEncrypt, encryptionKey) {
    const textInput = document.getElementById('text-input').value;

    if (!textInput) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = 'Please enter text.';
        return;
    }
    
    try {
        if (isEncrypt) {
            const encryptedText = CryptoJS.AES.encrypt(textInput, encryptionKey).toString();
            document.getElementById('encrypted-text').textContent = `${encryptedText}`;
            document.getElementById('decrypted-text').textContent = ''; // Clear decrypted text
        } else {
            const decryptedText = CryptoJS.AES.decrypt(textInput, encryptionKey).toString(CryptoJS.enc.Utf8);
            document.getElementById('decrypted-text').textContent = `${decryptedText}`;
            document.getElementById('encrypted-text').textContent = ''; // Clear encrypted text
        }
        document.getElementById('result').style.display = 'block';
    } catch (error) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = 'Operation failed. Please check your key or input.';
    }
}

// Event listeners for encrypt and decrypt buttons
document.getElementById('encrypt-button').addEventListener('click', function () {
    showKeyPopup(true);
});

document.getElementById('decrypt-button').addEventListener('click', function () {
    showKeyPopup(false);
});

// Event listeners for copy buttons
document.getElementById('copy-encrypted').addEventListener('click', function () {
    copyToClipboard('encrypted-text');
});

document.getElementById('copy-decrypted').addEventListener('click', function () {
    copyToClipboard('decrypted-text');
});

// Function to copy text to the clipboard
function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    const text = textElement.textContent;
    const formattedText = text.replace(/Decrypted Text:|Encrypted Text:/g, '').trim(); // Remove labels and trim spaces

    const tempInput = document.createElement('textarea');
    tempInput.value = formattedText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
