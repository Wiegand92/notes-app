import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { newNoteHandler } from './methods.js'
import { setFilters } from './filters.js'
import { displayNotes } from './views'

const date = dayjs()

const startNotes = [
  {
    title: 'Hello World!',
    body: 'testing, testing testing ...',
    createdOn: date,
    userReadDate: date.format('DD/MM/YY'),
    uuid: uuidv4()
  }
]

let userNotes = JSON.parse(localStorage.getItem('userNotes')) || false

if(!userNotes || userNotes.length === 0) {
  userNotes = [...startNotes]
  const userJSON = JSON.stringify(userNotes)
  localStorage.setItem('userNotes', userJSON)
}

const newNote = document.querySelector('#new-note')

newNote.addEventListener('submit', function(e) {
  e.preventDefault()
  newNoteHandler(userNotes)
})

displayNotes(userNotes)

const textFilter = document.querySelector('#search')

textFilter.addEventListener('input', function(e) {
  setFilters({text: e.target.value})
  displayNotes(userNotes)
})

const sortFilter = document.querySelector('#sortBy')

sortFilter.addEventListener('change', function(e) {
  setFilters({sortBy: e.target.value})
  displayNotes(userNotes)
})

