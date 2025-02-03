import * as React from 'react';
import { DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';



export default function Piepercent({ d1, d2,d3,d4,d5,d6 }) {
    const data = [
        { id: 0, value: d1, label: 'Blood' },
        { id: 1, value: d2, label: 'Vitamin' },
        { id: 2, value: d3, label: 'Diabetes' },
        { id: 3, value: d4, label: 'Kidney' },
        { id: 4, value: d5, label: 'Liver' },
        { id: 5, value: d6, label: 'Thyroid' },
    ];
    
    const sizing = {
      margin: { right: 5 },
      width: 570,
      height: 500,
      legend: { hidden: false,},
    };
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    
    const getArcLabel = (params) => {
      const percent = params.value / TOTAL;
      return `${(percent * 100).toFixed(0)}%`;
    };
  return (
    <PieChart
      series={[
        {
          outerRadius: 160,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 10,
        },
      }}
      {...sizing}
    />
  );
}