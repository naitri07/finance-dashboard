import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Charts from './Charts';

function Dashboard({ setIsAuthenticated }) {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const currentYear = new Date().getFullYear();
  const [filter, setFilter] = useState({ 
    month: new Date().getMonth() + 1, 
    year: currentYear,  // Auto current year
    category: 'All' 
  });
  const [analytics, setAnalytics] = useState({ total: 0, byCategory: {} });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/expenses/analytics/monthly?year=${filter.year}&month=${filter.month}`, {
        headers: { 'x-auth-token': token }
      });
      setAnalytics(response.data);
      setExpenses(response.data.expenses);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const exportToCSV = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/expenses/export/csv', {
        headers: { 'x-auth-token': token },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export successful!');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">💰 Personal Finance Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                📥 Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Charts analytics={analytics} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Monthly Summary</h2>
            <p className="text-3xl font-bold text-blue-600">₹{analytics.total.toFixed(2)}</p>
            <p className="text-gray-600 mt-2">Total Expenses for {filter.month}/{filter.year}</p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
              <select
                value={filter.month}
                onChange={(e) => setFilter({ ...filter, month: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>
              
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">Select Year</label>
              <select
                value={filter.year}
                onChange={(e) => setFilter({ ...filter, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {(() => {
                  const currentYear = new Date().getFullYear();
                  const years = [];
                  // past 3 years, current year, and future 3 years
                  for (let i = currentYear - 3; i <= currentYear + 3; i++) {
                    years.push(i);
                  }
                  return years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ));
                })()}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ExpenseForm
            fetchExpenses={fetchExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>

        <div className="mt-8">
          <ExpenseList
            expenses={expenses}
            setEditingExpense={setEditingExpense}
            fetchExpenses={fetchExpenses}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;