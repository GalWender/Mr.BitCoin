<template>
    <div v-if="newContact" class="contact-edit">
        <h1>Contact Edit</h1>
        <input v-model="newContact.name" type="text" :placeholder="contact.name">
        <input v-model="newContact.email" type="email" :placeholder="contact.email">
        <input v-model="newContact.phone" type="text" :placeholder="contact.phone">
        <button @click="onSave">Save</button>
    </div>
    <div v-else>Loding...</div>
</template>

<script>
import { contactService } from '@/services/contactService.js'
export default {
    data() {
        return {
            newContact:null
        }
    },
    methods: {
        async onSave() {
            this.$store.dispatch({ type: 'saveContact', contact: this.newContact })
            this.$router.back()
        }
    },
    computed: {
        contact() { return this.$store.getters.contact }
    },
    async created() {
        const contactId = this.$route.params._id
        this.newContact = {}
        if (contactId) {
            this.$store.dispatch({ type: 'loadContact', contactId })
        } else {
            this.car = await contactService.getEmptyContact()
        }
    }
}
</script>