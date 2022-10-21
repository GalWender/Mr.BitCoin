export const userService = {
    getLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const user = {
    name: "Gal Wender",
    balance: 100,
    transactions: []
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}