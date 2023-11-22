import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button'
import { logout } from '../../services/users';

function ProfileIcon({ logoutCallback, credentials }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2.5, mt: 1.5 }}>
          <Avatar src={credentials.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box paddingX='20px' paddingY='10px' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h6' noWrap padding='0' color='text.primary' sx={{ mb: 0.2 }}>{credentials.name}</Typography>
          <Link href={'#'} onClick={(evt) => {
            evt.preventDefault()
            window.open(credentials.link)
          }} color='text.secondary' noWrap>
            {credentials.username}<OpenInNewIcon fontSize='small' sx={{ p: 0, m: 0, pt: 1, textDecoration: 'underline' }} />
          </Link>
          <Button variant="contained" onClick={async () => {
            await logout()
            logoutCallback(null)
          }
          } color="error" sx={{ mt: 2, mb: 0.5 }}>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
export default ProfileIcon;