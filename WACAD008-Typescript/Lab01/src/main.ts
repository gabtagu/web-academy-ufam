// diz ao TypeScript que existe um global chamado `bootstrap`
declare const bootstrap: any;

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

let tasks: Task[] = [];
let taskId = 0;
let editingTaskId: number | null = null;

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskButton = document.getElementById(
  "addTaskButton"
) as HTMLButtonElement;
const taskContainer = document.getElementById("taskContainer") as HTMLElement;
const saveButton = document.getElementById("saveTaskEdit") as HTMLButtonElement;

// Adicionar tarefa
addTaskButton.addEventListener("click", () => {
  const taskDescription = taskInput.value.trim();
  if (taskDescription) {
    addTask(taskDescription);
    taskInput.value = "";
  }
});

function addTask(description: string) {
  const newTask: Task = {
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
  let time = Date.now();
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  let day = new Date(time).getDate();
  let month = new Date(time).getMonth() + 1;
  let year = new Date(time).getFullYear();
  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "card mb-2";
    taskCard.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">${task.description}</h5>
        <p class="text-muted mb-0" style="font-size: 0.8rem;">${day}/${month}/${year} - ${hour}:${
      minute < 10 ? "0" + minute : minute
    }</p>
        <div>
          <button class="btn btn-warning btn-sm me-2" onclick="editTask(${
            task.id
          })">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="removeTask(${
            task.id
          })">Remover</button>
        </div>
      </div>
    `;
    taskContainer.appendChild(taskCard);
  });
}

// Remover tarefa
function removeTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Editar tarefa (abre modal)
function editTask(id: number) {
  const task = tasks.filter((t) => t.id === id)[0];
  if (task) {
    editingTaskId = id;
    const editInput = document.getElementById(
      "editTaskInput"
    ) as HTMLInputElement;
    editInput.value = task.description;

    const modalElement = document.getElementById(
      "editTaskModal"
    ) as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

// Salvar edição
saveButton.addEventListener("click", () => {
  if (editingTaskId !== null) {
    const editInput = document.getElementById(
      "editTaskInput"
    ) as HTMLInputElement;
    const newDescription = editInput.value.trim();

    if (newDescription) {
      const task = tasks.filter((t) => t.id === editingTaskId)[0];
      if (task) {
        task.description = newDescription;
        renderTasks();
      }
    }

    const modalElement = document.getElementById(
      "editTaskModal"
    ) as HTMLElement;
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();

    editingTaskId = null;
  }
});

// Expor funções globais para o HTML
(window as any).removeTask = removeTask;
(window as any).editTask = editTask;
