<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<!-- <script type="text/javascript" src="js/addSomeTasks.js"></script> -->
<meta charset="ISO-8859-1" />
<title>Oblig 1 js</title>
<link rel="stylesheet" href="css/style.css" />
	<script  src="js/Main.js" type="module" defer></script>
</head>
<body>
	<div id="simpleModal" class="modal">
		<div class="modal-content">
			<span class="xButton" id="closeBtn">&times;</span>
			<table>
				<tr>
					<th>Title:</th>
					<td><input type="text" id="input" /><span class="xButton"
						id="clearBtn">&times;</span></td>
				</tr>
				<tr>
					<th>Status:</th>
					<td><select id="status">
							<option value="waiting">WAITING</option>
							<option value="active">ACTIVE</option>
							<option value="done">DONE</option>
					</select></td>
				</tr>
			</table>

			<br />
			<button id="addBtn" class="button">Add Task</button>
		</div>
	</div>

	<div id="message">
		<p>Waiting for server data.</p>
	</div>
	<button id="modalBtn" class="button">New Task</button>
	<div id="tasks"></div>
</body>
</html>
