import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Charts({ analytics }) {
  const categories = {
    Food: '#FF6384',
    Transport: '#36A2EB',
    Shopping: '#FFCE56',
    Entertainment: '#4BC0C0',
    Bills: '#9966FF',
    Healthcare: '#FF9F40',
    Education: '#FF6384',
    Other: '#C9CBCF'
  };

  const data = {
    labels: Object.keys(analytics.byCategory),
    datasets: [
      {
        data: Object.values(analytics.byCategory),
        backgroundColor: Object.keys(analytics.byCategory).map(cat => categories[cat] || '#C9CBCF'),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (Object.keys(analytics.byCategory).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Spending Analytics</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No data available for this month. Add some expenses to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">📊 Spending by Category</h2>
      <div className="max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {Object.entries(analytics.byCategory).map(([category, amount]) => (
          <div key={category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{category}</span>
            <span className="text-gray-600">₹{amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charts;