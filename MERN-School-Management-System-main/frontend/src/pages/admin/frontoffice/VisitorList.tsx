import React, { useState } from "react";

const VisitorList = () => {
  const initialVisitors = [
    {
      id: 1,
      purpose: "School Events",
      meetingWith: "Student (Edward Thomas - 18001)",
      visitorName: "Kalvin",
      phone: "986786784",
      idCard: "4563",
      numOfPerson: 6,
      date: "2025-03-31",
      inTime: "14:08",
      outTime: "15:08",
    },
    {
      id: 2,
      purpose: "Principal Meeting",
      meetingWith: "Staff (James Deckar - 9004)",
      visitorName: "Ayan Desai",
      phone: "08907855",
      idCard: "4563",
      numOfPerson: 5,
      date: "2025-03-25",
      inTime: "15:07",
      outTime: "16:45",
    },
  ];

  const [visitors, setVisitors] = useState(initialVisitors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [newVisitor, setNewVisitor] = useState(null);

  // Delete Visitor
  const deleteVisitor = (id) => {
    setVisitors(visitors.filter((visitor) => visitor.id !== id));
  };

  // View Visitor Details
  const viewVisitor = (visitor) => {
    setSelectedVisitor(visitor);
    setEditingVisitor(null);
    setNewVisitor(null);
  };

  // Edit Visitor
  const editVisitor = (visitor) => {
    setEditingVisitor({ ...visitor });
    setSelectedVisitor(null);
    setNewVisitor(null);
  };

  // Handle Input Change for Edit & Add
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingVisitor) {
      setEditingVisitor((prev) => ({ ...prev, [name]: value }));
    } else if (newVisitor) {
      setNewVisitor((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save Edited Visitor
  const saveEditedVisitor = () => {
    setVisitors(
      visitors.map((visitor) =>
        visitor.id === editingVisitor.id ? editingVisitor : visitor
      )
    );
    setEditingVisitor(null);
  };

  // Add New Visitor
  const addNewVisitor = () => {
    const newId = visitors.length ? visitors[visitors.length - 1].id + 1 : 1;
    setNewVisitor({
      id: newId,
      purpose: "",
      meetingWith: "",
      visitorName: "",
      phone: "",
      idCard: "",
      numOfPerson: 1,
      date: "",
      inTime: "",
      outTime: "",
    });
    setEditingVisitor(null);
    setSelectedVisitor(null);
  };

  // Save New Visitor
  const saveNewVisitor = () => {
    setVisitors([...visitors, newVisitor]);
    setNewVisitor(null);
  };

  // Cancel Actions
  const cancelEdit = () => setEditingVisitor(null);
  const cancelNewVisitor = () => setNewVisitor(null);
  const backToList = () => setSelectedVisitor(null);

  // Search Filter
  const filteredVisitors = visitors.filter((visitor) =>
    visitor.visitorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", backgroundColor: "#e8c897" , padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgb(239, 176, 17)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Visitor List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Visitor Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      {/* Add Visitor Button */}
      <button onClick={addNewVisitor} style={{ padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "10px" }}>
        ➕ Add Visitor
      </button>

      {selectedVisitor ? (
        <div>
          <h3>Visitor Details</h3>
          {Object.entries(selectedVisitor).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}: </strong> {value}
            </p>
          ))}
          <button onClick={backToList} style={{ padding: "8px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>← Back</button>
        </div>
      ) : editingVisitor ? (
        <div>
          <h3>Edit Visitor</h3>
          {Object.keys(editingVisitor).map((key) => (
            <input key={key} type="text" name={key} value={editingVisitor[key]} onChange={handleInputChange} placeholder={key} />
          ))}
          <button onClick={saveEditedVisitor} style={{ backgroundColor: "#28a745", color: "white", padding: "8px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Save</button>
          <button onClick={cancelEdit} style={{ backgroundColor: "#dc3545", color: "white", padding: "8px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
        </div>
      ) : newVisitor ? (
        <div>
          <h3>Add New Visitor</h3>
          {Object.keys(newVisitor).map((key) => (
            <input key={key} type="text" name={key} onChange={handleInputChange} placeholder={key} />
          ))}
          <button onClick={saveNewVisitor} style={{ backgroundColor: "#28a745", color: "white", padding: "8px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Add</button>
          <button onClick={cancelNewVisitor} style={{ backgroundColor: "#dc3545", color: "white", padding: "8px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
        </div>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Visitor Name</th>
              <th>Meeting With</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.visitorName}</td>
                <td>{visitor.meetingWith}</td>
                <td>{visitor.purpose}</td>
                <td>
                  <button onClick={() => viewVisitor(visitor)}>👁 View</button>
                  <button onClick={() => editVisitor(visitor)}>✏ Edit</button>
                  <button onClick={() => deleteVisitor(visitor.id)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorList;
