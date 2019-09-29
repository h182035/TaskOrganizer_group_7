/**
 *
 */

"use strict";

export default class GuiHandler {
  constructor() {}
  set allstatuses(allstatuses) {
    this._allstatuses = allstatuses;
    allstatuses.forEach(element => {
      this.fillStatuses(element);
    });
  }
  set tasks(tasks) {
    this._tasks = tasks;
  }
  get tasks() {
    return this._tasks;
  }
  set newStatusCallback(callback) {
    this.status_callback = callback;
  }
  set deleteTaskCallback(callback) {
    this.delete_callback = callback;
  }
  get allstatuses() {
    return this._allstatuses;
  }

  showTask(task) {
    const tasksDiv = document.getElementById("tasks");
    let stringOptions;
    for (status in this.allstatuses) {
      stringOptions +=
        '<option value="' +
        this.allstatuses[status] +
        '">' +
        this.allstatuses[status] +
        "</option>";
    }

    if (tasksDiv.getElementsByTagName("table").length == 0) {
      console.log(tasksDiv.getElementsByTagName("table").length + "if");

      tasksDiv.innerHTML =
        '<table><thead><tr><th>Task</th><th>Status</th></tr></thead> <tbody><tr id="' +
        task.id +
        '">' +
        "<td>" +
        task.title +
        "</td>" +
        "<td>" +
        task.status +
        "</td>" +
        "<td>" +
        "<select>" +
        ' <option value="0" selected="">&lt;Modify&gt;</option>' +
        stringOptions +
        "</select>" +
        "</td>" +
        '<td><button type="button">Remove</button></td>' +
        " </tr></tbody></table>";
    } else {
      const nyTask = document.createElement("tr");
      nyTask.setAttribute("id", task.id);
      nyTask.innerHTML =
        "<td>" +
        task.title +
        "</td>" +
        "<td>" +
        task.status +
        "</td>" +
        "<td>" +
        "<select>" +
        ' <option value="0" selected="">&lt;Modify&gt;</option>' +
        stringOptions +
        "</select>" +
        "</td>" +
        '<td><button type="button">Remove</button></td>';
      const list = tasksDiv;
      tasksDiv.getElementsByTagName("tbody")[0].appendChild(nyTask);
    }

    const select = document
      .getElementById(task.id)
      .getElementsByTagName("select")[0];
    select.addEventListener("change", () => {
      this.status_callback(task.id, select.value);
    });
    this.disableOption(task);
    document
      .getElementById(task.id)
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => {
        if (window.confirm("Delete task '" + task.title + "'?")) {
          this.delete_callback(task.id);
        }
      });
  }
  disableOption(task) {
    const options = document
      .getElementById(task.id)
      .getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
      if (task.status == options[i].value) {
        options[i].disabled = true;
      } else {
        options[i].disabled = false;
      }
    }
  }
  updateTask(task) {
    console.log("Prøver å oppdatere");
    const node = document.getElementById(task.id);
    if (task.title != null) {
      node.getElementsByTagName("td")[0].innerHTML = task.title;
    }
    console.log("id er: " + task.id);
    const select = document
      .getElementById(task.id)
      .getElementsByTagName("select")[0];
    const status = select.options[select.selectedIndex].value;
    if (status != 0) {
      node.getElementsByTagName("td")[1].innerHTML = status;
    }
    node.getElementsByTagName("select")[0].selectedIndex = 0;
    task.status = status;
    this.disableOption(task);
  }
  removeTask(id) {
    console.log("removeTask executed");
    let task = document.getElementById(id);
    if (task != null) {
      task.parentElement.removeChild(task);
      console.log("removeChild executed");
    }
  }
  noTask() {
    this.tasks = null;
    console.log("GuiHandler har ingen tasks");
  }

  fillStatuses(status) {
    let select = document.getElementById("status");
    var newEl = document.createElement("option");
    newEl.setAttribute("value", status);
    newEl.innerHTML = status;
    select.appendChild(newEl);
  }
}
