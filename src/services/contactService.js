// import { storageService } from "./async-storage.service.js";
// import { utilService } from "./util.service.js";
// export const contactService = {
//     getContacts,
//     getContactById,
//     deleteContact,
//     saveContact,
//     getEmptyContact,
//     getImgUrl,
// }

// const STORAGE_KEY = 'contactDB'

// function sort(arr) {
//     return arr.sort((a, b) => {
//         if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//             return -1;
//         }
//         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//             return 1;
//         }

//         return 0;
//     })
// }

// function getContacts(filterBy = null) {
//     return storageService.query(STORAGE_KEY)
//         .then(contacts => {
//             if (filterBy && filterBy.term) {
//                 contacts = filter(filterBy.term,contacts)
//             }
//             return contacts
//         })
// }

// function getContactById(id) {
//     return storageService.get(STORAGE_KEY,id)
// }

// function deleteContact(id) {
//     return storageService.remove(STORAGE_KEY,id)
// }

// function _updateContact(contact) {
//     return storageService.put(STORAGE_KEY,contact)
// }

// function _addContact(contact) {
//     contact._id = _makeId()
//     return storageService.post(STORAGE_KEY,contact)
// }

// function saveContact(contact) {
//     return contact._id ? _updateContact(contact) : _addContact(contact)
// }

// function getEmptyContact() {
//     return {
//         name: '',
//         email: '',
//         phone: ''
//     }
// }

// function filter(term,contacts) {
//     term = term.toLocaleLowerCase()
//     return contacts.filter(contact => {
//         return contact.name.toLocaleLowerCase().includes(term) ||
//             contact.phone.toLocaleLowerCase().includes(term) ||
//             contact.email.toLocaleLowerCase().includes(term)
//     })
// }



// function _makeId(length = 10) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }

// function getImgUrl() {
//     let gender = (utilService.getRandomInt(1, 2) === 1) ? 'male' : 'female'
//     return `https://xsgames.co/randomusers/assets/avatars/${gender}/${utilService.getRandomInt(0, 78)}.jpg`
// }

// import { getActionUpdateBoard } from "../store/board/board.action";
// import { store } from "../store/store";
import { httpService } from "./http.service"
import { socketService, SOCKET_EMIT_SET_CONTACT_ID_CHANNEL, SOCKET_EMIT_SEND_CONTACT_CHANGES, SOCKET_EVENT_ADD_BOARD_CHANGES } from "./socket.service";

/* ?- WebSocket */;
(() => {
  socketService.on(SOCKET_EMIT_SEND_CONTACT_CHANGES, (board) => {
    store.dispatch(getActionUpdateBoard(board))
  })
  socketService.on(SOCKET_EVENT_ADD_CONTACT_CHANGES, (board) => {
    store.dispatch(getActionUpdateBoard(board))
  })
})()

export const boardService = {
  query,
  getById,
  save,
  // update,
  remove,
}

// const statusOpts = ['done', 'working on it', 'stuck', 'need help', 'waiting for qa', 'pending', '']
// const priorityOpts = ['', 'low', 'medium', 'high', 'critical',]

// const STORAGE_KEY = 'boardDB'
//?- Prod:
const BASE_URL = 'contact/'

async function query(filterBy) {
  if (filterBy) return httpService.get(BASE_URL, filterBy)
  else return httpService.get(BASE_URL)
}

function getById(contactId, sortBy, filterBy) {
  socketService.emit(SOCKET_EMIT_SET_BOARD_ID_CHANNEL, boardId)
  return httpService.get(BASE_URL + boardId)
    .then((board) => {
      if (sortBy) {
        board.groups.forEach(group => {
          if (sortBy.by === 'title') {
            group.tasks.sort((taskA, taskB) =>
              taskA.title.localeCompare(taskB.title))
          }

          if (sortBy.by === 'status') {
            const res = []
            statusOpts.forEach(currStatus => {
              group.tasks.forEach(task => {
                if (!task.status) task.status = ''
                if (task.status.toLowerCase() === currStatus) res.push(task)
              })
            })
            group.tasks = res
          }

          if (sortBy.by === 'priority') {
            const res = []
            priorityOpts.forEach(currPriority => {
              group.tasks.forEach(task => {
                if (!task.priority) task.priority = ''
                if (task.priority.toLowerCase() === currPriority) res.push(task)
              })
            })

            group.tasks = res
          }

          if (sortBy.isDecending) group.tasks = group.tasks.reverse()
        })
      }
      if (filterBy) {
        board.groups.map((group) =>
          group.tasks = group.tasks.filter((task) =>
            (filterBy.term && filterBy.term !== '') ?
              new RegExp(filterBy.term, 'i').test(task.title) : true
          )
        )
      }
      return board
    })
}

function remove(boardId) {
  return httpService.delete(BASE_URL + boardId)
}

function save(board) {
  // Todo: board.createBy
  if (board._id) {
    socketService.emit(SOCKET_EMIT_SEND_BOARD_CHANGES, board)
    return httpService.put(BASE_URL + board._id, board)
  }
  else return httpService.post(BASE_URL, board)
}