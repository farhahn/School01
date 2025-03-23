import React, { useState } from "react";

const PostalReceive = () => {
  const [formData, setFormData] = useState({
    fromTitle: "",
    referenceNo: "",
    address: "",
    note: "",
    toTitle: "",
    date: new Date().toISOString().split("T")[0],
    document: null,
  });

  const [postalList, setPostalList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newer");
  const [editIndex, setEditIndex] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      let updatedList = [...postalList];
      updatedList[editIndex] = formData;
      setPostalList(updatedList);
      setEditIndex(null);
    } else {
      setPostalList([...postalList, formData]);
    }
    setFormData({
      fromTitle: "",
      referenceNo: "",
      address: "",
      note: "",
      toTitle: "",
      date: new Date().toISOString().split("T")[0],
      document: null,
    });
  };

  const handleEdit = (index) => {
    setFormData(postalList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = postalList.filter((_, i) => i !== index);
    setPostalList(updatedList);
  };

  const handleView = (item) => {
    setViewItem(item);
  };

  const sortedList = [...postalList]
    .filter((item) =>
      item.fromTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newer"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.formContainer}>
        <h2>{editIndex !== null ? "Edit Postal Receive" : "Add Postal Receive"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fromTitle"
            placeholder="From Title *"
            value={formData.fromTitle}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="referenceNo"
            placeholder="Reference No"
            value={formData.referenceNo}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.textarea}
          />
          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            style={styles.textarea}
          />
          <input
            type="text"
            name="toTitle"
            placeholder="To Title"
            value={formData.toTitle}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />
          <input type="file" onChange={handleFileChange} style={styles.input} />
          <button type="submit" style={styles.button}>
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* Postal Receive List Section */}
      <div style={styles.listContainer}>
        <h2>Postal Receive List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => setSortOrder("newer")} style={styles.sortButton}>
          Newer
        </button>
        <button onClick={() => setSortOrder("older")} style={styles.sortButton}>
          Older
        </button>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>From Title</th>
              <th>Reference No</th>
              <th>To Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((item, index) => (
              <tr key={index}>
                <td>{item.fromTitle}</td>
                <td>{item.referenceNo}</td>
                <td>{item.toTitle}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => handleEdit(index)} style={styles.editButton}>
                    ✏️
                  </button>
                  <button onClick={() => handleView(item)} style={styles.viewButton}>
                    👁️
                  </button>
                  <button onClick={() => handleDelete(index)} style={styles.deleteButton}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Modal */}
        {viewItem && (
          <div style={styles.viewModal}>
            <h3>Postal Details</h3>
            <p><strong>From:</strong> {viewItem.fromTitle}</p>
            <p><strong>Reference No:</strong> {viewItem.referenceNo}</p>
            <p><strong>To:</strong> {viewItem.toTitle}</p>
            <p><strong>Date:</strong> {viewItem.date}</p>
            <button onClick={() => setViewItem(null)} style={styles.closeButton}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  container: { display: "flex", justifyContent: "space-between", padding: "20px",backgroundColor: "#e8c897"  },
  formContainer: { width: "40%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
  listContainer: { width: "55%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
  input: { width: "100%", padding: "8px", marginBottom: "10px" },
  textarea: { width: "100%", padding: "8px", height: "60px", marginBottom: "10px" },
  button: { padding: "10px", backgroundColor: "#28a745", color: "white", cursor: "pointer" },
  editButton: { margin: "5px", cursor: "pointer" },
  viewButton: { margin: "5px", cursor: "pointer" },
  deleteButton: { margin: "5px", cursor: "pointer" },
  searchInput: { marginBottom: "10px", padding: "5px", width: "100%" },
  sortButton: { margin: "5px", cursor: "pointer" },
  viewModal: { position: "fixed", background: "#fff", padding: "20px", border: "1px solid #000" },
  closeButton: { marginTop: "10px", cursor: "pointer" },
};

export default PostalReceive;
