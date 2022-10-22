import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function getContacts() {
    _save('contactDB', gContacts)
    return gContacts
}

function query(entityType, delay = 0) {

    var entities = JSON.parse(localStorage.getItem(entityType))
    if(entities === undefined && entityType === 'contactDB') entities = getContacts()

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}


function postMany(entityType, entities) {
    _save(entityType, entities)
    return Promise.resolve(entities)
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function getImgUrl() {
    let gender = (utilService.getRandomInt(1, 2) === 1) ? 'male' : 'female'
    return `https://xsgames.co/randomusers/assets/avatars/${gender}/${utilService.getRandomInt(0,78)}.jpg`
}