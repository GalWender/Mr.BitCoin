export const userService = {
    getUser,
}
const user = {
    name: "Gal Wender",
    balance: 100,
    transactions: []
}

function getUser() {
    return user
}