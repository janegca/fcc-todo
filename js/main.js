import ToDoList from "./ToDoList.js";
import ToDoItem from "./ToDoItem.js";

const toDoList = new ToDoList();

// Launch App
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // Add Listeners
  // Procedural
  // load list object

  refreshPage();
};

// Refresh and Clear the Page
const refreshPage = () => {
  clearListDisplay();
  // renderList();
  // clearItemEntryFld();
  // setFocusOnItemEntryFld();
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

// Display the To Do List
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

  // addClickListenerToCheckbox(check);

  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();

  div.appendChild(check);
  div.appendChild(label);

  const container = document.getElementById("listItems");
  container.appendChild(div);
};
