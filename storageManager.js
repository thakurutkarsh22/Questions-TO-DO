class StorageManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.clearExpired();
    }

    storeItem(key, value, duration) {
        const now = new Date();
        const expiration = new Date(now.getTime() + duration * 60000);
        const item = {
            value: value,
            expiration: expiration.getTime(),
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    retrieveItem(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiration) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }

    deleteItem(key) {
        localStorage.removeItem(key);
    }

    clearExpired() {
        Object.keys(localStorage).forEach(key => {
            this.retrieveItem(key);
        });
    }
}

// Function to test storage operations
function testStorage() {
    const storage = new StorageManager();

    
    storage.storeItem('userInfo', { name: 'Alice', age: 30 }, 1); 

    const userInfo = storage.retrieveItem('userInfo');
    console.log('Retrieved:', userInfo);
        setTimeout(() => {
        const expiredInfo = storage.retrieveItem('userInfo');
        console.log('Retrieved after expiration:', expiredInfo);
    }, 61000); // 61 seconds later
}
