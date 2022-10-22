<template>
    <RouterLink :to="`/contact/${contact._id}`" class="contact-preview">
        <div class="card">
            <div class="img-container">
                <img :src="contact.imgUrl" alt="">
            </div>
            <div class="info">
                <h3>{{contact.name}}</h3>
            </div>
            <section class="actions">
                <button class="btn btn-svg-close" @click.prevent="onRemoveContact(contact._id)">
                    <CloseSvg />
                </button>
                <RouterLink :to="`/contact/edit/${contact._id}`" class="btn btn-svg-edit">
                    <EditSvg />
                </RouterLink>
            </section>
            <div class="btn-transfer-container">
                <button class="btn btn-transfer" @click.prevent="openModal()">Transfer</button>
            </div>
        </div>
    </RouterLink>
    <SlotedModal @cancel="onCancel" @confirm="onConfirm" v-if="showModal"
        class="transaction-modal" />
</template>

<script>
import CloseSvg from '../assets/svg/close-icon.svg';
import EditSvg from '../assets/svg/edit-icon.svg';
// import contact from '../store/modules/contact';
import SlotedModal from '@/components/SlotedModal.vue'

export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            showModal: false,
        }
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('contact-removed', contactId)
        },
        onCancel() {
            console.log('Canceled')
            this.showModal = false
        },
        onConfirm(input) {
            this.$store.dispatch({ type: 'updateBalance', transDetail: { by: this.loggedinUser?.fullname, to: this.contact.name, amount: input } })
            this.showModal = false
        },
        openModal() {
            this.showModal = !this.showModal
        },
    },
    computed: {
        loggedinUser() { return this.$store.getters.loggedinUser }
    },
    components: {
        CloseSvg,
        EditSvg,
        SlotedModal,
    }
}
</script>