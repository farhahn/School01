import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse, List } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/PersonAdd';
import { ExpandLess, ExpandMore, SupervisorAccountOutlined as LibrarianIcon } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';


const SideBar = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState({ Fees: false }); // Initialize with Fees key

    const handleToggle = (menu) => {
        setOpen((prev) => ({
            ...prev,
            [menu]: !prev[menu], // Toggle specific menu
        }));
    };
    const sidebarStyle = {
        height: '100vh',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #E8C897', // Dark gray thumb, light gold track
        backgroundColor: '#c8adf7', // Light gold background
        color: 'black', // Optional: Adjust text color for better readability
    };
    
    return (
        
        <List style={sidebarStyle}>
        
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon color={location.pathname === "/" ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            {/* Classes */}
            <ListItemButton onClick={() => handleToggle('classes')}>
                <ListItemIcon>
                    <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Front Office" />
                {open.classes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.classes} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/Admin/frontoffice/admissionenquiry" sx={{ pl: 4 }}>
                        <ListItemText primary="Addmission Enquiry" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/visitorlist" sx={{ pl: 4 }}>
                        <ListItemText primary="VisitorList" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/phone" sx={{ pl: 4 }}>
                        <ListItemText primary="Phone Call Log" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/postaldispatch" sx={{ pl: 4 }}>
                        <ListItemText primary="PostalDispatch" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/postalreceive" sx={{ pl: 4 }}>
                        <ListItemText primary="PostalReceive" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/complaintpage" sx={{ pl: 4 }}>
                        <ListItemText primary="ComplaintPage" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/frontoffice/frontoffice" sx={{ pl: 4 }}>
                        <ListItemText primary="FrontOffice" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Subjects */}
            <ListItemButton onClick={() => handleToggle('Fees')}>
    <ListItemIcon>
        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
    </ListItemIcon>
    <ListItemText primary="Fees Collection" />
    {open.Fees ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>

<Collapse in={open.Fees} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        <ListItemButton component={Link} to="/Admin/feerelated/collectfeepage" sx={{ pl: 4 }}>
            <ListItemText primary="Collect Fees" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/offlinepayments" sx={{ pl: 4 }}>
            <ListItemText primary="Offline Payment" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/searchfeespayment" sx={{ pl: 4 }}>
            <ListItemText primary="Search Fee" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/searchduesfees" sx={{ pl: 4 }}>
            <ListItemText primary="SearchDuesFees" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/feesmaster" sx={{ pl: 4 }}>
            <ListItemText primary="FeesMaster" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/quickfeesmaster" sx={{ pl: 4 }}>
            <ListItemText primary="QuickFeesMaster" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/addfeesgroup" sx={{ pl: 4 }}>
            <ListItemText primary="AddFeesGroup" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/feestypemanager" sx={{ pl: 4 }}>
            <ListItemText primary="FeesTypeManager" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/feesdiscountmanager" sx={{ pl: 4 }}>
            <ListItemText primary="FeesDiscountManager" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/feesCarryForward" sx={{ pl: 4 }}>
            <ListItemText primary="FeesCarryForward" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/feerelated/fessreminder" sx={{ pl: 4 }}>
            <ListItemText primary="FessReminder" />
        </ListItemButton>
    </List>
</Collapse>
            {/* Teachers */}
            <ListItemButton onClick={() => handleToggle('teachers')}>
                <ListItemIcon>
                    <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
                {open.teachers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.teachers} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/Admin/teachers/add" sx={{ pl: 4 }}>
                        <ListItemText primary="Add Teacher" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/teachers/manage" sx={{ pl: 4 }}>
                        <ListItemText primary="Manage Teachers" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* Students */}
            <ListItemButton onClick={() => handleToggle('students')}>
                <ListItemIcon>
                    <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Students" />
                {open.students ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.students} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/Admin/students/branches" sx={{ pl: 4 }}>
                        <ListItemText primary="Branches" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/studentdetail" sx={{ pl: 4 }}>
                        <ListItemText primary="Student Details" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/studentadmissionform" sx={{ pl: 4 }}>
                        <ListItemText primary=" Admission" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/studentdetail" sx={{ pl: 4 }}>
                        <ListItemText primary="Disabled Students" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/studentsearch" sx={{ pl: 4 }}>
                        <ListItemText primary="Multiple Class Student" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/bulkdeletestudents" sx={{ pl: 4 }}>
                        <ListItemText primary="Bulk Delete" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/categorymanager" sx={{ pl: 4 }}>
                        <ListItemText primary="Student Categories" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/housestudent" sx={{ pl: 4 }}>
                        <ListItemText primary="Student House" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/studentall/disablereason" sx={{ pl: 4 }}>
                        <ListItemText primary="Disable Reason" />
                    </ListItemButton>
                </List>
            </Collapse>
            {/*lib*/}
            <ListItemButton onClick={() => handleToggle('librarian')}>
    <ListItemIcon>
        <LocalLibraryIcon color={location.pathname.startsWith("/Admin/AddLibrarian") ? 'primary' : 'inherit'} />
    </ListItemIcon>
    <ListItemText primary="Librarian" />
    {open.librarian ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
<Collapse in={open.librarian} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        <ListItemButton component={Link} to="/Admin/AddLibrarian" sx={{ pl: 4 }}>
            <ListItemIcon>
                <AddIcon />  {/* Icon for Add Librarian */}
            </ListItemIcon>
            <ListItemText primary="Add Librarian" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/ManageLibrarians" sx={{ pl: 4 }}>
            <ListItemIcon>
                <ManageAccountsIcon />  {/* Icon for Manage Librarian */}
            </ListItemIcon>
            <ListItemText primary="Manage Librarian" />
        </ListItemButton>
    </List>
</Collapse>

   {/*Income*/}

   <ListItemButton onClick={() => handleToggle('income')}>
    <ListItemIcon>
        <AttachMoneyIcon color={open.income ? 'primary' : 'inherit'} />
    </ListItemIcon>
    <ListItemText primary="Income" />
    {open.income ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
<Collapse in={open.income} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        <ListItemButton
            component={Link}
            to="/Admin/AddIncome"
            sx={{
                pl: 4,
                backgroundColor: location.pathname === "/Admin/AddIncome" ? "#E8C897" : "inherit",
                '&:hover': { backgroundColor: "#E8C897" },
            }}
        >
            <ListItemIcon>
                <AddIcon color={location.pathname === "/Admin/AddIncome" ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Add Income" />
        </ListItemButton>

        <ListItemButton
            component={Link}
            to="/Admin/SearchIncome"
            sx={{
                pl: 4,
                backgroundColor: location.pathname === "/Admin/SearchIncome" ? "#E8C897" : "inherit",
                '&:hover': { backgroundColor: "#E8C897" },
            }}
        >
            <ListItemIcon>
                <SearchIcon color={location.pathname === "/Admin/SearchIncome" ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Search Income" />
        </ListItemButton>

        <ListItemButton
            component={Link}
            to="/Admin/IncomeHead"
            sx={{
                pl: 4,
                backgroundColor: location.pathname === "/Admin/IncomeHead" ? "#E8C897" : "inherit",
                '&:hover': { backgroundColor: "#E8C897" },
            }}
        >
            <ListItemIcon>
                <AccountBalanceWalletIcon color={location.pathname === "/Admin/IncomeHead" ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Income Head" />
        </ListItemButton>
    </List>
</Collapse>



            {/* Notices */}
            <ListItemButton component={Link} to="/Admin/notices">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notices" />
            </ListItemButton>

            {/* Complaints */}
            <ListItemButton component={Link} to="/Admin/complains">
                <ListItemIcon>
                    <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Complains" />
            </ListItemButton>

           
            

            <Divider sx={{ my: 1 }} />

            {/* User Section */}
            <ListSubheader component="div" inset>
                User
            </ListSubheader>
            <ListItemButton component={Link} to="/Admin/profile">
                <ListItemIcon>
                    <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton component={Link} to="/logout">
                <ListItemIcon>
                    <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
          
            
        </List>
    );
}

export default SideBar;
