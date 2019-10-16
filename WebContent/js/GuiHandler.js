/**
 *
 */

"use strict";

export default class GuiHandler {
  constructor() { }
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
    const selectElement = document.createElement('select')
    const option1 = document.createElement('option')
    option1.setAttribute('value', '0')
    option1.setAttribute('selected', '')
    option1.appendChild(document.createTextNode('<Modify>'))
    selectElement.appendChild(option1)
    for (status in this.allstatuses) {
      let option2 = document.createElement('option')
      option2.setAttribute('value', this.allstatuses[status])
      option2.appendChild(document.createTextNode(this.allstatuses[status]))
      selectElement.appendChild(option2)
    }

    if (tasksDiv.getElementsByTagName("table").length == 0) {
      console.log(tasksDiv.getElementsByTagName("table").length + "if");


        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const th1 = document.createElement('th')
        const th2 = document.createElement('th')
        const tbody = document.createElement('tbody')
        const tr = document.createElement('tr')
        const tr2 = document.createElement('tr')
        const td = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td')
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.appendChild(document.createTextNode('Remove'))

        th1.appendChild (document.createTextNode('Task'));
        th2.appendChild (document.createTextNode('Status'));
        tr.appendChild(th1)
        tr.appendChild(th2)
        thead.appendChild(tr)
        table.appendChild(thead)
        

        const tasktitle = document.createTextNode(task.title)
        const taskstatus = document.createTextNode(task.status)

        tr2.setAttribute('id', task.id)
        td2.appendChild(tasktitle)
        td3.appendChild(taskstatus)
        td4.appendChild(selectElement)
        td5.appendChild(button)
        tr2.appendChild(td2)
        tr2.appendChild(td3)
        tr2.appendChild(td4)
        tr2.appendChild(td5)

        tbody.appendChild(tr2)
        table.appendChild(tbody)


        tasksDiv.appendChild(table)
        
    } else {
      const nyTask = document.createElement("tr");
      nyTask.setAttribute("id", task.id);

        const tdTitle = document.createElement('td')
        const titleText = document.createTextNode(task.title)
        tdTitle.appendChild(titleText)
        const tdStatus = document.createElement('td')
        const statusText = document.createTextNode(task.status)
        tdStatus.appendChild(statusText)
        const tdSelect = document.createElement('td')
        tdSelect.appendChild(selectElement)
        const tdButton = document.createElement('td')
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.appendChild(document.createTextNode('Remove'))
        tdButton.appendChild(button)

        nyTask.appendChild(tdTitle)
        nyTask.appendChild(tdStatus)
        nyTask.appendChild(tdSelect)
        nyTask.appendChild(tdButton)
      const list = tasksDiv.getElementsByTagName('tbody')[0];
      list.insertBefore(nyTask, list.childNodes[0])

    }

    const select = document
      .getElementById(task.id)
      .getElementsByTagName("select")[0];
    select.addEventListener("change", () => {
      if (window.confirm("Change status from '" + task.status + " to '" + select.value + "?")) {
        this.status_callback(task.id, select.value);
      }

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
      node.getElementsByTagName("td")[0].firstChild.data = task.title;
    }
    console.log("id er: " + task.id);
    const select = document
      .getElementById(task.id)
      .getElementsByTagName("select")[0];
    const status = select.options[select.selectedIndex].value;
    if (status != 0) {
      node.getElementsByTagName("td")[1].firstChild.data = status;
    }
    node.getElementsByTagName("select")[0].selectedIndex = 0;
    task.status = status;
    this.disableOption(task);
  }
  removeTask(id) {
    let task = document.getElementById(id);
    if (task != null) {
      task.parentElement.removeChild(task);
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
    newEl.appendChild(document.createTextNode(status));
    select.appendChild(newEl);
  }
}
