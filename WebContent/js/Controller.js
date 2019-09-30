"use strict";
import TaskBox from "./TaskBox.js";
import GuiHandler from "./GuiHandler.js";
import DatabaseHandler from "./DatabaseHandler.js";

export default class Controller {
  constructor() {
    this.dbHandler = new DatabaseHandler();
    this.guiHandler = new GuiHandler();
    this.taskBox = new TaskBox();
    this.dbHandler.getStatusesFromServer(this.guiHandler, this.taskBox);
    this.dbHandler.getTasksFromServer(this.guiHandler);
    this.modal = document.getElementById("simpleModal")
  }
  setDeleteCallBack() {
    this.guiHandler.deleteTaskCallback = id => {
      this.dbHandler.deleteTaskFromServer(this.guiHandler, id);
    };
  }
  setNewStatusCallBack() {
    this.guiHandler.newStatusCallback = (id, status) => {
      this.dbHandler.modifyStatusOnServer(this.guiHandler, id, status);
    };
  }
  setOnSubmitCallback() {
    this.taskBox.onSubmit = task => {
      this.dbHandler.addTaskToServer(this.guiHandler, this.taskBox, task.title, task.status);
      this.taskBox.closeModal(this.modal);
    };
  }
  initDocument() {
    let closeBtn = document.getElementById("closeBtn");
    let modalBtn = document.getElementById("modalBtn");
    let clearBtn = document.getElementById("clearBtn");
    let addBtn = document.getElementById("addBtn");
    let input = document.getElementById("input");
    let select = document.getElementById("status");

    modalBtn.addEventListener("click", () => {
      this.taskBox.openModal(this.modal);
    });
    // listen for close modal click
    closeBtn.addEventListener("click", () => {
      this.taskBox.closeModal(this.modal);
    });
    // listen for clear text click
    clearBtn.addEventListener("click", () => {
      this.taskBox.clearinput(input);
    });
    // listen for add task click
    addBtn.addEventListener("click", () => {
      let newTask = this.taskBox.createTask(input, select, modalBtn);
      if (newTask != null) {
        this.taskBox._onSubmit(newTask);
      }
    });
  }
}










