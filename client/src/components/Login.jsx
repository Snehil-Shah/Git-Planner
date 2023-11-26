import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

function Login() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Box
        display="flex"
        flexDirection='column'
        justifyContent="center"
        alignItems="center"
        height="100vh"
        overflow='hidden'
      >
        <Box paddingBottom='150px'>
          <Box display='flex' justifyContent="center" alignItems='center'>
          <Typography variant="h1" gutterBottom={true} textAlign={true}>
            Git-Planner
          </Typography>
          </Box>
          <Box display='flex' justifyContent="center" alignItems='center' paddingY={1}>
          {!loading? <Button variant="contained" href='http://localhost:3000/user/login/github'
          sx={{backgroundColor:'#24292f','&:hover': {backgroundColor: '#000000'}}} size='large'
          onClick={()=>setLoading(true)}>
            Sign in with Github <GitHubIcon style={{ marginLeft: 8 }} />
          </Button> : <CircularProgress sx={{py:0.7,color: 'text.secondary' }} disableShrink size={30} />}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login