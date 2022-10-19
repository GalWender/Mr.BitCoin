<template>
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
        :height="height" />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props: {
        chartId: {
            type: String,
            default: 'line-chart',
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array
        },
        labels: {
            type: Array
        }
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: this.data
                }]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    async created() {
        console.log(this.labels)
    }
}

</script>
