import { userService } from '../../services/userService.js'
import { isUsernameVerified } from '../../services/_eventBus.service.js'

export default {
    state: {
        loggedinUser: userService.getLoggedinUser(),
    },
    mutations: {
        setUser(state, { loggedinUser }) {
            state.loggedinUser = loggedinUser
        },
    },
    actions: {
        async checkUsername({ commit }, { username }) {
            await userService.verifyUsername(username)
            isUsernameVerified('VERIFIED')
        },
        async login({ commit }, { user }) {
            const loggedinUser = await userService.login(user)
            commit({ type: 'setUser', loggedinUser })
        },
        async signup({ commit }, { user }) {
            const loggedinUser = await userService.signup(user)
            commit({ type: 'setUser', loggedinUser })
        },
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'setUser', loggedinUser: null })
        },
        async updateUser({ commit }, { user }) {
            const savedUser = await userService.update(user)
            commit({ type: 'setUser', loggedinUser: savedUser })
        },
        async updateBalance({commit},{transDetail}) {
            const updatedUser = await userService.updateBalance(transDetail)
            commit({type: 'setUser', loggedinUser: updatedUser})
        }
    },
    getters: {
        loggedinUser(state) { return state.loggedinUser },
    }
}