// Fetch exiting todos from localstorage
const getSavedTodos = function() {
    todosJSON = localStorage.getItem('todos')

    if (todosJSON != null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//save todos to localsorage
const saveTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//rendering todos by filters
const rendertodos = function(todos, todosFilters) {

    let filteredTodos = todos.filter(function(todo) {
        return todo.text.toLowerCase().includes(todosFilters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function(todo) {
        return !todosFilters.hideCompleted || !todo.completed
    });

    const incompleteTodos = filteredTodos.filter(function(todo) {
        return !todo.completed
    })

    document.querySelector('#todo-list').innerHTML = ''
    document.querySelector('#todo-list').appendChild(generateSummaryDom(incompleteTodos))

    filteredTodos.forEach(function(todo) {
        document.querySelector('#todo-list').appendChild(generateTodoDom(todo))
    })
}

//remove todo from the list by id
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//toggle the completed value for a given todo
const toggleTodo = function(id) {
    const todo = todos.find(function(todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

//get the dom elements for an individual todo
const generateTodoDom = function(todo) {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeBtn = document.createElement('button')

    //set up checkbox for todo
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function() {
        toggleTodo(todo.id)
        saveTodos(todos)
        rendertodos(todos, todosFilters)
    })

    //set up the note text title
    if (todo.text.length > 0) {
        todoText.textContent = todo.text
    } else {
        todoText.textContent = 'UnNamed Todo'
    }
    todoEl.appendChild(todoText)
        //set up the todo remove button
    removeBtn.textContent = 'x'
    todoEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', function() {
        removeTodo(todo.id)
        saveTodos(todos)
        rendertodos(todos, todosFilters)
    })

    return todoEl
}


//get the dom elements for list summary
const generateSummaryDom = function(incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}