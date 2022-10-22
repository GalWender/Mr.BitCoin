import { userService } from '../../services/userService.js'
import { isUsernameVerified } from '../../services/eventBus.service.js'

export default {
    state: {
        loggedinUser: userService.getLoggedinUser(),
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user
        },
    },
    actions: {
        async checkUsername({ commit }, { username }) {
            await userService.verifyUsername(username)
            isUsernameVerified('VERIFIED')
        },
        async login({ commit }, { user }) {
            const loggedinUser = await userService.login(user)
            commit({ type: 'setUser', loggedinUser: { ...loggedinUser } })
        },
        async signup({ commit }, { user }) {
            const loggedinUser = await userService.signup(user)
            commit({ type: 'setUser', loggedinUser: { ...loggedinUser } })
        },
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'setUser', loggedinUser: null })
        },
        async updateUser({ commit }, { user }) {
            const savedUser = await userService.update(user)
            commit({ type: 'setUser', loggedinUser: { ...savedUser } })
        },
    },
    getters: {
        loggedinUser(state) { return state.loggedinUser },
    }
}