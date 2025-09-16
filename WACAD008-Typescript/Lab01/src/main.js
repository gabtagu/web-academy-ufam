var tasks = [];
var taskId = 0;
var editingTaskId = null;
var taskInput = document.getElementById("taskInput");
var addTaskButton = document.getElementById("addTaskButton");
var taskContainer = document.getElementById("taskContainer");
var saveButton = document.getElementById("saveTaskEdit");
// Adicionar tarefa
addTaskButton.addEventListener("click", function () {
    var taskDescription = taskInput.value.trim();
    if (taskDescription) {
        addTask(taskDescription);
        taskInput.value = "";
    }
});
function addTask(description) {
    var newTask = {
        id: taskId++,
        description: description,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
}
// Renderizar tarefas
function renderTasks() {
    taskContainer.innerHTML = "";
    var time = Date.now();
    var hour = new Date(time).getHours();
    var minute = new Date(time).getMinutes();
    var day = new Date(time).getDate();
    var month = new Date(time).getMonth() + 1;
    var year = new Date(time).getFullYear();
    tasks.forEach(function (task) {
        var taskCard = document.createElement("div");
        taskCard.className = "card mb-2";
        taskCard.innerHTML = "\n      <div class=\"card-body d-flex justify-content-between align-items-center\">\n        <h5 class=\"card-title mb-0\">".concat(task.description, "</h5>\n        <p class=\"text-muted mb-0\" style=\"font-size: 0.8rem;\">").concat(day, "/").concat(month, "/").concat(year, " - ").concat(hour, ":").concat(minute < 10 ? "0" + minute : minute, "</p>\n        <div>\n          <button class=\"btn btn-warning btn-sm me-2\" onclick=\"editTask(").concat(task.id, ")\">Editar</button>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"removeTask(").concat(task.id, ")\">Remover</button>\n        </div>\n      </div>\n    ");
        taskContainer.appendChild(taskCard);
    });
}
// Remover tarefa
function removeTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
// Editar tarefa (abre modal)
function editTask(id) {
    var task = tasks.filter(function (t) { return t.id === id; })[0];
    if (task) {
        editingTaskId = id;
        var editInput = document.getElementById("editTaskInput");
        editInput.value = task.description;
        var modalElement = document.getElementById("editTaskModal");
        var modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}
// Salvar edição
saveButton.addEventListener("click", function () {
    if (editingTaskId !== null) {
        var editInput = document.getElementById("editTaskInput");
        var newDescription = editInput.value.trim();
        if (newDescription) {
            var task = tasks.filter(function (t) { return t.id === editingTaskId; })[0];
            if (task) {
                task.description = newDescription;
                renderTasks();
            }
        }
        var modalElement = document.getElementById("editTaskModal");
        var modal = bootstrap.Modal.getInstance(modalElement);
        modal === null || modal === void 0 ? void 0 : modal.hide();
        editingTaskId = null;
    }
});
// Expor funções globais para o HTML
window.removeTask = removeTask;
window.editTask = editTask;
