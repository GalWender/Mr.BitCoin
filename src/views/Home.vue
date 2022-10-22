<template>
  <section class="home" v-if="loggedinUser">
    <lottie-player src="../../src/assets/lottie/home-lottie-animation.json" class="lottie lottie-bitcoin-animation" background="transparent" speed="1"
     loop autoplay>
    </lottie-player>
    <main v-if="loggedinUser">
      <h2>Welcome {{loggedinUser.name}} your current balance is ₿{{loggedinUser.balance}}</h2>
      <h2 v-if="rate">{{rate}}$</h2>
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

