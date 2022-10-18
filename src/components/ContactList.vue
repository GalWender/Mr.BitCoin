<template>
        <section class="contact-list">
            <ul>
                <TransitionGroup name="list">
                    <li v-for="contact in contacts" :key="contact._id">
                        <ContactPreview :contact="contact" @contact-removed="onRemoveContact"/>
                    </li>
                </TransitionGroup>
            </ul>
        </section>
</template>

<script>
import ContactPreview from './ContactPreview.vue';
export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        }
    },
    methods: {
        onRemoveContact(contactId){
            this.$emit('contact-removed',contactId)
        },
    },
    components: {
        ContactPreview,
    }
}
</script>
