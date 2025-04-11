import React, { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrintIcon from '@mui/icons-material/Print';
import GetAppIcon from '@mui/icons-material/GetApp';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

const Sections = () => {
    // State for form inputs
    const [sectionName, setSectionName] = useState('');

    // State for search
    const [searchQuery, setSearchQuery] = useState('');

    // State for sections list
    const [sections, setSections] = useState([
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
    ]);

    // State for editing
    const [editId, setEditId] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sectionName) return;

        if (editId) {
            // Update existing section
            setSections(
                sections.map((section) =>
                    section.id === editId ? { ...section, name: sectionName } : section
                )
            );
            setEditId(null);
        } else {
            // Add new section
            const newSection = {
                id: sections.length + 1,
                name: sectionName,
            };
            setSections([...sections, newSection]);
        }

        // Reset form
        setSectionName('');
    };

    // Handle edit
    const handleEdit = (section) => {
        setEditId(section.id);
        setSectionName(section.name);
    };

    // Handle delete
    const handleDelete = (id) => {
        setSections(sections.filter((section) => section.id !== id));
    };

    // Filter sections based on search query
    const filteredSections = sections.filter((section) =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
            {/* Add Section Form */}
            <Box
                sx={{
                    width: '30%',
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    background:'#ffffff'
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Add Section
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Section Name"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#1a2526',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#2c3e50' },
                        }}
                    >
                        Save
                    </Button>
                </form>
            </Box>

            {/* Section List */}
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Section List
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
                        sx={{ width: '200px' }}
                    />
                    <Box>
                        <IconButton sx={{ '&:hover': { color: '#1976d2' } }}>
                            <FileCopyIcon />
                        </IconButton>
                        <IconButton sx={{ '&:hover': { color: '#1976d2' } }}>
                            <PrintIcon />
                        </IconButton>
                        <IconButton sx={{ '&:hover': { color: '#1976d2' } }}>
                            <GetAppIcon />
                        </IconButton>
                        <IconButton sx={{ '&:hover': { color: '#1976d2' } }}>
                            <ViewColumnIcon />
                        </IconButton>
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
                                <TableRow key={section.id}>
                                    <TableCell>{section.name}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(section)}
                                            sx={{ color: '#1976d2', '&:hover': { color: '#1565c0' } }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(section.id)}
                                            sx={{ color: '#d32f2f', '&:hover': { color: '#b71c1c' } }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>
                        Records: 1 to {filteredSections.length} of {sections.length}
                    </Typography>
                    <Box>
                        <Button variant="outlined" sx={{ mr: 1 }} disabled>
                            Previous
                        </Button>
                        <Button variant="contained">1</Button>
                        <Button variant="outlined" sx={{ ml: 1 }} disabled>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Sections;