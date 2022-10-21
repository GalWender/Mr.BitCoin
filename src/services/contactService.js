import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
export const contactService = {
    getContacts,
    getContactById,
    deleteContact,
    saveContact,
    getEmptyContact,
    getImgUrl,
}

const STORAGE_KEY = 'contactDB'

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getContacts(filterBy = null) {
    return storageService.query(STORAGE_KEY)
        .then(contacts => {
            if (filterBy && filterBy.term) {
                contacts = filter(filterBy.term,contacts)
            }
            return contacts
        })
}

function getContactById(id) {
    return storageService.get(STORAGE_KEY,id)
}

function deleteContact(id) {
    return storageService.remove(STORAGE_KEY,id)
}

function _updateContact(contact) {
    return storageService.put(STORAGE_KEY,contact)
}

function _addContact(contact) {
    contact._id = _makeId()
    return storageService.post(STORAGE_KEY,contact)
}

function saveContact(contact) {
    return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function filter(term,contacts) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
        return contact.name.toLocaleLowerCase().includes(term) ||
            contact.phone.toLocaleLowerCase().includes(term) ||
            contact.email.toLocaleLowerCase().includes(term)
    })
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getImgUrl() {
    let gender = (utilService.getRandomInt(1, 2) === 1) ? 'male' : 'female'
    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${utilService.getRandomInt(0, 78)}.jpg`
}