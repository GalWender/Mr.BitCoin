import { createStore } from 'vuex'
import contact from './modules/contact.js'

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
    }
}
// Create a new store instance.
const store = createStore(storeOptions)
export default store