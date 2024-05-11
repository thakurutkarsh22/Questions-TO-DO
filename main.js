const myLocalStorage = {
    getItem: function(key) {
        return localStorage.getItem(key);
    },
    setItem: function(key, value, expiryTime) {
        localStorage.setItem(key, value);
        setTimeout(() => {
            localStorage.removeItem(key);
        }, expiryTime);
    }
};

const expiryTime = 5000; // 5 seconds

myLocalStorage.setItem("hi", "hello", expiryTime);
console.log(myLocalStorage.getItem("hi"));

setTimeout(() => {
    console.log(myLocalStorage.getItem("hi")); 
}, expiryTime);
