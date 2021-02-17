import dayjs from 'dayjs'


//Save notes in localStorage
const saveNotes = (newNotes) => {
  const userJSON = JSON.stringify(newNotes)
  localStorage.setItem('userNotes', userJSON)
}

//Pull user notes from localStorage
let userNotes = JSON.parse(localStorage.getItem('userNotes')) || false

//Get the ID to search for from the hash
const noteID = location.hash.substring(1)

//Filter the user notes for the matching UUID
const note = userNotes.find(note => {
  return note.uuid === noteID
})

const body = document.querySelector('main')

const noteContainer = document.createElement('div')
noteContainer.className = 'note-container'

const title = document.createElement('h1')
title.innerText = note.title

const titleArea = document.createElement('input')
titleArea.type = 'text'
titleArea.id = 'note-title'
titleArea.value = note.title

titleArea.addEventListener('input', function(e){
  note.title = e.target.value
  note.lastEdit = dayjs()
  title.innerText = note.title
  saveNotes(userNotes)
})

const bodyArea = document.createElement('textarea')
bodyArea.id = 'note-body'
bodyArea.value = note.body

bodyArea.addEventListener('input', function(e){
  note.body = e.target.value
  note.lastEdit = dayjs()
  saveNotes(userNotes)
})

const returnButton = document.createElement('button')
returnButton.innerText = 'Return Home'
returnButton.className = 'home'
returnButton.addEventListener('click', function(e) {
  location.href = '/index.html'
})

noteContainer.append(title, titleArea, bodyArea, returnButton)
body.appendChild(noteContainer)

