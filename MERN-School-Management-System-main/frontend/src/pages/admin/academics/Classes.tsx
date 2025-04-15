import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, FormControlLabel, Checkbox, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFclasses,
  createFclass,
  updateFclass,
  deleteFclass,
} from '../../../redux/fclass/fclassHandle.js';

const Classes = () => {
  const [className, setClassName] = useState('');
  const [sections, setSections] = useState({ A: false, B: false, C: false, D: false, E: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { fclassesList, loading, error } = useSelector((state) => state.fclass);

  useEffect(() => {
    dispatch(getAllFclasses());
  }, [dispatch]);

  const handleSectionChange = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className) return;
  
    const selectedSections = Object.keys(sections).filter((s) => sections[s]);
  
    const payload = {
      name: className,
      sections: selectedSections,
    };
  
    if (editId) {
      dispatch(updateFclass(editId, payload)).then(() => {
        setEditId(null);
        resetForm();
        dispatch(getAllFclasses()); // Fetch updated data after update
      }).catch(error => console.error(error)); // Handle errors
    } else {
      dispatch(createFclass(payload)).then(() => {
        resetForm();
        dispatch(getAllFclasses()); // Fetch updated data after create
      }).catch(error => console.error(error)); // Handle errors
    }
  };
  

  const resetForm = () => {
    setClassName('');
    setSections({ A: false, B: false, C: false, D: false, E: false });
  };

  const handleEdit = (cls) => {
    setEditId(cls._id);
    setClassName(cls.name);
    const updatedSections = { A: false, B: false, C: false, D: false, E: false };
    cls.sections.forEach((s) => (updatedSections[s] = true));
    setSections(updatedSections);
  };
  const handleDelete = (id) => {
    // Dispatch the delete action
    dispatch(deleteFclass(id)).then(() => {
      // After successful delete, directly update the Redux store
      dispatch({
        type: 'DELETE_FCLASS',
        payload: id,
      });
  
     
    }).catch((error) => {
    
      console.error("Error deleting class:", error);
    });
  };

  const filteredClasses = (fclassesList || []).filter(

    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.sections.some((section) =>
        section.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Box sx={{
      display: 'flex',
      gap: 3,
      p: 3,
      bgcolor: '#f9f9f9',
      minHeight: '100vh',
    }}>
      {/* Form */}
      <Box sx={{
        width: '30%',
        p: 3,
        borderRadius: '12px',
        bgcolor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>
          {editId ? 'Edit Class' : 'Add Class'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography sx={{ mb: 1, fontWeight: 600, color: '#444' }}>Sections *</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {['A', 'B', 'C', 'D', 'E'].map((section) => (
              <FormControlLabel
                key={section}
                control={
                  <Checkbox
                    checked={sections[section]}
                    onChange={() => handleSectionChange(section)}
                    sx={{
                      color: '#1a2526',
                      '&.Mui-checked': { color: '#1a2526' },
                    }}
                  />
                }
                label={section}
              />
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#1a2526',
              '&:hover': { backgroundColor: '#2e3b3d' },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            {editId ? 'Update' : 'Save'}
          </Button>
        </form>
      </Box>

      {/* List */}
      <Box sx={{ width: '70%' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>Class List</Typography>
        <TextField
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, width: '240px', bgcolor: '#fff', borderRadius: '8px' }}
        />

        {loading ? (
          <Typography sx={{ color: '#555' }}>Loading...</Typography>
        ) : error ? (
          <Typography sx={{ color: 'red' }}>{error}</Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ boxShadow: '0 3px 10px rgba(0,0,0,0.06)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#1a2526' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Class</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Sections</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClasses.map((cls, index) => (
                    <TableRow
                      key={cls._id}
                      sx={{
                        bgcolor: index % 2 === 0 ? '#f5f5f5' : '#fff',
                        '&:hover': { backgroundColor: '#eef5f5' },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{cls.name}</TableCell>
                      <TableCell>{cls.sections.join(', ')}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(cls)} sx={{ color: '#1976d2' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(cls._id)} sx={{ color: '#d32f2f' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ mt: 2, color: '#555' }}>Records: {filteredClasses.length}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Classes;
