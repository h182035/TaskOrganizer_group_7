"use strict";

export default class TaskBox {
  constructor(allstatuses) {
    this.allstatuses = allstatuses;
  }

  set allstatuses(values) {
    this._allstatuses = values;
  }
  set onSubmit(task) {}
  //function to close modal
  closeModal(modal) {
    modal.style.display = "none";
  }
  //method to clear input
  clearinput(input) {
    input.value = "";
  }
  //method to add task
  onSubmit(input, select, modal, id) {
    //check if input is empty - not allowed
    if (input.value === "") {
      window.alert("Empty title is not allowed!");
      return;
    }
    //addTaskCallbackOrWhatever(input.value, status.value)
    var title = input.value;
    var status = select.options[select.selectedIndex].text;
    input.value = "";
    select.value = "waiting";
    this.closeModal(modal);
    const task = { id: id, title: title, status: status };
    return task;
  }
  openModal(modal) {
    modal.style.display = "block";
  }
}
