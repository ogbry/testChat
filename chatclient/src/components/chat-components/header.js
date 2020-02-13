import React from 'react'
import { Grid, Typography, Menu, MenuItem } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../common-components/loading';
import { Avatar } from 'antd'
import {socket} from '../socket/socket.js'
import axios from 'axios'
const useStyles = makeStyles(theme => ({
    text: {
      marginRight: '10px',
      color: '#FFF',
        '@media (max-width: 306px)':{
            display:'none',
        },
    },
    textLogo: {
        color: '#FFF',
        marginLeft: 5, 
        letterSpacing: 5,
        '@media (max-width: 280px)':{
            fontSize: '13px'
        },
    },
    icon: {
        fontSize: '50px',
        color: '#FFF',
        '@media (max-width: 280px)':{
            fontSize: '30px'
        },
    }
  }));

export default function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const trimUser = (word) => {
        return word.charAt(0).toUpperCase()
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>

                {/* Logo */}
                <Grid item xl={2} lg={2} md={3} sm={3} xs={6}
                style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: 15, alignItems: 'center'}}>
                    <ChatIcon className={classes.icon} />
                    <Typography className={classes.textLogo}>ChatApp</Typography>
                </Grid>

                {/* Profile */}
                <Grid item xl={10} lg={10} md={9} sm={9} xs={6}
                style={{display: 'flex'}}
                >
                    <Grid alignItems="center" justify="flex-end" container>
                    
                        <Typography className={classes.text}>{localStorage.getItem('username') ? localStorage.getItem('username').toUpperCase() : null}</Typography>
                        <Avatar onClick={handleClick} style={{marginRight: 10}}>
                            {localStorage.getItem('username') ? trimUser(localStorage.getItem('username')).toUpperCase() : null}
                        </Avatar>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={props.onLogout}>Logout</MenuItem>
                    </Menu>
                    </Grid>
                </Grid>
                <Loading backdropOpen={props.backdropOpen}/>
            </Grid>
        </React.Fragment>
    )
}