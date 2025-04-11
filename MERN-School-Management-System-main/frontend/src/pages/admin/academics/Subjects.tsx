import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
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

const Subjects = () => {
    // State for form inputs
    const [subjectName, setSubjectName] = useState('');
    const [subjectType, setSubjectType] = useState('Theory');
    const [subjectCode, setSubjectCode] = useState('');

    // State for search
    const [searchQuery, setSearchQuery] = useState('');

    // State for subjects list
    const [subjects, setSubjects] = useState([
        { id: 1, name: 'English', code: '210', type: 'Theory' },
        { id: 2, name: 'Hindi', code: '230', type: 'Theory' },
        { id: 3, name: 'Mathematics', code: '110', type: 'Practical' },
        { id: 4, name: 'Science', code: '111', type: 'Practical' },
        { id: 5, name: 'Social Studies', code: '212', type: 'Theory' },
        { id: 6, name: 'French', code: '231', type: 'Practical' },
        { id: 7, name: 'Drawing', code: '200', type: 'Practical' },
        { id: 8, name: 'Computer', code: '00220', type: 'Practical' },
        { id: 9, name: 'Elective 1', code: '101', type: 'Theory' },
        { id: 10, name: 'Elective 2', code: '102', type: 'Theory' },
        { id: 11, name: 'Elective 3', code: '103', type: 'Theory' },
    ]);

    // State for editing
    const [editId, setEditId] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subjectName || !subjectCode) return;

        if (editId) {
            // Update existing subject
            setSubjects(subjects.map(subject =>
                subject.id === editId
                    ? { ...subject, name: subjectName, code: subjectCode, type: subjectType }
                    : subject
            ));
            setEditId(null);
        } else {
            // Add new subject
            const newSubject = {
                id: subjects.length + 1,
                name: subjectName,
                code: subjectCode,
                type: subjectType,
            };
            setSubjects([...subjects, newSubject]);
        }

        // Reset form
        setSubjectName('');
        setSubjectCode('');
        setSubjectType('Theory');
    };

    // Handle edit
    const handleEdit = (subject) => {
        setEditId(subject.id);
        setSubjectName(subject.name);
        setSubjectCode(subject.code);
        setSubjectType(subject.type);
    };

    // Handle delete
    const handleDelete = (id) => {
        setSubjects(subjects.filter(subject => subject.id !== id));
    };

    // Filter subjects based on search query
    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
            {/* Add Subject Form */}
            <Box sx={{
                width: '30%',
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff',
            }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Add Subject
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <RadioGroup
                        row
                        value={subjectType}
                        onChange={(e) => setSubjectType(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <FormControlLabel value="Theory" control={<Radio />} label="Theory" />
                        <FormControlLabel value="Practical" control={<Radio />} label="Practical" />
                    </RadioGroup>
                    <TextField
                        label="Subject Code"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
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

            {/* Subject List */}
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Subject List
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
                                <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Subject Code</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Subject Type</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSubjects.map((subject) => (
                                <TableRow key={subject.id}>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>{subject.code}</TableCell>
                                    <TableCell>{subject.type}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(subject)}
                                            sx={{ color: '#1976d2', '&:hover': { color: '#1565c0' } }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDelete(subject.id)}
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
                        Records: 1 to {filteredSubjects.length} of {subjects.length}
                    </Typography>
                    <Box>
                        <Button variant="outlined" sx={{ mr: 1 }} disabled>Previous</Button>
                        <Button variant="contained">1</Button>
                        <Button variant="outlined" sx={{ ml: 1 }} disabled>Next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Subjects;