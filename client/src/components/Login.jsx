import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';

function Login() {
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
          <Box display='flex' justifyContent="center" alignItems='center'>
          <Button variant="contained" disableElevation href='http://localhost:3000/login/github'>
            Sign in with Github <GitHubIcon style={{ marginLeft: 8 }} />
          </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login