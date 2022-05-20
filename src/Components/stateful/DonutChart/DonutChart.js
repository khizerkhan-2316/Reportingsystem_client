import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const DonutChart = ({ data, revenueProp }) => {
  const [revenueState, setRevenueState] = useState(revenueProp);

  const formatNumber = (number) => {
    return number.toLocaleString('dk-DK', { maximumFractionDigits: 2 });
  };

  useEffect(() => {
    setRevenueState(revenueProp);
  }, [revenueProp, setRevenueState]);
  Chart.register(ArcElement);
  const chartData = {
    datasets: [
      {
        data: [data[0], data[1] - data[0]],
        backgroundColor: ['#FE5000', '#F6F6F6'],
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        ctx.font = '16px Playfair Display';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'white';
        var text = 'Total renuve Q';
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 1.5;
        const textX1 = Math.round(
          (width - ctx.measureText(revenueState).width) / 2
        );
        const textY1 = height / 1.2;
        ctx.fillText(text, textX, textY);
        ctx.fillText(formatNumber(revenueState) + ' kr.', textX1, textY1);
        ctx.save();
      },
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: 270,
    circumference: 180,
    cutout: 60,
    radius: 150,
    radiusPercentage: 50,
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    revenueState && (
      <Doughnut data={chartData} plugins={plugins} options={options} />
    )
  );
};

export default DonutChart;
