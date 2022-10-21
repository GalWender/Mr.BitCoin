<template>
  <section class="home">
    <lottie-player src="../../src/assets/lottie/home-lottie-animation.json" class="lottie lottie-bitcoin-animation" background="transparent" speed="1"
     loop autoplay>
    </lottie-player>
    <main v-if="user">
      <h2>Welcome {{user.name}} your current balance is ${{user.balance}}</h2>
      <h2 v-if="rate">{{rate}}$</h2>
    </main>
  </section>
</template>

<script>
import { userService } from '../services/userService.js';
import { bitcoinService } from '../services/bitcoinService.js';

export default {
  data() {
    return {
      user: null,
      rate: null
    }
  },
  async created() {
    this.user = await userService.getLoggedinUser(),
      this.rate = await bitcoinService.getRate()
  }
}
</script>

