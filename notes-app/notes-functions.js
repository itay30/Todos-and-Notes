// read exixsting notes
const getSavedNotes = function() {
    notesJSON = localStorage.getItem('notes')

    if (notesJSON != null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// save the notes to local storage
const saveNotes = function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// generate the dom structure for a note
const generateNoteDom = function(note) {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const removeBtn = document.createElement('button')
        //set up the note remove btn
    removeBtn.textContent = 'x'
    noteEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', function() {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //set up the note text title
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'UnNamed Note'
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

//sort your notes by one of the three ways
const sortNotes = function(notes, sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort(function(a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort(function(a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'Alphabet') {
        return notes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//render application notes
const renderNotes = function(notes, filters) {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function(note) {
        const noteEl = generateNoteDom(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}