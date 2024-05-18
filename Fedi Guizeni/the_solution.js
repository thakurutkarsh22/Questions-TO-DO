

// I came with this solution and find it the most stable and conviniant one 
// ( cuz I thought about using the setTimeOut method but that method 
//     it's not permanently and could anything effect it like tab closing or 
//     refreshing ... )


window.localStorageWithExpiery = {
    setItem : function (key,value,duration){
        const time = new Date();

        const data = { value : value , expire  : time.getTime() + duration }
        localStorage.setItem(key,JSON.stringify(data))
    },
    getItem :function (key){
        const value = localStorage.getItem(key)
        if ( !value ) {
            return undefined
        }
        const time_to_check = JSON.parse(value).expire
        const time = new Date();
        if ( time.getTime() > time_to_check ) {
            localStorage.removeItem(key)
            return undefined
        }
        return JSON.parse(value).value
    }
} 