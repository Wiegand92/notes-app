import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { displayNotes } from './views'

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

function newNoteHandler(notesArray) {
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
    displayNotes(notesArray)
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

export { newNoteHandler, deleteHandler, saveNotes }