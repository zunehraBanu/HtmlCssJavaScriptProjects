import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://realtime-database-3419d-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")
addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearinputFieldEl()     //inputFieldEl.value=""
    //appendItemToShoppingListEl(inputValue) //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
})

onValue(shoppingListInDB, function (snapshot) {

    //change onvalue code so that it uses snapshot.exits() to show items when there are items in database and if there are not display the text 'No items here..yet'.
    if (snapshot.exists()) {
        //use object.values() to convert snapshot.val() from an object to an Array. Create a variale for this
        let itemArray = Object.entries(snapshot.val())

        clearShoppingListEl()//shoppingListEl.innerHTML="" you can write this way without writing in function
        //Write a for loop to iterate on itemsArray and console log each item
        for (let i = 0; i < itemArray.length; i++) {
            //console.log(itemArray[i])
            //use the appendItemToShoppingListEl(itemValue) function inside of thr for loop to append item to the shopping list element for each iteration.
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)    //itemArray because 
        }
        //console.log(itemArray)
    }else{
        shoppingListEl.innerHTML="No items here....yet"
    }
})
function clearinputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    //Attach an event listener to newEl and make it so you console log the id of the item when it's passed
    newEl.addEventListener("click", function () {
        //Make a let variable called exactLocationOfItemInDB' and set it equal to ref (database, something) where you subsitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        //Use the remove function to remove item from database
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}