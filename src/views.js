import { getFilters } from './filters'
import { deleteHandler, saveNotes } from './methods'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const getLastEdited = (item) => {
  if(item.lastEdit){
    return dayjs(item.lastEdit).fromNow()
  } else {
    return dayjs(item.createdOn).fromNow()
  }
}

//DOM structure for the Note element
const createNoteElement = (note) => {
  //Declare note containers and inner elements
  const noteContainer = document.createElement('div')
  noteContainer.className = 'note'

  const contentContainer = document.createElement('div')
  contentContainer.className = 'note-content'

  const dateContainer = document.createElement('div')
  dateContainer.className = 'date-container'

  const title = document.createElement('a')
  title.className = 'note-title'

  const bodyContainer = document.createElement('div')
  bodyContainer.className = 'body-container'

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
  noteContainer.uuid = note.uuid

  //Updates last edited time every 5 minutes
  window.setInterval(function () {
    lastEdited.innerText = `Last Edited: ${getLastEdited(note)}`
  }, 300000)

  //Add elements to the containers
  bodyContainer.append(body, deleteButton)
  dateContainer.append(createdOn, lastEdited)
  contentContainer.append(bodyContainer, dateContainer)
  noteContainer.append(title, contentContainer)
  return noteContainer
}

//Sort functions for filters

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

//Display the notes

const displayNotes = (notes) => {
  const filters = getFilters()
  const notesSection = document.querySelector('#notes')
  notesSection.innerHTML = ''
  let filteredNotes

  if(filters.sortBy.length > 0) {
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

  if(filters.text.length > 0){
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
      displayNotes(notes) 
    })
  })
}

const displayEdit = (note) => {
  const body = document.querySelector('main')

  const noteContainer = document.createElement('div')
  noteContainer.className = 'note-container'

  const title = document.createElement('h1')
  title.innerText = note.title

  const titleArea = document.createElement('input')
  titleArea.type = 'text'
  titleArea.id = 'note-title'
  titleArea.value = note.title

  const bodyArea = document.createElement('textarea')
  bodyArea.id = 'note-body'
  bodyArea.value = note.body

  const returnButton = document.createElement('button')
  returnButton.innerText = 'Return Home'
  returnButton.className = 'home'

  noteContainer.append(title, titleArea, bodyArea, returnButton)
  body.appendChild(noteContainer)
}

export { displayNotes, displayEdit }