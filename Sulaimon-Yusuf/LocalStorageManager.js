const windowWithExpiry = {
  setItem: function(key, value, expirySeconds) {
      if (expirySeconds <= 0) {
          console.error("Expiry time must be a positive number of seconds.");
          return;
      }
      const now = new Date();
      const item = {
          value: value,
          expiry: now.getTime() + (expirySeconds * 1000)
      };
      localStorage.setItem(key, JSON.stringify(item));
  },
  getItem: function(key) {
      const itemString = localStorage.getItem(key);
      if (!itemString) {
          return null; // Key doesn't exist
      }
      const item = JSON.parse(itemString);
      const now = new Date().getTime();
      if (now > item.expiry) {
          localStorage.removeItem(key); // Remove expired item
          return null;
      }
      return item.value;
  }
};

// Example usage:
windowWithExpiry.setItem("key1", "value", 10); // Set key with value "value" and expiry in 10 seconds
console.log(windowWithExpiry.getItem("key1")); // Output: "value"
setTimeout(function() {
  console.log(windowWithExpiry.getItem("key1")); // Output: null (expired)
}, 11000); // Wait for 11 seconds
