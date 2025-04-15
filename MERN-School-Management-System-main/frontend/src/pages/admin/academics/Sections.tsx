import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    InputAdornment,
} from '@mui/material';
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FileCopy as FileCopyIcon,
    Print as PrintIcon,
    GetApp as GetAppIcon,
    ViewColumn as ViewColumnIcon,
} from '@mui/icons-material';

const Sections = () => {
    const [sectionName, setSectionName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sections, setSections] = useState([]);
    const [editId, setEditId] = useState(null);

    // Fetch all sections from backend
    const fetchSections = async () => {
        try {
            const res = await axios.get('/api/SectionList'); // adjust if base URL is set
            setSections(res.data);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sectionName) return;

        try {
            if (editId) {
                // Update section
                await axios.put(`/api/section/${editId}`, { name: sectionName });
            } else {
                // Create new section
                await axios.post('/api/SectionCreate', { name: sectionName });
            }
            fetchSections();
            setSectionName('');
            setEditId(null);
        } catch (error) {
            console.error('Error saving section:', error);
        }
    };

    const handleEdit = (section) => {
        setEditId(section._id);
        setSectionName(section.name);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/section/${id}`);
            fetchSections();
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    const filteredSections = sections.filter((section) =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
            {/* Add Section Form */}
            <Box sx={{ width: '30%', p: 3, border: '1px solid #e0e0e0', borderRadius: 2, boxShadow: 1, background: '#fff' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Add Section</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Section Name"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#1a2526', '&:hover': { backgroundColor: '#2c3e50' } }}>
                        Save
                    </Button>
                </form>
            </Box>

            {/* Section List */}
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Section List</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <TextField
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                        }}
                        sx={{ width: '200px' }}
                    />
                    <Box>
                        <IconButton><FileCopyIcon /></IconButton>
                        <IconButton><PrintIcon /></IconButton>
                        <IconButton><GetAppIcon /></IconButton>
                        <IconButton><ViewColumnIcon /></IconButton>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Section</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSections.map((section) => (
                                <TableRow key={section._id}>
                                    <TableCell>{section.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(section)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDelete(section._id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Records: 1 to {filteredSections.length} of {sections.length}</Typography>
                    <Box>
                        <Button variant="outlined" disabled>Previous</Button>
                        <Button variant="contained">1</Button>
                        <Button variant="outlined" disabled>Next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Sections;
