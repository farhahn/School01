import React, { useState } from 'react';

function ComplaintPage() {
  const [complaints, setComplaints] = useState([
    { id: 300, type: 'Hostel', name: 'David', phone: '0786788078', date: '03/30/2025', action: '✅✅✅' },
    // Add other complaints here
  ]);

  const [formData, setFormData] = useState({
    complaintType: '',
    source: '',
    complainBy: 'Phone',
    date: '',
    description: '',
    actionTaken: 'Assigned',
    note: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update existing complaint
      const updatedComplaints = complaints.map((complaint) =>
        complaint.id === editingId
          ? {
              ...complaint,
              type: formData.complaintType,
              date: formData.date,
              action: formData.actionTaken,
            }
          : complaint
      );
      setComplaints(updatedComplaints);
      setEditingId(null);
    } else {
      // Add new complaint
      const newComplaint = {
        id: complaints.length + 1,
        type: formData.complaintType,
        name: 'New User', // You can add a name field in the form if needed
        phone: '0000000000', // You can add a phone field in the form if needed
        date: formData.date,
        action: formData.actionTaken,
      };
      setComplaints([...complaints, newComplaint]);
    }
    // Reset form data
    setFormData({
      complaintType: '',
      source: '',
      complainBy: 'Phone',
      date: '',
      description: '',
      actionTaken: 'Assigned',
      note: '',
    });
  };

  const handleEdit = (id) => {
    const complaintToEdit = complaints.find((complaint) => complaint.id === id);
    if (complaintToEdit) {
      setFormData({
        complaintType: complaintToEdit.type,
        source: '',
        complainBy: 'Phone',
        date: complaintToEdit.date,
        description: '',
        actionTaken: complaintToEdit.action,
        note: '',
      });
      setEditingId(id);
    }
  };

  const handleRemove = (id) => {
    const updatedComplaints = complaints.filter((complaint) => complaint.id !== id);
    setComplaints(updatedComplaints);
  };

  const handleCopy = (id) => {
    const complaintToCopy = complaints.find((complaint) => complaint.id === id);
    if (complaintToCopy) {
      navigator.clipboard.writeText(JSON.stringify(complaintToCopy));
      alert('Complaint copied to clipboard!');
    }
  };

  const handleDownloadPDF = (id) => {
    alert(`Downloading PDF for complaint #${id}`);
    // You can implement PDF generation logic here
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.phone.includes(searchQuery)
  );

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Add Complaint</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Complaint Type:
          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="Hostel">Hostel</option>
            <option value="Front Office">Front Office</option>
            <option value="Teacher">Teacher</option>
            <option value="Transport">Transport</option>
            <option value="Study">Study</option>
            <option value="Fees">Fees</option>
            <option value="Sports">Sports</option>
          </select>
        </label>
        <label style={styles.label}>
          Source:
          <select name="source" value={formData.source} onChange={handleChange} style={styles.input}>
            <option value="">Select</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </select>
        </label>
        <label style={styles.label}>
          Complain By:
          <select name="complainBy" value={formData.complainBy} onChange={handleChange} style={styles.input}>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="In-Person">In-Person</option>
          </select>
        </label>
        <label style={styles.label}>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} />
        </label>
        <label style={styles.label}>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} />
        </label>
        <label style={styles.label}>
          Action Taken:
          <select name="actionTaken" value={formData.actionTaken} onChange={handleChange} style={styles.input}>
            <option value="Assigned">Assigned</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
        <label style={styles.label}>
          Note:
          <input type="text" name="note" value={formData.note} onChange={handleChange} style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>
          <i className="fas fa-save" style={styles.icon}></i> {editingId !== null ? 'Update' : 'Save'}
        </button>
      </form>

      <h2 style={styles.heading}>Complaint List</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search complaints..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Complain #</th>
            <th style={styles.tableHeader}>Complaint Type</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Phone</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Action</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint) => (
            <tr key={complaint.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{complaint.id}</td>
              <td style={styles.tableCell}>{complaint.type}</td>
              <td style={styles.tableCell}>{complaint.name}</td>
              <td style={styles.tableCell}>{complaint.phone}</td>
              <td style={styles.tableCell}>{complaint.date}</td>
              <td style={styles.tableCell}>{complaint.action}</td>
              <td style={styles.tableCell}>
                <button onClick={() => handleEdit(complaint.id)} style={styles.iconButton}>
                  <i className="fas fa-edit" style={styles.icon}></i>
                </button>
                <button onClick={() => handleCopy(complaint.id)} style={styles.iconButton}>
                  <i className="fas fa-copy" style={styles.icon}></i>
                </button>
                <button onClick={() => handleDownloadPDF(complaint.id)} style={styles.iconButton}>
                  <i className="fas fa-file-pdf" style={styles.icon}></i>
                </button>
                <button onClick={() => handleRemove(complaint.id)} style={styles.iconButton}>
                  <i className="fas fa-trash" style={styles.icon}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    background: 'linear-gradient(135deg,rgb(175, 149, 72),rgba(107, 158, 235, 0.86))',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '15px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    marginLeft: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '14px',
  },
  textarea: {
    marginLeft: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '14px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg,rgb(203, 156, 17), #2575fc)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: '8px',
  },
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    padding: '12px',
    background: 'linear-gradient(135deg,rgb(203, 163, 17), #2575fc)',
    color: '#fff',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    '&:hover': {
      background: '#f1f1f1',
    },
  },
  tableCell: {
    padding: '12px',
    fontSize: '14px',
    color: '#555',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    margin: '0 5px',
    color: '#6a11cb',
    '&:hover': {
      color: '#2575fc',
    },
  },
};

export default ComplaintPage;