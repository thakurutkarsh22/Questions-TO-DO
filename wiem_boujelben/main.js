const LocalStorageWithExpiery = {
    setItem: function (key, value, time) {
        const currentDate = new Date().getTime();
        const expiredTime = currentDate + time * 1000
        localStorage.setItem(key, value + "//" + expiredTime);
        return true;
    },
    getItem: function (key) {

        const itemStr = localStorage.getItem(key);
        const [value, expiry] = itemStr.split("//");
        const now = new Date().getTime();
        if (now > parseInt(expiry, 10)) {
            localStorage.removeItem(key);
            return undefined;
        }
        return value;
    }
}