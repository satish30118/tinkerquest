import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartBooking({ d1, d2,d3,d4,d5,d6 }) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: d1, label: 'Blood' },
            { id: 1, value: d2, label: 'Vitamin' },
            { id: 2, value: d3, label: 'Diabetes' },
            { id: 3, value: d4, label: 'Kidney' },
            { id: 4, value: d5, label: 'Liver' },
            { id: 5, value: d6, label: 'Thyroid' },
          ],
        },
      ]}
      width={"95%"}
      height={280}
    />
  );
}