"use strict";

export default class TaskBox {
  constructor(allstatuses) {
    this.initTaskBox();
    this.allstatuses = allstatuses;
  }

  set allstatuses(values) {
    this._allstatuses = values;
  }

  set onSubmit(callback) {
    this._onSubmit = callback;
  }

  //function to close modal
  closeModal(modal, input, select) {
    modal.style.display = "none";
    this.clearinput();
  }
  //method to clear input
  clearinput(input, select) {
    document.getElementById("input").value = "";
    document.getElementById("status").value = "WAITING";
  }
  //method to add task
  createTask(input, select) {
    if (input.value === "") {
      window.alert("Empty title is not allowed!");
      return;
    }
    var taskTitle = input.value;
    var taskStatus = select.options[select.selectedIndex].text;
    const task = { title: taskTitle, status: taskStatus };
    return task;
  }
  openModal(modal) {
    modal.style.display = "block";
  }
  initTaskBox() {
    let closeBtn = document.getElementById("closeBtn");
    let modalBtn = document.getElementById("modalBtn");
    let clearBtn = document.getElementById("clearBtn");
    let addBtn = document.getElementById("addBtn");
    let input = document.getElementById("input");
    let select = document.getElementById("status");
    let modal = document.getElementById("simpleModal");

    modalBtn.addEventListener("click", () => {
      this.openModal(modal);
    });
    // listen for close modal click
    closeBtn.addEventListener("click", () => {
      this.closeModal(modal);
    });
    // listen for clear text click
    clearBtn.addEventListener("click", () => {
      this.clearinput(input);
    });
    // listen for add task click
    addBtn.addEventListener("click", () => {
      let newTask = this.createTask(input, select, modalBtn);
      if (newTask != null) {
        this._onSubmit(newTask);
      }
    });
}
}
