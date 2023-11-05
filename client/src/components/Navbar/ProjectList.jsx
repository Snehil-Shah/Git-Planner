import * as React from 'react';
// import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ProjectList({ setCredentials }) {
    const [selectedIndex, setSelectedIndex] = React.useState('65465f231b0d553e2103c6e5');
    React.useEffect(()=>{
        setCredentials(selectedIndex);
    },[selectedIndex, setCredentials])
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    selected={selectedIndex === '65465f231b0d553e2103c6e5'}
                    onClick={(event) => handleListItemClick(event, '65465f231b0d553e2103c6e5')}
                >
                    <ListItemText primary="Fitfolio" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === '65467c498050d65dae59a115'}
                    onClick={(event) => handleListItemClick(event, '65467c498050d65dae59a115')}
                >
                    <ListItemText primary="Movie-System" />
                </ListItemButton>
            </List>
            {/* <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="Trash" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </List> */}
        </>
    );
}