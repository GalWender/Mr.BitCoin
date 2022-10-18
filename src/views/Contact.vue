<template>
    <ContactList @contact-removed="onRemoveContact" :contacts="contactsToShow"/>
</template>

<script>
import { contactService } from '../services/contactService.js'
import ContactList from '../components/ContactList.vue'
export default {
    data() {
        return {
            contacts: [],
            filterBy: {},
        }
    },
    methods: {
        onRemoveContact(contactId) {
            contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
        },
        onFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        contactsToShow() {
            const regex = new RegExp(this.filterBy.name, 'i')
            return this.contacts.filter(contact => regex.test(contact.name))
        }
    },
    async created() {
        this.contacts = await contactService.getContacts()
    },
    components: {
    ContactList
}

}
</script>