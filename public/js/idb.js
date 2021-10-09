// const saveRecord = 

// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open('New_Budget', 1);
// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_balance', { autoIncrement: true });
  };
  // upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadbalance() function to send all local db data to api
    if (navigator.onLine) {
      // we haven't created this yet, but we will soon, so let's comment it out for now
      uploadBalance()
    }
  };
  
  request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };
  // This function will be executed if we attempt to submit a new balance and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_balance'], 'readwrite');
  
    // access the object store for `new_balance`
    const balanceObjectStore = transaction.objectStore('new_balance');
  
    // add record to your store with add method
    balanceObjectStore.add(record);
  }
  function uploadBalance() {
    // open a transaction on your db
    const transaction = db.transaction(['new_balance'], 'readwrite');
  
    // access your object store
    const balanceObjectStore = transaction.objectStore('new_balance');
  
    // get all records from store and set to a variable
    const getAll = balanceObjectStore.getAll();
  
    // upon a successful .getAll() execution, run this function
  getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_balance'], 'readwrite');
          // access the new_pizza object store
          const pizzaObjectStore = transaction.objectStore('new_balance');
          // clear all items in your store
          pizzaObjectStore.clear();

          alert('All saved transactions have been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
      // more to come...
    }
    // listen for app coming back online
window.addEventListener('online', uploadBalance);
