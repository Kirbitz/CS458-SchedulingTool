const React = require('react')
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material'
import { Button } from '@mui/material';
import { Paper } from '@mui/material'; 
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';

export default function Login (props) {
  return (

    // <div style= {{padding:30}}>
    <React.Fragment>
      <Paper>
      <Typography variant ="h1" component = "h2" align = 'center'>
        Login Form
      </Typography>
      <Grid container spacing={3} direction={'column'} justify={'center'} alignItems={'center'} >
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <TextField id="filled-basic" label="UserName" variant="filled" />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <TextField id="filled-basic" label="Password" type='password' variant="filled" />
        </Grid>
      </Grid>
  
      <Grid container spacing={3} direction={'column'} justify={'center'} alignItems={'center'} item xs={6}>
        <Button variant="contained"> Log-In </Button>
      </Grid>
      
      </Paper>
      <body background="https://theohiostar.com/wp-content/uploads/2019/09/UW-Stout_840x480.jpg" alt="Uw-Stout" />
      {/* <Box sx={{display:'flex-box', justifyContent: 'center', flexDirection: 'column', m: 6, width: 300}}>
        <TextField id="filled-basic" label="UserName" variant="filled" />
      </Box>
      <Box display='flex-box' justifyContent="center" sx={{flexDirection: 'column', m: 6, width:300}}>
        <TextField id="filled-basic" label="Password" type='password' variant="filled" />
      </Box> */}
      
    </React.Fragment>
      
      // <form action="/action_page.php" method="post">
      //   <div className="imgcontainer">
      //   </div>
      //   <div className="container">
      //     <label htmlFor="uname"><b>Username</b></label>
      //    <input type="text" placeholder="Enter Username" name="uname" required />
      //     <label htmlFor="psw"><b>Password</b></label>
      //     <input type="password" placeholder="Enter Password" name="psw" required />
      //     <button type="submit">Login</button>
      //     <label>
      //       {/* <input type="checkbox" checked="checked" name="remember"> Remember me </input> */}
      //       <input type="checkbox" defaultChecked="checked" name="remember"/>
      //     </label>
      //     <label>
      //       <a href="#"> Forgot your password?</a>
      //     </label>
      //   </div>
      // </form>
    // </div>
  )
}