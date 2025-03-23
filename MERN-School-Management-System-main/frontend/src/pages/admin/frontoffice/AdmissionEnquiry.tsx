import React, { useState } from "react";

const AdmissionEnquiry = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [students, setStudents] = useState([
    { name: "Jason", phone: "890788574", source: "Front Office", className: "1", enquiryDate: "2025-03-18", lastFollowUp: "2025-03-22", nextFollowUp: "2025-03-23", status: "Active" }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "", phone: "", source: "", className: "", enquiryDate: "", lastFollowUp: "", nextFollowUp: "", status: "Active"
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      students[editingIndex] = newStudent;
      setEditingIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    setNewStudent({ name: "", phone: "", source: "", className: "", enquiryDate: "", lastFollowUp: "", nextFollowUp: "", status: "Active" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setNewStudent(students[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handlePhoneInquiry = (phone) => {
    alert(`Calling ${phone}... 📞`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#e8c897", minHeight: "100vh" }}>
    {/* <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#f4f4f9", minHeight: "100vh" }}> */}
      <h2 style={{ textAlign: "center", color: "#333" }}>Admission Enquiry</h2>

      {/* Search Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
        <select>
          <option>Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
        </select>
        <select>
          <option>Front Office</option>
          <option>Advertisement</option>
          <option>Google Ads</option>
          <option>Admission Campaign</option>
        </select>
        <label>
    Enquiry Date:
    <input type="date" name="enquiryDate" />
  </label>
  <label>
    Last Follow-Up Date:
    <input type="date" name="lastFollowUp" />
  </label>
        <select>
          <option>Active</option>
          <option>Passive</option>
          <option>Dead</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
        <button style={{ padding: "5px 10px", background: "#6081f7", color: "white", border: "none", cursor: "pointer" }}>Search</button>
      </div>

      {/* Admission Details */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
        <h3 style={{ color: "#333" }}>Admission Details</h3>
        <button onClick={() => setShowForm(true)} style={{ padding: "8px 12px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>+ Add</button>
      </div>

      {/* Table */}
      <table border="1" width="100%" style={{ background: "white", textAlign: "center", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#007BFF", color: "white" }}>
            <th>Name</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Class</th>
            <th>Enquiry Date</th>
            <th>Last Follow Up</th>
            <th>Next Follow Up</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.source}</td>
              <td>{student.className}</td>
              <td>{student.enquiryDate}</td>
              <td>{student.lastFollowUp}</td>
              <td>{student.nextFollowUp}</td>
              <td>{student.status}</td>
              <td>
                <button onClick={() => handleEdit(index)} style={{ margin: "5px", cursor: "pointer", color: "blue" }}>📝</button>
                <button onClick={() => handleDelete(index)} style={{ margin: "5px", cursor: "pointer", color: "red" }}>❌</button>
                <button onClick={() => handlePhoneInquiry(student.phone)} style={{ margin: "5px", cursor: "pointer", color: "green" }}>📞</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          background: "white", padding: "30px", width: "400px", boxShadow: "0px 0px 15px gray", borderRadius: "10px"
        }}>
          <h3>{editingIndex !== null ? "Edit Student" : "Add Student"}</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" name="name" placeholder="Name" value={newStudent.name} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={newStudent.phone} onChange={handleChange} required />
            <select name="source" value={newStudent.source} onChange={handleChange} required>
              <option value="">Select Source</option>
              <option>Front Office</option>
              <option>Advertisement</option>
              <option>Google Ads</option>
              <option>Admission Campaign</option>
            </select>
            <select name="className" value={newStudent.className} onChange={handleChange} required>
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
            </select>
            
            <label>Enquiry Date</label>
            <input type="date" name="enquiryDate" value={newStudent.enquiryDate} onChange={handleChange} required />
            
            <label>Last Follow Up</label>
            <input type="date" name="lastFollowUp" value={newStudent.lastFollowUp} onChange={handleChange} required />
            
            <label>Next Follow Up</label>
            <input type="date" name="nextFollowUp" value={newStudent.nextFollowUp} onChange={handleChange} required />
            
            <select name="status" value={newStudent.status} onChange={handleChange} required>
              <option>Active</option>
              <option>Passive</option>
              <option>Dead</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button type="submit" style={{ padding: "8px 12px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>Save</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "8px 12px", background: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdmissionEnquiry;
