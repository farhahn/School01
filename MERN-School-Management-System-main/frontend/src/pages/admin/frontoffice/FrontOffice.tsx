import React, { useState } from "react";

const FrontOffice = () => {
  const [activeTab, setActiveTab] = useState("Purpose");
  const [entries, setEntries] = useState({
    Purpose: [
      { id: 1, name: "Marketing", description: "" },
      { id: 2, name: "Parent Teacher Meeting", description: "" },
    ],
    "Complaint Type": [
      { id: 3, name: "Discipline Issue", description: "" },
      { id: 4, name: "Bullying", description: "" },
    ],
    Source: [
      { id: 5, name: "Website", description: "" },
      { id: 6, name: "Email", description: "" },
    ],
    Reference: [
      { id: 7, name: "Staff", description: "" },
      { id: 8, name: "Student", description: "" },
    ],
  });

  const [newEntry, setNewEntry] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const handleAddOrEdit = () => {
    if (!newEntry) return;

    setEntries((prev) => ({
      ...prev,
      [activeTab]: editingId
        ? prev[activeTab].map((item) =>
            item.id === editingId ? { ...item, name: newEntry, description } : item
          )
        : [...prev[activeTab], { id: Date.now(), name: newEntry, description }],
    }));

    setNewEntry("");
    setDescription("");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setEntries((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((item) => item.id !== id),
    }));
  };

  const handleEdit = (item) => {
    setNewEntry(item.name);
    setDescription(item.description);
    setEditingId(item.id);
  };

  const filteredEntries = entries[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {["Purpose", "Complaint Type", "Source", "Reference"].map((tab) => (
          <p
            key={tab}
            style={activeTab === tab ? styles.activeMenu : styles.menuItem}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </p>
        ))}
      </div>

      {/* Add Entry Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add {activeTab}</h2>
        <label>{activeTab} *</label>
        <input
          type="text"
          style={styles.input}
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <label>Description</label>
        <textarea
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddOrEdit}>
          {editingId ? "Update" : "Save"}
        </button>
      </div>

      {/* Entry List */}
      <div style={styles.listContainer}>
        <h2 style={styles.heading}>{activeTab} List</h2>
        <input
          type="text"
          placeholder="Search..."
          style={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table style={styles.table}>
          <thead>
            <tr>
              <th>{activeTab}</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button style={styles.editBtn} onClick={() => handleEdit(item)}>✏️</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Records: {filteredEntries.length} of {entries[activeTab].length}</p>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#e8c897" 
  },
  sidebar: {
    width: "200px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
  },
  activeMenu: {
    fontWeight: "bold",
    color: "blue",
    cursor: "pointer",
  },
  menuItem: {
    cursor: "pointer",
  },
  formContainer: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
  },
  listContainer: {
    flex: 2,
    background: "#fff",
    padding: "20px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#444",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  editBtn: {
    marginRight: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

export default FrontOffice;
