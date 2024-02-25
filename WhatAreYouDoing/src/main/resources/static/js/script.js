document.addEventListener("DOMContentLoaded", function() {
	const taskList = document.getElementById("taskList");
	const updateTaskModal = document.getElementById("updateTaskModal");
	const updateTaskForm = document.getElementById("updateTaskForm");
	const closeUpdateTaskModalBtn = document.querySelector("#updateTaskModal .close");
	const addTaskButton = document.getElementById("addTaskButton");
	const newTaskModal = document.getElementById("newTaskModal");
	const closeNewTaskModalBtn = document.querySelector("#newTaskModal .close");
	const templates = document.querySelectorAll('.template');
	
	let habitIdToUpdate = null;

	// Function to fetch all tasks and display them in a table
	function fetchAndDisplayTasks() {
		fetch("api/habits")
			.then(response => response.json())
			.then(tasks => {
				taskList.innerHTML = ""; // Clear previous tasks
				tasks.forEach(task => {
					const row = document.createElement("tr");
					row.innerHTML = `
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td>${task.completed ? 'Yes' : 'No'}</td>
                        <td>
                            <button class="editBtn">Edit</button>
                            <input type="checkbox" class="completeCheckbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
                            <button class="upBtn">↑</button>
                            <button class="downBtn">↓</button>
                        </td>
                    `;
					taskList.appendChild(row);
				});
				// Disable/enable buttons based on task position
				updateButtonStates();
			})
			.catch(error => console.error("Error fetching tasks:", error));
	}

	// Fetch and display tasks when the page loads
	fetchAndDisplayTasks();

	// Function to disable/enable buttons based on task position
	function updateButtonStates() {
		const taskRows = document.querySelectorAll("#taskList tr");
		taskRows.forEach((taskRow, index) => {
			const upBtn = taskRow.querySelector(".upBtn");
			const downBtn = taskRow.querySelector(".downBtn");
			upBtn.disabled = index === 0;
			downBtn.disabled = index === taskRows.length - 1;
		});
	}

	// Event listener for marking a task as completed
	taskList.addEventListener("change", function(event) {
		if (event.target.classList.contains("completeCheckbox")) {
			const habitId = event.target.getAttribute("data-task-id");
			const completed = event.target.checked;

			fetch(`api/habits/${habitId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ completed })
			})
				.then(response => {
					if (!response.ok) {
						throw new Error("Failed to update task status");
					}
					// Refresh the task list after successful update
					fetchAndDisplayTasks();
				})
				.catch(error => console.error("Error updating task status:", error));
		}
	});

	// Event listener for editing a task
	taskList.addEventListener("click", function(event) {
		if (event.target.classList.contains("editBtn")) {
			const taskRow = event.target.closest("tr");
			habitIdToUpdate = taskRow.querySelector(".completeCheckbox").getAttribute("data-task-id");
			const taskName = taskRow.cells[0].textContent;
			const taskDescription = taskRow.cells[1].textContent;

			// Fill the update form with the task's current name and description
			updateTaskForm.elements.updateName.value = taskName;
			updateTaskForm.elements.updateDescription.value = taskDescription;

			// Show the update task modal
			updateTaskModal.style.display = "block";
		}
	});
	closeUpdateTaskModalBtn.addEventListener("click", function() {
		updateTaskModal.style.display = "none";
	});

	// Event listener for submitting the update task form
	updateTaskForm.addEventListener("submit", function(event) {
		event.preventDefault();

		const updatedName = updateTaskForm.elements.updateName.value;
		const updatedDescription = updateTaskForm.elements.updateDescription.value;

		// Send PUT request to update task details
		fetch(`api/habits/${habitIdToUpdate}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: updatedName,
				description: updatedDescription
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to update task");
				}
				return response.json(); // Parse the JSON response
			})
			.then(updatedTask => {
				console.log("Updated Task:", updatedTask);
				// Close the update task modal
				updateTaskModal.style.display = "none";
				// Fetch and display tasks to update the table
				fetchAndDisplayTasks();
			})
			.catch(error => console.error("Error updating task:", error));

	});

	// Event listener for clicking the plus button to add a new task
	addTaskButton.addEventListener("click", function() {
		// Display the new task modal
		newTaskModal.style.display = "block";
	});

	closeNewTaskModalBtn.addEventListener("click", function() {
		// Close the new task modal when the close button is clicked
		newTaskModal.style.display = "none";
	});
	
	// Event listener for clicking the delete button in the update task modal
    const deleteTaskBtn = document.getElementById("deleteTaskBtn");
    deleteTaskBtn.addEventListener("click", function() {
        if (habitIdToUpdate) {
            if (confirm("Are you sure you want to delete this task?")) {
                fetch(`api/habits/${habitIdToUpdate}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to delete task");
                    }
                    // Close the update task modal
                    updateTaskModal.style.display = "none";
                    // Fetch and display tasks to update the table
                    fetchAndDisplayTasks();
                })
                .catch(error => console.error("Error deleting task:", error));
            }
        }
    });

	// Event listener for submitting the new task form
	newTaskForm.addEventListener("submit", function(event) {
		event.preventDefault();

		const newName = newTaskForm.elements.newName.value;
		const newDescription = newTaskForm.elements.newDescription.value;

		// Send POST request to create a new task
		fetch("api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: newName,
				description: newDescription
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to create task");
				}
				return response.json(); // Parse the JSON response
			})
			.then(newTask => {
				console.log("New Task:", newTask);
				// Close the new task modal
				newTaskModal.style.display = "none";
				// Fetch and display tasks to update the table
				fetchAndDisplayTasks();
			})
			.catch(error => console.error("Error creating task:", error));
	});
	
	//Event listener for the templates
	templates.forEach(template => {
        template.addEventListener('click', function(event) {
			event.preventDefault();
			
            const title = template.dataset.title;
            const description = template.dataset.description;

            newTaskForm.elements.newName.value = title;
            newTaskForm.elements.newDescription.value = description;

            newTaskModal.style.display = 'block';
        });
    });

	// Event listener for moving task up
	taskList.addEventListener("click", function(event) {
		if (event.target.classList.contains("upBtn")) {
			const taskRow = event.target.closest("tr");
			const index = Array.from(taskRow.parentElement.children).indexOf(taskRow);
			if (index > 0) {
				const habitId = taskRow.querySelector(".completeCheckbox").getAttribute("data-task-id");
				const previousHabitId = taskRow.previousElementSibling.querySelector(".completeCheckbox").getAttribute("data-task-id");

				// Swap the tasks in the UI
				taskRow.parentElement.insertBefore(taskRow, taskRow.previousElementSibling);

				// Send PUT requests to update task order in the database
				updateTaskOrder(habitId, previousHabitId);

				// Disable/enable buttons based on task position
				updateButtonStates();
			}
		}
	});

	// Event listener for moving task down
	taskList.addEventListener("click", function(event) {
		if (event.target.classList.contains("downBtn")) {
			const taskRow = event.target.closest("tr");
			const index = Array.from(taskRow.parentElement.children).indexOf(taskRow);
			if (index < taskList.childElementCount - 1) {
				const habitId = taskRow.querySelector(".completeCheckbox").getAttribute("data-task-id");
				const nextHabitId = taskRow.nextElementSibling.querySelector(".completeCheckbox").getAttribute("data-task-id");

				// Swap the tasks in the UI
				taskRow.parentElement.insertBefore(taskRow.nextElementSibling, taskRow);

				// Send PUT requests to update task order in the database
				updateTaskOrder(nextHabitId, habitId);

				// Disable/enable buttons based on task position
				updateButtonStates();
			}
		}
	});

	// Function to send PUT requests to update task order in the database
	function updateTaskOrder(habitId, relatedHabitId) {
		fetch(`api/habits/${habitId}/reorder/${relatedHabitId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Failed to update task order");
				}
				// Refresh the task list after successful update
				fetchAndDisplayTasks();
			})
			.catch(error => console.error("Error updating task order:", error));
	}
});
