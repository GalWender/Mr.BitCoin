<template>
    <div v-if="contact" class="contact-edit">
        <h1>Contact Edit</h1>
        <input v-model="contact.name" type="text">
        <input v-model="contact.email" type="email">
        <input v-model="contact.phone" type="text">
        <button @click="onSave">Save</button>
    </div>
    <div v-else>Loding...</div>
</template>

<script>
import { contactService } from '@/services/contactService.js'
export default {
    methods: {
        async onSave() {
            this.$store.dispatch({ type: 'saveContact', contact: this.contact })
            this.$router.back()
        }
    },
    computed: {
        contact() { return {...this.$store.getters.contact} }
    },
    async created() {
        const contactId = this.$route.params._id
        if (contactId) {
            this.$store.dispatch({ type: 'loadContact', contactId })
        } else {
            this.car = await contactService.getEmptyContact()
        }
    }
}
</script>