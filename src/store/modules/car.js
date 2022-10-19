import { carService } from '@/services/car.service.js'
export default {
    state:{
        cars: [],
    },
    mutations:{
        setCars(state, { cars }){
            state.cars = cars
        },
        removeCar(state, { carId }){
            const idx = state.cars.findIndex(car => car._id === carId)
            state.cars.splice(idx, 1)
        },
        saveCar(state, { car }){
            const carId = car._id
            const idx = state.cars.findIndex(car => car._id === carId)
            state.cars.splice(idx, 1, car)
        }
    },
    actions: {
        async loadCars(context){
            const cars = await carService.query()
            console.log(cars);
            context.commit({ type: 'setCars', cars })
        },
        async removeCar({ commit }, { carId }){
            await carService.remove(carId)
            commit({ type: 'removeCar', carId })
        },
        async saveCar({ commit }, { car }){
            await carService.save(car)
            commit({ type: 'saveCar', car })
        }
    },
    getters:{
        cars(state){ return state.cars }
    }
}