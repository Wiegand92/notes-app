import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { v4 as uuidv4 } from 'uuid'

dayjs.extend(relativeTime)

const getLastEdited = (item) => {
  if(item.lastEdit){
    return dayjs(item.lastEdit).fromNow()
  } else {
    return dayjs(item.createdOn).fromNow()
  }
}

const findByID = (id, notesArray) => {
  return notesArray.findIndex(note => {
    return note.uuid === id
  })
}

const removeByIndex = (index, userArray) => {
  userArray.splice(index, 1)
} 

const saveNotes = (newNotes) => {
  const userJSON = JSON.stringify(newNotes)
  localStorage.setItem('userNotes', userJSON)
}

function sortAlphabetically (noteOne, noteTwo) {
  const titleOne = noteOne.title.toLowerCase()
  const titleTwo = noteTwo.title.toLowerCase()
  if(titleOne < titleTwo) {
    return -1
  }
  if(titleOne > titleTwo) {
    return 1
  }
  return 0
}

function sortLastEdited (noteOne, noteTwo) {
  let dateOne = noteOne.lastEdit || noteOne.createdOn
  let dateTwo = noteTwo.lastEdit || noteTwo.createdOn

  if(dateOne < dateTwo){
    return 1
  }
  if(dateOne > dateTwo){
    return -1
  }
  return 0
}

function sortNewest (noteOne, noteTwo) {
  let dateOne = noteOne.createdOn
  let dateTwo = noteTwo.createdOn

  if(dateOne < dateTwo){
    return 1
  }
  if(dateOne > dateTwo){
    return -1
  }
  return 0
}

function sortOldest (noteOne, noteTwo) {
  let dateOne = noteOne.createdOn
  let dateTwo = noteTwo.createdOn

  if(dateOne < dateTwo){
    return -1
  }
  if(dateOne > dateTwo){
    return 1
  }
  return 0
}

const displayNotes = (notes, filters) => {
  const notesSection = document.querySelector('#notes')
  notesSection.innerHTML = ''
  let filteredNotes

  if(filters.sortBy !== undefined) {
    switch (filters.sortBy) {
      case 'alphabetical':
        filteredNotes = notes.sort(sortAlphabetically)
        break;
      case 'newest':
        filteredNotes = notes.sort(sortNewest)
        break;
      case 'oldest':
        filteredNotes = notes.sort(sortOldest)
        break;
      case 'lastEdited':
        filteredNotes = notes.sort(sortLastEdited)
        break;
    }
  }

  if(filters.text !== undefined){
    filteredNotes = notes.filter(function(note) {
      return (
        note.title.toLowerCase().includes(filters.text.toLowerCase()) || 
        note.body.toLowerCase().includes(filters.text.toLowerCase())
      )
    })
  }
  
  if(filteredNotes){
    filteredNotes.forEach(note => {
      const noteContainer = createNoteElement(note)
      notesSection.appendChild(noteContainer)
    })
  } else {
    notes.forEach(note => {
      const noteContainer = createNoteElement(note)
      notesSection.appendChild(noteContainer)
    })
  }

  const deleteButtons = document.querySelectorAll('.delete-note')

  deleteButtons.forEach(button => {
    const parentContainer = button.parentNode.parentNode.parentNode
    button.addEventListener('click', function(e) {
      e.preventDefault()
      deleteHandler(parentContainer, notes)
      displayNotes(notes, filters) 
    })
  })
}

//DOM structure for the Note element
const createNoteElement = (note) => {
  //Declare note containers and inner elements
  const noteContainer = document.createElement('div')
  noteContainer.className = 'note'

  const bodyContainer = document.createElement('div')
  bodyContainer.className = 'note-content'

  const dateContainer = document.createElement('div')
  dateContainer.className = 'date-container'

  const title = document.createElement('a')
  title.className = 'note-title'

  const body = document.createElement('p')
  body.className = 'note-body'

  const createdOn = document.createElement('p')
  createdOn.classList.add('note-date', 'created')

  const lastEdited = document.createElement('p')
  lastEdited.classList.add('note-date', 'edited')

  const deleteButton = document.createElement('button')
  deleteButton.className = 'delete-note'

  //Populate elements
  deleteButton.innerText = 'Delete Note'
  title.innerText = note.title
  title.href = `/edit.html#${note.uuid}`
  createdOn.innerHTML = `Created on: <br> ${note.userReadDate}`
  lastEdited.innerHTML = `Last Edited: <br> ${getLastEdited(note)}`
  body.innerText = note.body.substring(0, 100).trim() + ' . . .'
  body.innerHTML += '<br>'
  body.append(deleteButton)
  noteContainer.uuid = note.uuid

  //Updates last edited time every 5 minutes
  window.setInterval(function () {
    lastEdited.innerText = `Last Edited: ${getLastEdited(note)}`
  }, 300000)

  //Add elements to the containers
  dateContainer.append(createdOn, lastEdited)
  bodyContainer.append(body, dateContainer)
  noteContainer.append(title, bodyContainer)
  return noteContainer
}

function newNoteHandler(notesArray, filters) {
  const newTitle = document.querySelector('#newTitle')
  const newBody = document.querySelector('#newBody')
  if(newTitle.value){
    notesArray.push({
      title: newTitle.value,
      body: newBody.value,
      createdOn: dayjs(),
      uuid: uuidv4(),
      userReadDate: dayjs().format('DD/MM/YY'),
      lastEdit: null
    })
    newTitle.value = ''
    newBody.value = ''
    saveNotes(notesArray)
    displayNotes(notesArray, filters)
  } else {
    alert('Sorry, your note must have a title.')
    //Set invalid class for red border
    newTitle.className += 'invalid'
    //Clear border after 30s
    window.setTimeout(() => {
      newTitle.className = ''
    }, 30000)
  }
}

function deleteHandler (parentContainer, notesArray) {
  const removeID = findByID(parentContainer.uuid, notesArray)
  removeByIndex(removeID, notesArray)
  saveNotes(notesArray)
}

export { displayNotes, newNoteHandler, deleteHandler, saveNotes }