// auth with http

// import { httpService } from './http.service.js'
// import { userService } from './user.service.js'

// const BASE_URL = `auth/`
// const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

// export const authService = {
//     login,
//     signup,
//     logout,
// }

// function login(credentials) {
//     console.log(credentials)
//     return httpService.post(BASE_URL + 'login', credentials)
//         .then(user => {
//             if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//             return user
//         })
// }

// function signup(userInfo) {
//     return httpService.post(BASE_URL + 'signup', userInfo)
//         .then((user) => {
//             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
//             return user
//         })
// }

// function logout() {
//     return httpService.post(BASE_URL + 'logout')
//     .then(()=>{
//         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
//         return Promise.resolve()
//     })
// }


// auth with local storage

import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
}

window.us = userService

function login(credentials) {
    return storageService.query(STORAGE_KEY).then(users => {
        const user = users.find(user =>
            user.username === credentials.username &&
            user.password === credentials.password)
        if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    })
}

function signup(userInfo) {
    return storageService.post(STORAGE_KEY, userInfo)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}

function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}