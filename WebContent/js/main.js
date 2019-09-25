"use strict";
//getting modal element
var modal = document.getElementById("simpleModal");
//get new task button
var modalBtn = document.getElementById("modalBtn");
//get close button
var closeBtn = document.getElementById("closeBtn");
//get clear button
var clearBtn = document.getElementById("clearBtn");
//get add task button
var addBtn = document.getElementById("addBtn");
//get title
var input = document.getElementById("input");
//get status
var select = document.getElementById("status");

//listen for new task click
modalBtn.addEventListener("click", openModal);

//listen for close modal click
closeBtn.addEventListener("click", closeModal);

//listen for a click outside of modal
window.addEventListener("click", clickOutside);

//listen for clear text click
clearBtn.addEventListener("click", clearinput);

//listen for add task click
addBtn.addEventListener("click", addTask);

//function to open modal
function openModal() {
  modal.style.display = "block";
}
//function to close modal
function closeModal() {
  modal.style.display = "none";
}

//close modal if clicking outside
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

//function to clear input
function clearinput() {
  input.value = "";
}

//function to add task
function addTask() {
  //check if input is empty - not allowed
  if (input.value === "") {
    window.alert("Empty title is not allowed!");
    return;
  }
  //addTaskCallbackOrWhatever(input.value, status.value)
  var title = input.value;
  var status = select.options[select.selectedIndex].value;
  input.value = "";
  select.value = "waiting";
  closeModal();
  console.log(title + ", " + status);
}
