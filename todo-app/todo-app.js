const todos = [{
    text: 'go eat',
    completed: true
}, {
    text: 'go run',
    completed: false
}, {
    text: 'do homework',
    completed: true
}, {
    text: 'go sleep',
    completed: false
}, {
    text: 'do cleanings',
    completed: true
}]

const todosFilters = {
    searchText: '',
    hideCompleted: false
}

//rendering todos by text
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

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todo-list').appendChild(summary)

    filteredTodos.forEach(function(todo) {
        const p = document.createElement('p')
        p.textContent = todo.text
        document.querySelector('#todo-list').appendChild(p)
    })
}

rendertodos(todos, todosFilters)

//listen for todo text change
document.querySelector('#search-text').addEventListener('input', function(e) {
    todosFilters.searchText = e.target.value
    rendertodos(todos, todosFilters)
})

document.querySelector("#new-todo").addEventListener('submit', function(e) {
    e.preventDefault()
    todos.push({
        text: e.target.elements.text.value,
        completed: false
    })
    rendertodos(todos, todosFilters)
    e.target.elements.text.value = ''
})

document.querySelector("#hide-completed").addEventListener('change', function(e) {
    todosFilters.hideCompleted = e.target.checked
    rendertodos(todos, todosFilters)
})