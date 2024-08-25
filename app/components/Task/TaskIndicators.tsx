'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TaskIndicators = ({ tasks }) => {
  const statusCounts = {
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };

  const priorityCounts = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length,
  };

  const statusData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      label: 'Status Distribution',
      data: [statusCounts.pending, statusCounts.inProgress, statusCounts.completed],
      backgroundColor: ['#f87171', '#fbbf24', '#34d399'],
      borderColor: ['#f87171', '#fbbf24', '#34d399'],
      borderWidth: 1,
    }],
  };

  const priorityData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Priority Distribution',
      data: [priorityCounts.low, priorityCounts.medium, priorityCounts.high],
      backgroundColor: ['#d4f4ff', '#a7f3d0', '#fcd34d'],
      borderColor: ['#d4f4ff', '#a7f3d0', '#fcd34d'],
      borderWidth: 1,
    }],
  };

  return (
    <Box shadow="md" borderWidth="1px" borderRadius="md" bg="white" p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Task Metrics Overview</Text>
      <Flex justify="space-around" align="flex-start">
        <Box width="45%">
          <Text py='2' fontSize="lg" mb={3} color="black" textAlign="center">Status Distribution</Text>
          <div style={{ width: '100%', height: '250px' }}>
            <Bar
              data={statusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Status'
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Count'
                    },
                  },
                },
              }}
            />
          </div>
        </Box>
        <Box width="45%">
          <Text py='2' fontSize="lg" mb={3} color="black" textAlign="center">Priority Distribution</Text>
          <div style={{ width: '100%', height: '250px' }}>
            <Bar
              data={priorityData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Priority'
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Count'
                    },
                  },
                },
              }}
            />
          </div>
        </Box>
      </Flex>
    </Box>
  );
};

export default TaskIndicators;
