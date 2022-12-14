import { contactService } from '../../services/contactService.js'
export function getActionUpdateContact(contact) {
    return { type: 'saveContact', contact }
}
export default {
    state: {
        contacts: [],
        contact: {},
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        setContact(state, { contact }) {
            state.contact = contact
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
        },
        saveContact(state, { contact }) {
            const contactId = contact._id
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1, contact)
        }
    },
    actions: {
        async loadContacts({ commit }) {
            const contacts = await contactService.query()
            commit({ type: 'setContacts', contacts: [...contacts] })
        },
        async loadContact({ commit }, { contactId }) {
            const contact = await contactService.getById(contactId)
            commit({ type: 'setContact', contact: { ...contact } })
        },
        async removeContact({ commit }, { contactId }) {
            await contactService.remove(contactId)
            commit({ type: 'removeContact', contactId })
        },
        async saveContact({ commit }, { contact }) {
            await contactService.save(contact)
            commit({ type: 'saveContact', contact: { ...contact } })
        },
    },
    getters: {
        contacts(state) { return state.contacts },
        contact(state) { return state.contact }
    }
}