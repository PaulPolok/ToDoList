{
    let tasks = [];
    let hideDoneTask = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
                    <li class="tasks__item js-task ${hideDoneTask && task.done ? "tasks__item--hidden" : ""}">
                        <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                            ${task.done ? "✔" : ""}
                        </button>
                        <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                            ${task.content}
                        </span>
                        <button class="tasks__button tasks__button--remove js-remove">
                            🗑
                        </button>
                    </li>
                `;

        }
        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const renderButtons = () => {
        const taskElement = document.querySelector(".js-task")
        const isEveryTaskDone = tasks.every(({ done }) => done)

        let htmlHeaderButtons = "";
        htmlHeaderButtons += `
            <button class="section__headerButtons js-hideTaskDoneButton ${taskElement ? "" : "tasks__item--hidden"}">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
            <button ${isEveryTaskDone === true ? "disabled" : ""} class="section__headerButtons js-doAllTasks ${taskElement ? "" : "tasks__item--hidden"}"> Ukończ wszystkie</button>
            `;
        document.querySelector(".js-headerButtons").innerHTML = htmlHeaderButtons
    };

    const bindButtonsEvents = () => {
        const doAllTasks = document.querySelector(".js-doAllTasks");
        if (doAllTasks) {
            doAllTasks.addEventListener("click", markAllTaskDone)
        };

        const hideTaskDoneButton = document.querySelector(".js-hideTaskDoneButton");
        if (hideTaskDoneButton) {
            hideTaskDoneButton.addEventListener("click", toggleHideDoneTasks)
        };

    };


    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();
        renderButtons();
        bindButtonsEvents();


    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}