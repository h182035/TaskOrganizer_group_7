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
}










