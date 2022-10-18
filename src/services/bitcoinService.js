import axios from "axios"
import { storageService } from "./storage.service.js"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

const STORAGE_KEY_RATE = 'rate'
const STORAGE_KEY_HISTORY_PRICE = 'price-history'

function getRate() {
    const rate = storageService.load(STORAGE_KEY_RATE) || {}
    if (rate.keys?.length>0) {
        return Promise.resolve(rate)
    }
    else {
        return axios.get(`https://blockchain.info/ticker`)
            .then(res => {
                let rate = res.data.USD.last
                 storageService.save(STORAGE_KEY_RATE,rate)
                 return rate
            })
    }
}

function getMarketPriceHistory() {
    const priceHistory = storageService.load(STORAGE_KEY_HISTORY_PRICE) || []
    if (priceHistory?.length>0) {
        return Promise.resolve(priceHistory)
    }
    else {
        return axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
            .then(res => {
                let priceHistory = res.data.values
                 storageService.save(STORAGE_KEY_HISTORY_PRICE,priceHistory)
                 return priceHistory
            })
    }
}

function getAvgBlockSize() {

}