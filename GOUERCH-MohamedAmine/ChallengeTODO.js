console.log("Assignment Done by Gouerch Mohamed Amine !");

window.localStorageWithExpiry = {

    setItem: (key, value, expiryTimeInSeconds) => {
        const currentTime = Date.now();
        const expiryTime = currentTime + expiryTimeInSeconds * 1000

        const item = {
            value: value,
            expiry: expiryTime,
        }

        // Save the item as a string in localStorage
        localStorage.setItem(key, JSON.stringify(item));

    },

    getItem: (key) => {
        const itemRetrieved = localStorage.getItem(key);

        //check existence of the item :
        if (!itemRetrieved) { return null; }

        const item = JSON.parse(itemRetrieved);
        const timenow = Date.now();

        //Check if the item is expired 
        if (timenow > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value

    }

};


// Usage example
window.localStorageWithExpiry.setItem("key1-test", "value1-test", 1000); // Set item with expiry


// Query within 1000 seconds
setTimeout(() => { console.log(window.localStorageWithExpiry.getItem("key1-test")); }, 500);


// Query after 1000 seconds
setTimeout(() => { console.log(window.localStorage.getItem("key1-test")); }, 1000 * 1000)