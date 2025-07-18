// src/components/ChartExample.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['country1', 'country2', 'country3'],
  datasets: [
    {
      label: 'competition rate',
      data: [2.5, 3.1, 1.8],
      backgroundColor: 'rgba(75,192,192,0.5)',
    },
  ],
};

export default function ChartExample() {
  return <Bar data={data} />;
}