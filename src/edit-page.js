import { displayEdit } from './views'
import { saveNotes } from './methods'
import dayjs from 'dayjs'


//Pull user notes from localStorage
let userNotes = JSON.parse(localStorage.getItem('userNotes')) || false

//Get the ID to search for from the hash
const noteID = location.hash.substring(1)

//Filter the user notes for the matching UUID
const note = userNotes.find(note => {
  return note.uuid === noteID
})

displayEdit(note)

const titleArea = document.querySelector('#note-title')
titleArea.addEventListener('input', function(e){
  const title = document.querySelector('h1')
  note.title = e.target.value
  note.lastEdit = dayjs()
  title.innerText = note.title
  saveNotes(userNotes)
})

const bodyArea = document.querySelector('#note-body')
bodyArea.addEventListener('input', function(e){
  note.body = e.target.value
  note.lastEdit = dayjs()
  saveNotes(userNotes)
})

const returnButton = document.querySelector('.home')
returnButton.addEventListener('click', function(e) {
  location.href = '/index.html'
})