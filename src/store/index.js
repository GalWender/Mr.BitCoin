import { createStore } from 'vuex'
import contact from './modules/contact.js'
import user from './modules/user.js'

const storeOptions = {
    strict: true,
    state() {
        return {
        }
    },
    mutations: {
        
    },
    getters: {
    },
    modules: {
        contact,
        user
    }
}
// Create a new store instance.
const store = createStore(storeOptions)
export default store