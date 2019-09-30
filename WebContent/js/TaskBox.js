"use strict";

export default class TaskBox {
  constructor(allstatuses) {
    this.allstatuses = allstatuses;
  }

  set allstatuses(values) {
    this._allstatuses = values;
  }

  set onSubmit(callback) {
    this._onSubmit = callback;
  }

  //function to close modal
  closeModal(modal) {
    modal.style.display = "none";
  }
  //method to clear input
  clearinput(input) {
    input.value = "";
  }
  //method to add task
  createTask(input, select) {
    if (input.value === "") {
      window.alert("Empty title is not allowed!");
      return;
    }
    var taskTitle = input.value;
    var taskStatus = select.options[select.selectedIndex].text;
    input.value = "";
    select.value = "WAITING";
    const task = { title: taskTitle, status: taskStatus };
    return task;
  }
  openModal(modal) {
    modal.style.display = "block";
  }
}
