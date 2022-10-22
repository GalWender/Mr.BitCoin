<template>
  <section class="home main-layout" v-if="loggedinUser">
    <lottie-player src="../../src/assets/lottie/home-lottie-animation.json" class="lottie lottie-bitcoin-animation" background="transparent" speed="1"
     loop autoplay>
    </lottie-player>
    <main v-if="loggedinUser">
      <h2>Welcome <span>{{loggedinUser.fullname}}</span> your current balance is <span>₿{{loggedinUser.balance}}</span></h2>
      <br/>
      <h2 v-if="rate" class="rate">current rate: <span>{{rate}}$</span></h2>
    </main>
  </section>
  <LoginSignup v-else/>
</template>

<script>
import { userService } from '../services/userService.js';
import { bitcoinService } from '../services/bitcoinService.js';
import LoginSignup from './LoginSignup.vue';

export default {
  data() {
    return {
      user: null,
      rate: null
    }
  },
  computed: {
        loggedinUser() { return this.$store.getters.loggedinUser }
    },
  async created() {
      this.rate = await bitcoinService.getRate()
  },
  components:{
    LoginSignup
  }

}
</script>

