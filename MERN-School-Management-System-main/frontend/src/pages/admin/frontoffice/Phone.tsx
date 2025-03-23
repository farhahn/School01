import React, { useState } from "react";

const Phone = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    description: "",
    followUpDate: "",
    duration: "",
    note: "",
    callType: "Incoming",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedLogs = callLogs.map((log, index) =>
        index === editIndex ? formData : log
      );
      setCallLogs(updatedLogs);
      setEditIndex(null);
    } else {
      setCallLogs([...callLogs, formData]);
    }
    setFormData({
      name: "",
      phone: "",
      date: "",
      description: "",
      followUpDate: "",
      duration: "",
      note: "",
      callType: "Incoming",
    });
  };

  const handleEdit = (index) => {
    setFormData(callLogs[index]);
    setEditIndex(index);
  };

  const handleView = (log) => {
    alert(
      `📞 Call Details:\n\nName: ${log.name}\nPhone: ${log.phone}\nDate: ${log.date}\nFollow Up: ${log.followUpDate}\nDuration: ${log.duration}\nNote: ${log.note}\nType: ${log.callType}`
    );
  };

  const handleRemove = (index) => {
    setCallLogs(callLogs.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({
        name: "",
        phone: "",
        date: "",
        description: "",
        followUpDate: "",
        duration: "",
        note: "",
        callType: "Incoming",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  // Filter and sort logic
  const filteredLogs = callLogs
    .filter((log) =>
      log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.phone.includes(searchQuery)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.formContainer}>
        <h2>{editIndex !== null ? "Edit Call Log" : "Add Phone Call Log"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required style={styles.input} />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required style={styles.input} />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={styles.input} />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="2" style={styles.input} />

          <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} placeholder="Follow Up Date" style={styles.input} />
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Call Duration" style={styles.input} />
          <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Note" rows="2" style={styles.input} />

          <div>
            <label>Call Type: </label>
            <label>
              <input type="radio" name="callType" value="Incoming" checked={formData.callType === "Incoming"} onChange={handleChange} /> Incoming
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input type="radio" name="callType" value="Outgoing" checked={formData.callType === "Outgoing"} onChange={handleChange} /> Outgoing
            </label>
          </div>

          <button type="submit" style={styles.button}>
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* Call Log Table */}
      <div style={styles.tableContainer}>
        <h2>Phone Call Log List</h2>

        {/* Search and Sorting Controls */}
        <div style={styles.searchSortContainer}>
          <input type="text" placeholder="🔍 Search by Name/Phone" value={searchQuery} onChange={handleSearch} style={styles.searchInput} />
          <button onClick={toggleSortOrder} style={styles.sortButton}>
            {sortOrder === "newest" ? "⬇️ Newest First" : "⬆️ Oldest First"}
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Follow Up</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.name}</td>
                <td>{log.phone}</td>
                <td>{log.date}</td>
                <td>{log.followUpDate}</td>
                <td>{log.callType}</td>
                <td>
                  <button onClick={() => handleView(log)}>👁️ View</button>
                  <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                  <button onClick={() => handleRemove(index)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#e8c897" 
  },
  formContainer: {
    width: "40%",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  tableContainer: {
    width: "60%",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  searchSortContainer: {
    display: "flex",
    gap: "10px",
  },
  searchInput: {
    width: "70%",
    padding: "8px",
  },
  sortButton: {
    padding: "8px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
};

export default Phone;
