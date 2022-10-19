<template>
    <section class="charts-container">
        <market-price-history v-if="bitcoinPrices" :data="priceData" :labels="priceLabels"/>
    </section>
</template>
  
<script>
import { bitcoinService } from '../services/bitcoinService.js'
import MarketPriceHistory from '../components/LineChart.vue'

export default {
    data() {
        return {
            bitcoinPrices: null,
        }
    },
    async created() {
        await this.getMarketPriceHistory();
    },
    methods:{
        async getMarketPriceHistory() {
            const values = await bitcoinService.getMarketPriceHistory();
            this.bitcoinPrices = values;
        }
    },
    computed:{
        priceLabels(){
            return this.bitcoinPrices.map((value)=>new Date(value.x*1000).toLocaleDateString());
        },
        priceData(){
            return this.bitcoinPrices.map(value=>value.y)
        }
    },
    components: {MarketPriceHistory},
}
</script>