<template>
    <div class="modal">
        <div class="wrapper">
            <header class="modal-header">
                <slot name="header">
                    <h3>Transfer amount</h3>
                </slot>
                <!-- <span class="close-btn" @click="closeModal(false)">x</span> -->
            </header>

            <main class="modal-body">
                <slot name="body">
                        <div class="form">
                            <input type="number" @input="handleChange($event)">
                            <div class="actions">
                                <button @click="closeModal(false)" class="cancel">Cancel</button>
                                <button @click="closeModal(true)" class="confirm">Confirm</button>
                            </div>
                        </div>
                </slot>
            </main>

            <footer class="modal-footer">
                <slot name="footer">
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    // props: {
    //     contact: {
    //         type: Object,
    //         required: true,
    //     }
    // },
    data(){
        return {
            input:null
        }
    },
    methods: {
        closeModal(status) {
            // this.$emit(status ? ('confirm',this.input) : 'cancel')
            if(status) this.$emit('confirm',this.input)
            else{this.$emit('cancel')}
        },
        onTransfer(ev) {
            console.log('going')
            // console.log('contact:', contact)
            // this.$store.dispatch({ type: 'updateBalance', transDetail: { by: this.loggedinUser.fullname, to: this.contact.name, amount: ev.target[0].value } })
            this.$emit('onTransfer', ev)
        },
        handleChange(ev){
            this.input = ev.target.value
        }
    },
    computed: {
        loggedinUser() { return this.$store.getters.loggedinUser }
    },
}
</script>

<!-- <style lang="scss">
.modal{
    --spacing: 10px;
    --radius: 10px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #597682;
    min-width: 30vw;
    min-height: 20vh;

    border-radius: 10px;
    box-shadow: 1px 1px 3px #444141;

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 10px;
        height: 2em;

        background-color: lightblue;
        border-radius: var(--radius) var(--radius) 0 0;

        .close-btn{
            cursor: pointer;
        }
    }
    .modal-body{
        padding: var(--spacing);
        color: beige;
    }
    footer {
        position: absolute;
        inset: auto var(--spacing) var(--spacing) auto;
        button{
            margin-inline-start: var(--spacing);
            min-height: 2em;

            background-color: lightblue;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
        .cancel{
            background-color: whitesmoke;
        }
    }
}
</style> -->