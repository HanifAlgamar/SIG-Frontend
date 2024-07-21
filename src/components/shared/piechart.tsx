import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ jumlahBTS, lokasiBlankspot }: { jumlahBTS: number; lokasiBlankspot: number }) => {
  const data = {
    labels: ['Jumlah BTS', 'Lokasi Blankspot'],
    datasets: [
      {
        data: [jumlahBTS, lokasiBlankspot], // Ganti dengan data aktual Anda
        backgroundColor: ['#1D4ED8', '#F97316'],
        hoverBackgroundColor: ['#1D4ED8', '#F97316'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Perbandingan Jumlah BTS dan Lokasi Blankspot',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;