# Questions-TO-DO

##  Q1 -> Create a Local Strorage with expiry such that it takes a Key, a value and Time such that the key will be available in local Storage till that specified time and after that it would be deleted.

example
Setting key and value with time 1000 seconds 
window.localStorageWithExpiery.setItem("key1", "value", 1000);

Query within 1000 seconds 
window.localStorageWithExpiery.getItem("key1"); 
asnwer -> "value"

Query after 1000 seconds 
window.localStorageWithExpiery.getItem("key1"); 
asnwer -> "undefined"
