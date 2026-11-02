import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from 'react';

export default function DataAnalysisChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [
        ...prev.slice(-19),
        [Date.now(), Math.random() * 100],
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

 const options = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 275 },
    title: { text: 'Converting data into decisions', style: { color: '#fff', fontSize: '18px', fontWeight: 'bold' } },
    xAxis: { visible: false },
    yAxis: { title: { text: 'Sales', style: { color: '#e2e8f0' } }, labels: { style: { color: '#e2e8f0' } } },
    series: [{ name: 'Time', data, color: '#32CD32', fillOpacity: 0.3 }],
    credits: { enabled: false },
    legend: { itemStyle: { color: '#e2e8f0' } },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
