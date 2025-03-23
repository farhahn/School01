import React, { useState } from "react";

const PostalDispatch = () => {
  const [formData, setFormData] = useState({
    toTitle: "",
    referenceNo: "",
    fromTitle: "",
    date: "",
    document: null,
  });

  const [dispatchList, setDispatchList] = useState([
    { id: 1, toTitle: "NCC Camp", referenceNo: "456452", fromTitle: "NCC Camp", date: "2025-03-31", document: null },
    { id: 2, toTitle: "CBSE Syllabus", referenceNo: "42342", fromTitle: "CBSE", date: "2025-03-20", document: null },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleChange = (e) => {
    if (e.target.name === "document") {
      setFormData({ ...formData, document: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (editId) {
      setDispatchList(
        dispatchList.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
      setEditId(null);
    } else {
      setDispatchList([...dispatchList, { id: Date.now(), ...formData }]);
    }
    setFormData({ toTitle: "", referenceNo: "", fromTitle: "", date: "", document: null });
  };

  const handleEdit = (id) => {
    const record = dispatchList.find((item) => item.id === id);
    setFormData(record);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setDispatchList(dispatchList.filter((item) => item.id !== id));
  };

  const filteredList = dispatchList
    .filter((item) =>
      item.toTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h3>Add Postal Dispatch</h3>
        <input type="text" name="toTitle" placeholder="To Title" value={formData.toTitle} onChange={handleChange} style={styles.input} />
        <input type="text" name="referenceNo" placeholder="Reference No" value={formData.referenceNo} onChange={handleChange} style={styles.input} />
        <input type="text" name="fromTitle" placeholder="From Title" value={formData.fromTitle} onChange={handleChange} style={styles.input} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} />
        <input type="file" name="document" onChange={handleChange} style={styles.input} />
        <button onClick={handleSave} style={styles.saveButton}>{editId ? "Update" : "Save"}</button>
      </div>

      <div style={styles.listContainer}>
        <h3>Postal Dispatch List</h3>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.search} />
        
        <div style={styles.sortOptions}>
          <label>Sort by:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.select}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>To Title</th>
              <th>Reference No</th>
              <th>From Title</th>
              <th>Date</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => (
              <tr key={item.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>{item.toTitle}</td>
                <td>{item.referenceNo}</td>
                <td>{item.fromTitle}</td>
                <td>{item.date}</td>
                <td>
                  {item.document ? <a href={URL.createObjectURL(item.document)} target="_blank" rel="noopener noreferrer">📂 View</a> : "No File"}
                </td>
                <td>
                  <button onClick={() => handleEdit(item.id)} style={styles.editButton}>✏️ Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", padding: "20px", gap: "20px",backgroundColor: "#e8c897"   },
  formContainer: { width: "30%", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" },
  listContainer: { width: "70%", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#ffffff" },
  input: { width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" },
  saveButton: { width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  search: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  sortOptions: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  select: { padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
  table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" },
  rowEven: { backgroundColor: "#f2f2f2" },
  rowOdd: { backgroundColor: "#f2f2f2" },
  editButton: { margin: "2px", padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: "#ffc107", color: "white", borderRadius: "5px" },
  deleteButton: { margin: "2px", padding: "5px 10px", cursor: "pointer", border: "none", backgroundColor: "#dc3545", color: "white", borderRadius: "5px" },
};

export default PostalDispatch;
