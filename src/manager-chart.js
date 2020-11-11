import Chart from 'chart.js';
import dom from './dom';
const chartDisplay = document.getElementById('manager-chart');

let managerChart = new Chart(chartDisplay, {
  type: 'line',
  data: {
    labels: dom.buildChartDates(),
    datasets: [{
      label: 'Monthly Revenue Forecast',
      data: 0,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
});

export default managerChart;