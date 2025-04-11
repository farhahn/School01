import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
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

const Classes = () => {
    // State for form inputs
    const [className, setClassName] = useState('');
    const [sections, setSections] = useState({
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
    });

    // State for search
    const [searchQuery, setSearchQuery] = useState('');

    // State for classes list
    const [classes, setClasses] = useState([
        { id: 1, name: 'Class 5', sections: ['A', 'B', 'D'] },
        { id: 2, name: 'Class 4', sections: ['A', 'B', 'C', 'D'] },
        { id: 3, name: 'Class 3', sections: ['A', 'B', 'C', 'D'] },
        { id: 4, name: 'Class 2', sections: ['A', 'B', 'C'] },
        { id: 5, name: 'Class 1', sections: ['A', 'B', 'C', 'D'] },
    ]);

    // State for editing
    const [editId, setEditId] = useState(null);

    // Handle section checkbox changes
    const handleSectionChange = (section) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!className) return;

        const selectedSections = Object.keys(sections).filter(
            (section) => sections[section]
        );

        if (editId) {
            // Update existing class
            setClasses(
                classes.map((cls) =>
                    cls.id === editId
                        ? { ...cls, name: className, sections: selectedSections }
                        : cls
                )
            );
            setEditId(null);
        } else {
            // Add new class
            const newClass = {
                id: classes.length + 1,
                name: className,
                sections: selectedSections,
            };
            setClasses([...classes, newClass]);
        }

        // Reset form
        setClassName('');
        setSections({
            A: false,
            B: false,
            C: false,
            D: false,
            E: false,
        });
    };

    // Handle edit
    const handleEdit = (cls) => {
        setEditId(cls.id);
        setClassName(cls.name);
        const updatedSections = { A: false, B: false, C: false, D: false, E: false };
        cls.sections.forEach((section) => {
            updatedSections[section] = true;
        });
        setSections(updatedSections);
    };

    // Handle delete
    const handleDelete = (id) => {
        setClasses(classes.filter((cls) => cls.id !== id));
    };

    // Filter classes based on search query
    const filteredClasses = classes.filter(
        (cls) =>
            cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.sections.some((section) =>
                section.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
            {/* Add Class Form */}
            <Box
                sx={{
                    width: '30%',
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    background:'#ffffff',
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Add Class
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Class"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                        Sections *
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                        {['A', 'B', 'C', 'D', 'E'].map((section) => (
                            <FormControlLabel
                                key={section}
                                control={
                                    <Checkbox
                                        checked={sections[section]}
                                        onChange={() => handleSectionChange(section)}
                                    />
                                }
                                label={section}
                            />
                        ))}
                    </Box>
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

            {/* Class List */}
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Class List
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
                                <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Sections</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredClasses.map((cls) => (
                                <TableRow key={cls.id}>
                                    <TableCell>{cls.name}</TableCell>
                                    <TableCell>{cls.sections.join(', ')}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(cls)}
                                            sx={{ color: '#1976d2', '&:hover': { color: '#1565c0' } }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(cls.id)}
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
                        Records: 1 to {filteredClasses.length} of {classes.length}
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

export default Classes;