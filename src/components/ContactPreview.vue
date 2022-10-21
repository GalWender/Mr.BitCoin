<template>
        <RouterLink :to="`/contact/${contact._id}`" class="contact-preview" >
            <img :src="contact.imgUrl" alt="">
            <h3>{{contact.name}}</h3>
            <section class="actions">
                <button class="btn btn-svg-close" @click.prevent="onRemoveContact(contact._id)">
                    <CloseSvg/>
                </button>
                <RouterLink :to="`/contact/edit/${contact._id}`" class="btn btn-svg-edit"><EditSvg/></RouterLink>
            </section>
        </RouterLink>
</template>

<script>
import CloseSvg from '../assets/svg/close-icon.svg';
import EditSvg from '../assets/svg/edit-icon.svg';
import contact from '../store/modules/contact';

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
        CloseSvg,
        EditSvg
    }
}
</script>