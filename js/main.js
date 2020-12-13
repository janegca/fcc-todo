import ToDoList from "./ToDoList.js";
import ToDoItem from "./ToDoItem.js";

const toDoList = new ToDoList();

// Launch App
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

// -- Initialize the Application
const initApp = () => {
  // Add Listeners
  const itemEntryForm = document.getElementById("itemEntryForm");
  itemEntryForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    processSubmission();
  });

  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener("click", (ev) => {
    const list = toDoList.getList();
    if (list.length) {
      const confirmed = confirm(
        "Are you sure you want to clear the entire list?"
      );
      if (confirmed) {
        toDoList.clearList();
        updatePersistentData(toDoList.getList());
        refreshPage();
      }
    }
  });

  // Procedural
  loadListObject();
  refreshPage();
};

const loadListObject = () => {
  const storedList = localStorage.getItem("myToDoList");
  if (typeof storedList !== "string") return;

  const parsedList = JSON.parse(storedList);
  parsedList.forEach((itemObj) => {
    const newToDoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newToDoItem);
  });
};

// -- Refresh and Clear the Page
const refreshPage = () => {
  clearListDisplay();
  renderList();
  clearItemEntryFld();
  setFocusOnItemEntryFld();
};

const clearListDisplay = () => {
  const parentElem = document.getElementById("listItems");
  deleteContents(parentElem);
};

const deleteContents = (parent) => {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
};

// -- Display the To Do List
const renderList = () => {
  const list = toDoList.getList();
  list.forEach((item) => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  const div = document.createElement("div");
  div.className = "item";

  const check = document.createElement("input");
  check.type = "checkbox";

  check.id = item.getId();
  check.tabIndex = 0;

  addClickListenerToCheckbox(check);

  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();

  div.appendChild(check);
  div.appendChild(label);

  const container = document.getElementById("listItems");
  container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
  checkbox.addEventListener("click", (ev) => {
    toDoList.removeItemFromList(checkbox.id);
    updatePersistentData(toDoList.getList());
    setTimeout(() => {
      refreshPage();
    }, 1000);
  });
};

const updatePersistentData = (listArray) => {
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryFld = () => {
  document.getElementById("newItem").value = "";
};

const setFocusOnItemEntryFld = () => {
  document.getElementById("newItem").focus();
};

// -- Handle new item additions
const processSubmission = () => {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;
  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);
  updatePersistentData(toDoList.getList());
  refreshPage();
};

const getNewEntry = () => {
  return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1;
  }
  return nextItemId;
};

const createNewItem = (id, txt) => {
  const toDo = new ToDoItem();
  toDo.setId(id);
  toDo.setItem(txt);
  return toDo;
};
