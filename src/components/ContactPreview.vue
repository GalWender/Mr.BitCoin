<template>
        <RouterLink :to="`/contact/${contact._id}`" class="contact-preview" >
            <h3>{{contact.name}}</h3>
            <section class="actions">
                <button class="btn btn-svg-close" @click.prevent="onRemoveContact(contact._id)">
                    <CloseSvg/>
                </button>
            </section>
        </RouterLink>
</template>

<script>
import CloseSvg from '../assets/svg/close-icon.svg';
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    methods: {
        onRemoveContact(contactId){
            this.$emit('contact-removed',contactId)
        },
    },
    components: {
        CloseSvg
    }
}
</script>