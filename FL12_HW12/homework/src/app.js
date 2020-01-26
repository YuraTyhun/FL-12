const mainPage = document.querySelector('.main-page');
const addTerm = document.querySelector('.add-new-term');

const addPage = document.querySelector('.add-page');
const add = document.querySelector('.add');
const inputDiv = document.querySelector('.input');
const termInput = document.querySelector('.add-term-input');
const defInput = document.querySelector('.add-def-input');
const saveChangesBtn = document.querySelector('.save-changes');

const modifyPage = document.querySelector('.modify-page');
const editInput = document.querySelector('.modify-input');
const editDefInput = document.querySelector('.modify-def-input');
const cancelEdit = document.querySelectorAll('.cancel-edit');
const saveAfterEdit = document.querySelector('.save-after-edit');

const termList = document.querySelector('.term-list');

let termItems = [];
let finishedItems = [];
let itemsIndex = null;

// Clear hash on window load and init script.
window.addEventListener('load', () => {
    getItems();
    listTermItems();
    window.location.hash = '';
});

//display input fields
add.addEventListener('click', () => {
    inputDiv.style.display = 'block'
});

// click on add btn.
addTerm.addEventListener('click', () => {
    location.hash = 'add-page';
    showAddPage();
})

// Save edited values.
saveChangesBtn.addEventListener('click', () => { 
    addTermItem(termInput.value, defInput.value);
    location.hash = '';
});

//click on cancel button.
for (let c of cancelEdit) {
    c.addEventListener('click', () => {
        location.hash = 'main-page';
        showMainPage();
    });
}

// Save new value after edit
saveAfterEdit.addEventListener('click', () => {
    let filteredItems = termItems.filter(item => item.term !== editInput.value);
    if (editInput.value !== '' &&
        (filteredItems.length === termItems.length || termItems[itemsIndex].term === editInput.value)) {
        termItems[itemsIndex].term = editInput.value;
        termItems[itemsIndex].def = editDefInput.value;
        listTermItems();
        itemsIndex = null;
        showMainPage();
    } else if (editInput.value === '') {
        alert('You can\'t add empty item !');
    } else {
        alert('You can\'t add already exist item !');
    }
});

// Show main page.
function showMainPage () {
  window.location.hash = '';
  mainPage.style.display = 'block';
  modifyPage.style.display = 'none';
  addPage.style.display = 'none';
}

// Show add page
function showAddPage() {
  window.location.hash = '#add';
  addPage.style.display = 'block';
  modifyPage.style.display = 'none';
  mainPage.style.display = 'none';
}

// Show modify page
function showModifyPage () {
  let modifiedValue = editInput.value;
  let modifiedDefValue = editDefInput.value;
  // Add modified tag to hash.
  for(let i=0; i < termItems.length; i++) {
    if (termItems[i].term === modifiedValue) {
      window.location.hash = '#modify/:' + i;
    }
  }
  modifyPage.style.display = 'block';
  addPage.style.display = 'none';
  mainPage.style.display = 'none';
}

// Add item in global list.
function addTermItem(term, def) {
  // check if item already exist.
  if (!termItems.every(item => item.term !== term)) {
    alert('You can\'t add already exist item !');
  } else if (term === '') {
    // check if item value is empty.
    alert('You can\'t add empty item !');
  } else {
    // Add item in a list.
    const newItem = {
        term: term,
        def: def,
        completed: false
    };
    termItems.push(newItem);
    termInput.value = '';
    defInput.value = '';
    // go to main page.
    showMainPage();
    // Show all items in a list.
    listTermItems();
  }
}

//Make a list from terms
const listTermItems = () => {
  termList.innerHTML = '';
  // Find completed items.
  termItems = termItems.filter(item => !item.completed);
  finishedItems = finishedItems.filter(item => item.completed);
  termItems = termItems.concat(finishedItems);

  // Build items in a list
  for (let item = 0; item < termItems.length; item++) {
    const termItem = document.createElement('li');
    const checkItem = document.createElement('input');
    checkItem.setAttribute('type', 'checkbox');
    
    checkItem.addEventListener('click', () => {
        if (!termItems[item].completed) {
        termItems[item].completed = true;
        finishedItems.push(termItems[item]);
        listTermItems();
      } else {
        termItems[item].completed = false;
        listTermItems();
      }
    });
    
    // Check for completed state
    if (termItems[item].completed) {
        checkItem.setAttribute('checked', 'checked')
    }
    let listTerm = document.createElement('span');
    let listDef = document.createElement('span');
    listTerm.innerHTML = termItems[item].term 
    listDef.innerHTML = termItems[item].def;

    // Define edit button
    let editItem = document.createElement('span');
    editItem.innerHTML = 'Edit';
    editItem.style.border = '1px solid #000';
    editItem.style.width = '100px';
    editItem.style.marginRight = '5px';
      
      
    // click on edit btn
    editItem.onclick = function() {
      if (!termItems[item].completed) {
        editInput.value = termItems[item].term;
        editDefInput.value = termItems[item].def;
        showModifyPage();
        itemsIndex = item;
      } else {
        alert('You can\'t edit already done item !');
      }
    };

    // create delete button
    const deleteItem = document.createElement('span');
    deleteItem.innerHTML = 'X';
    deleteItem.style.border = '1px solid #000';
    deleteItem.style.width = '30px';
    
    // click on delete brn
    deleteItem.onclick = function() {
      removeItem(item);
      finishedItems = termItems.filter(item => item.completed);
      listTermItems();
    };
    
    // Generate list from items
    termItem.appendChild(listTerm);
    termItem.appendChild(listDef);
    termItem.appendChild(checkItem);
    termList.appendChild(termItem);
    termItem.appendChild(editItem);
    termItem.appendChild(deleteItem);

    // Change background if task already checked.
    if (termItems[item].completed) {
      termItem.style.backgroundColor = 'lightskyblue';
    }
  }
  saveItems();
};

// Remove item from list
function removeItem(index) {
  termItems.splice(index, 1);
}

// Save items in local storage
function saveItems() {
  let strItems = JSON.stringify(termItems);
  let strDoneItems = JSON.stringify(finishedItems);
  localStorage.setItem('items', strItems);
  localStorage.setItem('finishedItems', strDoneItems);
}

// Get all items from storage after page loads
function getItems() {
  let strItems = localStorage.getItem('items');
  let strDoneItems = localStorage.getItem('finishedItems');
  termItems = JSON.parse(strItems);
  finishedItems = JSON.parse(strDoneItems);
  if (!termItems) {
    termItems = [];
  }
  if (!finishedItems) {
    finishedItems = [];
  }
}
