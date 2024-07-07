import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
});

function Login() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection='column'
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box paddingBottom='150px'>
          <Box display='flex' justifyContent="center" alignItems='center'>
            <Typography variant="h1" gutterBottom={true} textAlign={true}>
              Git-Planner
            </Typography>
          </Box>
          <Box display='flex' justifyContent="center" alignItems='center' paddingY={1}>
            {!loading ? <Button variant="contained" href={`${import.meta.env.VITE_SERVER_URL}/user/login/github`}
              sx={{ backgroundColor: '#24292f', '&:hover': { backgroundColor: '#000000' } }} size='large'
              onClick={() => setLoading(true)}>
              Sign in with Github <GitHubIcon style={{ marginLeft: 8 }} />
            </Button> : <CircularProgress sx={{ py: 0.75, color: 'text.secondary' }} disableShrink size={30} />}
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  )
}

export default Login