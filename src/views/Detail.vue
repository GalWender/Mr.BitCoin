<template>
<section v-if="contact" class="contact-details">
<p>{{contact.name}}</p>
<p>{{contact.email}}</p>
<p>{{contact.phone}}</p>
</section>
</template>

<script>
export default {
    computed: {
        contact(){ return this.$store.getters.contact }
    },
    async created() {
        const contactId = this.$route.params._id
        // this.contact = await contactService.getContactById(_id)
        this.$store.dispatch({type: 'loadContact', contactId})
    }
}
</script>