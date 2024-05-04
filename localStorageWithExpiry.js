const storage = {}

const localStorageWithExpiry = {
  setItem: (key, value, expirySeconds) => {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + expirySeconds * 1000
    }
    storage[key] = JSON.stringify(item)
  },
  getItem: key => {
    const itemStr = storage[key]
    if (!itemStr) {
      return ("undefined")
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      delete storage[key]
      return ("undefined")
    }
    return item.value
  }
}

// TEST 
localStorageWithExpiry.setItem("key1", "value1", 5) // 5 secondes d'expiration

console.log(localStorageWithExpiry.getItem("key1")) // Affiche "value"


setTimeout(() => {
  console.log(localStorageWithExpiry.getItem("key1")) // Affiche null après 5 secondes
}, 5000)
