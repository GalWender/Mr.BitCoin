import { getActionUpdateContact } from "../store/modules/contact"
import  store  from "../store/index.js"
import { httpService } from "./http.service"
import { socketService, SOCKET_EMIT_SET_CONTACT_ID_CHANNEL, SOCKET_EMIT_SEND_CONTACT_CHANGES, SOCKET_EVENT_ADD_CONTACT_CHANGES } from "./socket.service";

/* ?- WebSocket */;
(() => {
    socketService.on(SOCKET_EMIT_SEND_CONTACT_CHANGES, (contact) => {
        store.dispatch(getActionUpdateContact(contact))
    })
    socketService.on(SOCKET_EVENT_ADD_CONTACT_CHANGES, (contact) => {
        store.dispatch(getActionUpdateContact(contact))
    })
})()

export const contactService = {
    query,
    getById,
    save,
    // update,
    remove,
    getEmptyContact,
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

function getById(contactId) {
    socketService.emit(SOCKET_EMIT_SET_CONTACT_ID_CHANNEL, contactId)
    return httpService.get(BASE_URL + contactId)
        .then((contact) => {
            return contact
        })
}

function remove(contactId) {
    return httpService.delete(BASE_URL + contactId)
}

function save(contact) {
    // Todo: board.createBy
    if (contact._id) {
        socketService.emit(SOCKET_EMIT_SEND_CONTACT_CHANGES, contact)
        return httpService.put(BASE_URL + contact._id, contact)
    }
    else return httpService.post(BASE_URL, contact)
}

function getEmptyContact() {
    return {
        name:'',
        email:'',
        phone:''
    }
}

