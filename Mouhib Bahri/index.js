const localStorageWithExpiry = {
    /**
     * Set an item in local storage with expiration.
     * @param {string} key The key under which to store the value.
     * @param {*} value The value to store.
     * @param {number} expirationDuration Expiration duration expressed in seconds.
     */
    setItem: (key, value, expirationDuration) => {
        if (!key || !value || !expirationDuration) {
            throw new Error("Please provide key, value, and expiration duration.");
        }
        const item = {
            value: value,
            expiry: Date.now() + expirationDuration * 1000
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    /**
     * Get an item from local storage.
     * @param {string} key The key of the item to retrieve.
     * @returns {*} The value of the item if found, otherwise undefined.
     */
    getItem: (key) => {
        const itemString = localStorage.getItem(key);
        if (itemString) {
            const item = JSON.parse(itemString);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(key);
            } else {
                return item.value;
            }
        }
        return undefined; // Return undefined as the example of the challenge stated
    }
};


const storageKey = document.querySelector('#storageKey');
const retrieveKey = document.querySelector('#retrieveKey');
const value = document.querySelector('#value');
const expiry = document.querySelector('#expiry');
const resultElement = document.querySelector('#result');

document.querySelector('#storageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const key = storageKey.value;
    const itemValue = value.value;
    const itemExpiry = parseInt(expiry.value);
    // Validate input
    if (!key || !itemValue || isNaN(itemExpiry) || itemExpiry <= 0) {
        showErrorMessage('Please provide a valid key, value, and positive number for expiry.');
        return;
    }
    // Call your function to save data to local storage
    localStorageWithExpiry.setItem(key, itemValue, itemExpiry);
    // Show success message
    showSuccessMessage(`Item with key "${key}" created successfully!`);
});

document.querySelector('#retrieveForm').addEventListener('submit',function(event){
    event.preventDefault();
    const result = localStorageWithExpiry.getItem(retrieveKey.value);
    // Display the result
    const color=result!==undefined ? 'info' : 'danger';
        resultElement.innerHTML = `<p class="text-${color}">Value: ${result}</p>`;
})



const showErrorMessage = function (message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('text-danger');
    errorMessage.textContent = message;
    resultElement.appendChild(errorMessage);

    // Remove message after 2 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 2000);
}

const showSuccessMessage = function (message) {
    const successMessage = document.createElement('p');
    successMessage.classList.add('text-success');
    successMessage.textContent = message;
    resultElement.appendChild(successMessage);

    // Remove message after 2 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 2000);
}
