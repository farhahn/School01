import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddIncome = () => {
  const [formData, setFormData] = useState({
    incomeHead: '',
    name: '',
    invoiceNumber: '',
    date: '',
    amount: '',
    document: null
  });

  const [incomeData, setIncomeData] = useState([
    { name: 'School Bus Rent', description: 'School Bus Rent', invoiceNumber: '35234', date: '03/31/2025', incomeHead: 'Rent', amount: '₹180.00' }
  ]);

  const [editIndex, setEditIndex] = useState(null);

  const incomeHeads = ['Rent', 'Miscellaneous', 'Donation', 'Book Sale', 'Uniform Sale'];

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    button: {
      backgroundColor: editIndex !== null ? '#FFA500' : '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    tableHeader: {
      borderBottom: '2px solid #ddd',
      padding: '10px',
      backgroundColor: '#f8f8f8'
    },
    tableCell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      textAlign: 'center'
    },
    icon: {
      cursor: 'pointer',
      margin: '0 5px',
      color: '#555'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedIncome = [...incomeData];
      updatedIncome[editIndex] = { ...formData, amount: `$${parseFloat(formData.amount).toFixed(2)}` };
      setIncomeData(updatedIncome);
      setEditIndex(null);
    } else {
      setIncomeData([...incomeData, { ...formData, amount: `$${parseFloat(formData.amount).toFixed(2)}` }]);
    }
    setFormData({ incomeHead: '', name: '', invoiceNumber: '', date: '', amount: '', document: null });
  };

  const handleEdit = (index) => {
    setFormData(incomeData[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredData = incomeData.filter((_, i) => i !== index);
    setIncomeData(filteredData);
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Add Income</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Income Head *</label>
          <select name="incomeHead" value={formData.incomeHead} onChange={handleChange} style={styles.input} required>
            <option value="">Select</option>
            {incomeHeads.map(head => (<option key={head} value={head}>{head}</option>))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Invoice Number</label>
          <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date *</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount ($) *</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={styles.input} step="0.01" required />
        </div>
        <button type="submit" style={styles.button}>{editIndex !== null ? 'Update Income' : 'Add Income'}</button>
      </form>
      <h2 style={{ marginTop: '20px' }}>Description</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {['Name', 'Description', 'Invoice Number', 'Date', 'Income Head', 'Amount ($)', 'Actions'].map(header => (
              <th key={header} style={styles.tableHeader}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incomeData.map((entry, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{entry.name}</td>
              <td style={styles.tableCell}>{entry.description}</td>
              <td style={styles.tableCell}>{entry.invoiceNumber}</td>
              <td style={styles.tableCell}>{entry.date}</td>
              <td style={styles.tableCell}>{entry.incomeHead}</td>
              <td style={styles.tableCell}>{entry.amount}</td>
              <td style={styles.tableCell}>
                <FaEdit style={styles.icon} onClick={() => handleEdit(index)} />
                <FaTrash style={styles.icon} onClick={() => handleDelete(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddIncome;