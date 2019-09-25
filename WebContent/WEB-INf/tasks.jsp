<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/GuiHandler.js" defer></script>
  <script type="text/javascript" src="js/main.js" defer></script>
<!-- <script type="text/javascript" src="js/addSomeTasks.js"></script> -->
<meta charset="ISO-8859-1">
<title>Insert title here</title>
 <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  
    <div id="simpleModal" class="modal">
      <div class="modal-content">
        <span class="xButton" id="closeBtn">&times;</span>
        <table>
          <tr>
            <th>Title:</th>
            <td>
              <input type="text" id="input" /><span
                class="xButton"
                id="clearBtn"
                >&times;</span
              >
            </td>
          </tr>
          <tr>
            <th>Status:</th>
            <td>
              <select id="status">
                <option value="waiting">WAITING</option>
                <option value="active">ACTIVE</option>
                <option value="done">DONE</option>
              </select>
            </td>
          </tr>
        </table>

        <br />
        <button id="addBtn" class="button">Add Task</button>
      </div>
    </div>

  
<div id="message"><p>Waiting for server data.</p></div>
<button id="modalBtn" class="button">New Task</button>
<div id="tasks"></div>
</body>
</html>