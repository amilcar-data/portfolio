import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from 'react';

export default function AIModelChart() {
  const [showArchitecture, setShowArchitecture] = useState(true);

  // Neural Network Architecture visualization
const layers = [
    { label: 'Entrada', nodes: 1, color: '#FF6B6B' },
    { label: 'Procesamiento 1', nodes: 6, color: '#4ECDC4' },
    { label: 'Procesamiento 2', nodes: 6, color: '#FFE66D' },
    { label: 'Procesamiento 3', nodes: 6, color: '#95E1D3' },
    { label: 'Salida', nodes: 2, color: '#F38181' }
  ];

  const neuronSeries = layers.map((layer, x) => ({
    type: 'scatter',
    name: layer.label,
    data: Array.from({ length: layer.nodes }, (_, y) => [x, y]),
    marker: {
      radius: 8,
      symbol: 'circle',
      fillColor: layer.color,
      lineWidth: 2.2  
    }
  }));

  const connectionSeries = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l].nodes; i++) {
      for (let j = 0; j < layers[l + 1].nodes; j++) {
        connectionSeries.push({
          type: 'line',
          enableMouseTracking: false,
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 2,
          marker: { enabled: false },
          data: [[l, i], [l + 1, j]]
        });
      }
    }
  }

  const architectureOptions = {
    chart: {
      height: 275,
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Neural Network Architecture',
      style: { color: '#fff', fontSize: '18px', fontWeight: 'bold' }
    },
    subtitle: {
      text: 'Click to view training metrics',
      style: { color: '#9ca3af', cursor: 'pointer' }
    },
    legend: { enabled: false },
    xAxis: {
      categories: layers.map(l => l.label),
      tickLength: 0,
      labels: { style: { color: '#e2e8f0' } }
    },
    yAxis: { visible: false },
    tooltip: {
      formatter() {
        return `<b>${this.series.name}</b><br/>Neuron #${this.point.y + 1}`;
      }
    },
    series: [...connectionSeries, ...neuronSeries],
    credits: { enabled: false }
  };

  // Training Progress visualization
  const trainingOptions = {
    chart: {
      backgroundColor: 'transparent',
      height: 275
    },
    title: {
      text: 'Model Training Progress',
      style: { color: '#fff', fontSize: '18px', fontWeight: 'bold' }
    },
    subtitle: {
      text: 'Click to view architecture',
      style: { color: '#9ca3af', cursor: 'pointer' }
    },
    xAxis: {
      title: { text: 'Epoch', style: { color: '#e2e8f0' } },
      labels: { style: { color: '#e2e8f0' } }
    },
    yAxis: [{
      title: { text: 'Loss', style: { color: '#e2e8f0' } },
      labels: { style: { color: '#e2e8f0' } }
    }, {
      title: { text: 'Accuracy (%)', style: { color: '#e2e8f0' } },
      labels: { style: { color: '#e2e8f0' } },
      opposite: true
    }],
    tooltip: {
      shared: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      style: { color: '#fff' }
    },
    series: [{
      name: 'Training Loss',
      type: 'spline',
      data: [2.3, 1.8, 1.4, 1.0, 0.8, 0.6, 0.5, 0.4, 0.35, 0.3],
      color: '#ef4444',
      yAxis: 0
    }, {
      name: 'Validation Loss',
      type: 'spline',
      data: [2.4, 1.9, 1.5, 1.1, 0.9, 0.7, 0.6, 0.52, 0.48, 0.45],
      color: '#f97316',
      dashStyle: 'Dash',
      yAxis: 0
    }, {
      name: 'Accuracy',
      type: 'spline',
      data: [45, 58, 68, 75, 81, 85, 88, 90, 92, 93.5],
      color: '#10b981',
      yAxis: 1
    }],
    legend: {
      itemStyle: { color: '#e2e8f0' }
    },
    credits: { enabled: false }
  };

  return (
    <div 
      style={{ cursor: 'pointer' }}
      onClick={() => setShowArchitecture(!showArchitecture)}
    >
      <HighchartsReact 
        key={showArchitecture}
        highcharts={Highcharts} 
        options={showArchitecture ? architectureOptions : trainingOptions} 
      />
    </div>
  );
}
