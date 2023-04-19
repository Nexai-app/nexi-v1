import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    Tooltip

} from 'chart.js';
import { Box, Text } from '@chakra-ui/react';


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale, 
    Tooltip
)


const BarChart = () => {

    const data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG','SEPT','OCT','NOV','DEC' ],
        datasets: [{
            labels: 'Monthly Engagement Stat',
            data: [ 0, 0,0,40,0,0,0,0,0,0,0,0 ],
            fill: true,
            backgroundColor: 'rgba(255,255,255)',
            borderColor: 'rgba(255, 255, 255)',
            categoryPercentage: 5.0,
            tension: 0.4
        }]
    }

    const options={
        responsive: true,
        barThickness: 15,
        scales:{
            x:{
                ticks: {
                    color: '#fff',
                    fontSize: 10, 
                    fontStyle: 'bold', 
                },
                grid: {
                    display:false,
                },
            },
            
            y:{
                min:0,
                max:2000,
                ticks: {
                    color: '#fff',
                    stepSize: 500,
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    color:'#fff',
                    lineWidth: 1,
                    tickColor: '#fff', // for the tick mark
                    tickBorderDash: [2, 3], // also for the tick, if long enough
                    tickLength: 10, // just to see the dotted line
                    tickWidth: 2,
                    
                    
                },
                border: {
                    dash: [4, 4],
                    color: 'transparent'
                },
                beginAtZero: true,
                  
            }
            
        }
    }



  return (
    <Box p="30px" mt="30px" border='1px' borderColor='rgba(255, 255, 255, 0.3)' borderRadius="md" w={650} h={400} >
        <Text fontWeight="bold"  fontSize="lg" >Monthly Engagement Stat</Text>
        <Bar data={data} options={options} />
    </Box>
  )
}

export default BarChart;