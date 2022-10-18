<template>
<section v-if="contact" class="contact-details">
<p>{{contact.name}}</p>
<p>{{contact.email}}</p>
<p>{{contact.phone}}</p>
</section>
</template>

<script>
import {contactService} from '../services/contactService.js'
export default {
    data(){
        return {
            contact:null,
        }
    },
    async created() {
        const _id = this.$route.params._id
        this.contact = await contactService.getContactById(_id)
    }
}
</script>