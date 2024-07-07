
        let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

        displayItems();

        // Reset the todo list description if needed
        function resetDescription(descriptionStr) {
            todoList = descriptionStr ? JSON.parse(descriptionStr) : [
                { item: 'Book Reading', dueDate: '2024-06-16' }
            ];
        }

        // Add new todo
        document.getElementById('add-todo').addEventListener('click', addTodo);

        function addTodo() {
            const inputElement = document.getElementById('todo-input');
            const dateElement = document.getElementById('todo-date');
            const inputText = inputElement.value.trim();
            const dateText = dateElement.value;

            if (inputText && dateText) {
                todoList.push({ item: inputText, dueDate: dateText });
                inputElement.value = '';
                dateElement.value = '';
                displayItems();
                saveTodos();
            }
        }

        // Display todo items
        function displayItems() {
            const containerElement = document.querySelector('.todo-container');
            let newHtml = '';

            todoList.forEach((todo, index) => {
                const { item, dueDate } = todo;
                newHtml += `
                    <div id="container">
                        <span>${item}</span>
                        <span>${dueDate}</span>
                        <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
                    </div>
                `;
            });

            containerElement.innerHTML = newHtml;
        }

        // Delete a todo item
        function deleteTodo(index) {
            todoList.splice(index, 1);
            displayItems();
            saveTodos();
        }

        // Save todos to localStorage
        function saveTodos() {
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
   