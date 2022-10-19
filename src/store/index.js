import { createStore } from 'vuex'
import car from './modules/car.js'

const storeOptions = {
    strict: true,
    state() {
        return {
            count: 10,
        }
    },
    mutations: {
        increment(state, payload) {
            console.log(payload);
            state.count++
        },
        setCount(state, { val }) {
            console.log(val);
            state.count = val
        },
    },
    getters: {
        count(state){ return state.count }
    },
    modules: {
        car,
    }
}
// Create a new store instance.
const store = createStore(storeOptions)
export default store