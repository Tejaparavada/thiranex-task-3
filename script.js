const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button class="complete-btn" data-index="${index}">
                    ✓
                </button>

                <button class="edit-btn" data-index="${index}">
                    Edit
                </button>

                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("delete-btn")) {
        tasks.splice(index, 1);
    }

    if (e.target.classList.contains("complete-btn")) {
        tasks[index].completed = !tasks[index].completed;
    }

    if (e.target.classList.contains("edit-btn")) {
        const updatedTask = prompt("Edit task", tasks[index].text);

        if (updatedTask !== null) {
            tasks[index].text = updatedTask;
        }
    }

    saveTasks();
    renderTasks();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;
        renderTasks(filter);
    });
});

renderTasks();