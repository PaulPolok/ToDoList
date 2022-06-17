{
    let tasks = [];
    let hideDoneTask = true;

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

    const taskHider = (hideTaskDoneButton) => {
        hideTaskDoneButton.addEventListener = ("click", () => {
            hideDoneTask = !hideDoneTask;
            render();
        })
    }

    const toggleAllTaskDone = (doAllTasks) => {
        doAllTasks.addEventListener = ("click", () => {
            tasks = tasks.map((task) => ({
                ...task,
                check: true,
            }))
            render();
        })
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
        const isEveryTaskDone = tasks.every(({ check }) => check)

        let htmlHeaderButtons = "";
        htmlHeaderButtons += `
            <button class="section__headerButtons js-hideTaskDoneButton ${taskElement ? "" : "tasks__item--hidden"}">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
            <button ${isEveryTaskDone === true ? "disabled" : ""} class="section__headerButtons js-doAllTasks ${taskElement ? "" : "tasks__item--hidden"}"> Ukończ wszystkie</button>
            `;
        document.querySelector(".js-headerButtons").innerHTML = htmlHeaderButtons
    };

    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
                <li class="tasks__item js-task">
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

    const bindButtonsEvents = () => {
        const doAllTasks = document.querySelector(".js-doAllTasks");
        if (doAllTasks) {
            doAllTasks.addEventListener("click", toggleAllTaskDone)
        };

        const hideTaskDoneButton = document.querySelector(".js-hideTaskDoneButton");
        if (hideTaskDoneButton) {  
            hideTaskDoneButton.addEventListener("click", taskHider)
        };

    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindButtonsEvents();
        bindToggleDoneEvents();

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