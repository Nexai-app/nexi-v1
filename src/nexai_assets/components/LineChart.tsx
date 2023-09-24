import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    PointElement,
    Tooltip

} from 'chart.js';
import { Box, Text, useMediaQuery } from '@chakra-ui/react';


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale, 
    PointElement,
    Tooltip
)


const LineChart = () => {

    const data = {
        labels: ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
        datasets: [{
            labels: 'Daily Users Statistics',
            data: [180, 100, -20, 200, 100, 400, -100],
            // backgroundColor: 'rgba(52, 26, 65, 1)',
            borderColor: 'white',
            // pointBorderColor:'rgba(255, 255, 255)',
            // pointBackgroundColor: 'white',
            pointBorderWidth: 0,
            pointHoverBackgroundColor: 'white',
            pointHoverRadius: 8,
            fill: true,
            tension: 0.3
        }]
    }

    let delayed;
    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: '#fff', // Set this to the color you want
                    fontSize: 14, // Set this to the font size you want
                    fontStyle: 'bold', // Set this to the font style you want
                },
                grid: {
                    display: false,
                },
            },
            
            y: {
                suggestedMin: 0,
                suggestedMax: 200,
                ticks: {
                    color: '#fff',
                    stepSize: 100
                },
                grid: {
                    color: '#fff',
                    lineWidth: 0.2,
                    tickColor: '#fff', // for the tick mark
                    tickBorderDash: [2, 3], // also for the tick, if long enough
                    tickLength: 10, // just to see the dotted line
                    tickWidth: 0,
                    
                    
                    
                },
                border: {
                    dash: [4, 4],
                    color: 'transparent'
                },
                beginAtZero: true,
            }
        }
    }

    const [isLargerThan960] = useMediaQuery("(max-width: 960px)");
    const [isLargerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <Box>
        {
            isLargerThan750 ? 
            (
                <Box p="15px" mt="10px" border='1px' borderColor='rgba(255, 255, 255, 0.3)' borderRadius="md" w="100%"  >
                    <Text fontWeight="bold"  fontSize="lg" >Daily Users Statistics</Text>
                    <Line data={data} options={options}  />
                </Box>
            ) :
            (isLargerThan960 ? 
            (
                <Box p="30px" mt="10px" border='1px' borderColor='rgba(255, 255, 255, 0.3)' borderRadius="md" w="100%"  >
                    <Text fontWeight="bold"  fontSize="lg" >Daily Users Statistics</Text>
                    <Line data={data} options={options} />
                </Box>
            ) :
            (

                <Box p="30px" mt="10px" border='1px' borderColor='rgba(255, 255, 255, 0.3)' borderRadius="md" w={`100%`} h={`100%`} >
                    <Text fontWeight="bold"  fontSize="lg" >Daily Users Statistics</Text>
                    <Line data={data} options={options} />
                </Box>
            ))
        }

    </Box>
  )
}

export default LineChart;