const todos = getSavedTodos()

const todosFilters = {
    searchText: '',
    hideCompleted: false
}

// localStorage.clear()

rendertodos(todos, todosFilters)

//listen for todo text change
document.querySelector('#search-text').addEventListener('input', function(e) {
    todosFilters.searchText = e.target.value
    rendertodos(todos, todosFilters)
})

document.querySelector("#new-todo").addEventListener('submit', function(e) {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.text.value,
        completed: false
    })
    saveTodos(todos)
    rendertodos(todos, todosFilters)
    e.target.elements.text.value = ''
})

document.querySelector("#hide-completed").addEventListener('change', function(e) {
    todosFilters.hideCompleted = e.target.checked
    rendertodos(todos, todosFilters)
})