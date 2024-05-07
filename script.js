const localStorageWithExpiry = {
  setItem: function (key, value, expirySeconds) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expirySeconds * 1000, 
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getItem: function (key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },
};

function setItem() {
  const key = document.getElementById("keyInput").value.trim();
  const value = document.getElementById("valueInput").value.trim();
  const expirySeconds = parseInt(
    document.getElementById("expiryInput").value.trim(),
    10
  );
  if (
    key === "" ||
    value === "" ||
    isNaN(expirySeconds) ||
    expirySeconds <= 0
  ) {
    alert(
      "Please enter valid values for key, value, and expiry time (in seconds)."
    );
    return;
  }
  localStorageWithExpiry.setItem(key, value, expirySeconds);
  document.getElementById("output").textContent = `Item set with key '${key}'`;
}

function getItem() {
  const key = document.getElementById("keyInput").value.trim();
  const value = localStorageWithExpiry.getItem(key);
  if (value !== null) {
    document.getElementById(
      "output"
    ).textContent = `Value for key '${key}': ${value}`;
  } else {
    document.getElementById(
      "output"
    ).textContent = `Item with key '${key}' not found or expired`;
  }
}
