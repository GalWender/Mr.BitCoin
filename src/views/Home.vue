<template>
  <main v-if="user">
    <h2>Welcome {{user.name}} your current balance is ${{user.balance}}</h2>
    <h2 v-if="rate">{{rate}}$</h2>
  </main>
</template>

<script>
import { userService } from '../services/userService.js';
import { bitcoinService} from '../services/bitcoinService.js';

export default {
  data() {
    return {
      user: null,
      rate:null
    }
  },
  async created() {
    this.user = await userService.getUser(),
    this.rate = await bitcoinService.getRate()
  }
}
</script>

