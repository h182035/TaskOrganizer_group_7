"use strict";
export default class DatabaseHandler {
    constructor() {
        this.count = 0;
        this.message = document.getElementById("message");

    }
    async getStatusesFromServer(guiHandler, taskBox) {
        let getStatusesUrl = "../TaskServices/broker/allstatuses";
        try {
            const response = await fetch(getStatusesUrl, { method: "GET" });
            try {
                const statusData = await response.json();
                if (statusData.responseStatus) {
                    let allstatuses = statusData.allstatuses;
                    guiHandler.allstatuses = allstatuses;
                    taskBox.allstatuses = allstatuses;
                } else {
                    console.log("Couldn't retrieve data");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async modifyStatusOnServer(guiHandler, taskId, taskStatus) {
        const modifyStatusOnServerUrl = "../TaskServices/broker/task/" + taskId;
        console.log(taskStatus);
        try {
            const response = await fetch(modifyStatusOnServerUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ status: taskStatus })
            });
            try {
                const modifyResponse = await response.json();
                if (modifyResponse.responseStatus) {
                    let task = { id: taskId, status: taskStatus };
                    guiHandler.updateTask(task);
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getTasksFromServer(guiHandler) {
        const getTasksUrl = "../TaskServices/broker/tasklist";
        try {
            const response = await fetch(getTasksUrl, { method: "GET" });
            try {
                const taskData = await response.json();
                if (taskData.responseStatus) {
                    let tasks = taskData.tasks;
                    this.count = tasks.length;
                    this.message.innerHTML = "<p> Found " + this.count + " tasks </p>";
                    if (tasks.length === 0) {
                        guiHandler.noTask();
                    } else {
                        tasks.forEach(task => {
                            guiHandler.showTask(task);
                        });
                    }
                    document.getElementById("modalBtn").disabled = false;
                } else {
                    console.log("Couldn't retrieve data");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteTaskFromServer(guiHandler, id) {
        const deleteTaskFromServerUrl = "../TaskServices/broker/task/" + id;
        try {
            const response = await fetch(deleteTaskFromServerUrl, {
                method: "DELETE"
            });
            try {
                const deleteResponse = await response.json();
                if (deleteResponse.responseStatus) {
                    this.count--;
                    this.message.innerHTML = "<p> Found " + this.count + " tasks </p>";
                    guiHandler.removeTask(id);
                } else {
                    console.log("Couldn't delete task from server");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async addTaskToServer(guiHandler, taskBox, taskTitle, taskStatus) {
        const postTaskUrl = "../TaskServices/broker/task";
        try {
            const response = await fetch(postTaskUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ title: taskTitle, status: taskStatus })
            });
            try {
                const taskResponse = await response.json();
                if (taskResponse.responseStatus) {
                    this.count++;
                    this.message.innerHTML = "<p> Found " + this.count + " tasks </p>";
                    let newTask = {
                        id: taskResponse.task.id,
                        title: taskResponse.task.title,
                        status: taskResponse.task.status
                    };
                    guiHandler.showTask(newTask);
                } else {
                    console.log("Task could not be added to server");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
}