// src/components/BitrateChart.jsx

import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const BitrateChart = ({ defaultRate = 0 }) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentSpeed, setCurrentSpeed] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Simulação de dados de taxa de bits (em kbps) para 30 minutos
    const interval = 60; // Intervalo em segundos (1 minuto)
    const totalPoints = 30; // Total de 30 pontos para 30 minutos

    const generateRandomBitrate = () => Math.floor(Math.random() * 5000) + 1000; // Gera taxa de bits aleatória entre 1000 e 6000 kbps

    const newData = Array.from({ length: totalPoints }, generateRandomBitrate);
    const newLabels = Array.from({ length: totalPoints }, (_, i) => `${i * interval / 60} min`);

    setData(newData);
    setLabels(newLabels);
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Bitrate (kbps)',
        data,
        borderColor: '#8b5cf6', // Cor da linha (roxo Tailwind)
        backgroundColor: 'rgba(139, 92, 246, 0.3)', // Cor do preenchimento (roxo com transparência)
        fill: true,
        tension: 0.3, // Suaviza a linha
        pointRadius: 0, // Remove os pontos
        borderWidth: 2, // Espessura da linha
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Desabilita a manutenção da proporção para permitir ajuste de largura total
    plugins: {
      legend: {
        display: false, // Remove a legenda para focar no gráfico
      },
      tooltip: {
        enabled: false, // Desativa o tooltip padrão
        mode: 'index',
        intersect: false,
        external: (context) => {
          // Função para exibir a velocidade ao lado do gráfico
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            setCurrentSpeed(null);
            return;
          }

          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          setCurrentSpeed(data[dataIndex]);
        },
      },
    },
    scales: {
      x: {
        display: false, // Remove os labels do eixo x para um visual mais limpo
      },
      y: {
        display: false, // Remove os labels do eixo y
        beginAtZero: true,
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    onHover: (event, chartElement) => {
      const chart = chartRef.current;
      if (chart) {
        chart.canvas.style.cursor = chartElement.length ? 'pointer' : 'default';
      }
    },
  };

  // Plugin para desenhar a linha vertical
  const verticalLinePlugin = {
    id: 'verticalLinePlugin',
    afterDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        const activePoint = chart.tooltip._active[0];
        ctx.beginPath();
        ctx.moveTo(activePoint.element.x, chart.chartArea.top);
        ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#8b5cf6'; // Cor da linha vertical (roxo)
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  return (
    <div className="relative flex items-center w-full h-64"> {/* Adicione w-full para largura total */}
      <div className="text-2xl font-bold text-purple absolute right-0 top-0">
        {currentSpeed !== null ? parseInt(currentSpeed.toLocaleString('pt-BR') * 1000) : defaultRate} Kbps
      </div>
      <Line ref={chartRef} data={chartData} options={options} plugins={[verticalLinePlugin]} className="w-full h-full" /> {/* Adicione w-full h-full para ajustar o gráfico */}
    </div>
  );
};

export default BitrateChart;
