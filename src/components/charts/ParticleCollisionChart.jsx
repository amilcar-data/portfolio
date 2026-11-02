import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from 'react';

export default function ParticleCollisionChart() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Set colors
    Highcharts.setOptions({
      colors: [
        'rgba(59, 130, 246, 0.6)',   // Blue for electrons
        'rgba(249, 115, 22, 0.6)',   // Orange for muons
        'rgba(236, 72, 153, 0.6)',   // Pink for pions
      ],
    });

    // Generate simulated particle collision data
    const generateParticleData = (count, massRange, chargeType) => {
      const data = [];
      for (let i = 0; i < count; i++) {
        // Relativistic momentum-energy relationship: E² = (pc)² + (mc²)²
        const momentum = Math.random() * 0.8 + 1.4; // GeV/c
        const mass = massRange[0] + Math.random() * (massRange[1] - massRange[0]);
        const energy = Math.sqrt(
          Math.pow(momentum, 2) + Math.pow(mass, 2)
        );
        
        // Add some realistic spread
        const momentumWithSpread = momentum + (Math.random() - 0.5) * 0.05;
        const energyWithSpread = energy + (Math.random() - 0.5) * 0.1;
        
        data.push([momentumWithSpread, energyWithSpread]);
      }
      return data;
    };

    const particles = [
      {
        name: 'Electrons (e⁻)',
        data: generateParticleData(150, [0.0005, 0.0005]), // electron mass ~0.5 MeV
        symbol: 'circle'
      },
      {
        name: 'Muons (μ⁻)',
        data: generateParticleData(120, [0.105, 0.106]), // muon mass ~105 MeV
        symbol: 'triangle'
      },
      {
        name: 'Pions (π⁺)',
        data: generateParticleData(100, [0.135, 0.140]), // pion mass ~135 MeV
        symbol: 'square'
      }
    ];

    setSeries(particles);
  }, []);

  const options = {
    chart: {
      type: 'scatter',
      backgroundColor: 'transparent',
      zooming: { type: 'xy' },
      height: 275
    },

    title: {
      text: 'Particle Collision Simulation',
      style: { color: '#fff', fontSize: '18px', fontWeight: 'bold' },
    },

    subtitle: {
      text: 'Momentum vs Energy Distribution',
      style: { color: '#9ca3af', fontSize: '14px' }
    },
    
    xAxis: {
      title: { text: 'Momentum (GeV/c)', style: { color: '#e2e8f0' } },
      labels: { 
        format: '{value}',
        style: { color: '#e2e8f0' } 
      },
      gridLineColor: 'rgba(255,255,255,0.1)',
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },

    yAxis: {
      title: { text: 'Energy (GeV)', style: { color: '#e2e8f0' } },
      labels: { 
        format: '{value}',
        style: { color: '#e2e8f0' } 
      },
      gridLineColor: 'rgba(255,255,255,0.1)',
    },

    legend: {
      enabled: true,
      itemStyle: { color: '#e2e8f0' },
    },

    plotOptions: {
      scatter: {
        marker: {
          radius: 3,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        jitter: {
          x: 0.005,
          y: 0.005
        },
      },
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      style: { color: '#fff' },
      pointFormat: 'Momentum: {point.x:.3f} GeV/c<br/>Energy: {point.y:.3f} GeV',
    },

    series,

    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
