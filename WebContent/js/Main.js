"use strict";
import Controller from "./Controller.js";

let controller = new Controller();
controller.initDocument();
controller.setDeleteCallBack();
controller.setNewStatusCallBack();
controller.setOnSubmitCallback();