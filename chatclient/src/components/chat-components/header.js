import React from 'react'
import { Grid, TextField, InputAdornment, Avatar, Badge, Typography } from '@material-ui/core'
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
    text: {
      marginRight: '10px',
        '@media (max-width: 306px)':{
            display:'none',
        },
    },
    textLogo: {
        '@media (max-width: 280px)':{
            fontSize: '13px'
        },
    },
    icon: {
        fontSize: '50px',
        '@media (max-width: 280px)':{
            fontSize: '30px'
        },
    }
  }));

export default function Header() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>

                {/* Logo */}
                <Grid item xl={2} lg={2} md={3} sm={3} xs={6}
                style={{display: 'flex', justifyContent: 'flex-start', paddingLeft: 15, alignItems: 'center'}}>
                    <MessageTwoToneIcon className={classes.icon} />
                    <Typography className={classes.textLogo}>ChatApp</Typography>
                </Grid>

                {/* Search Box */}
                {/* <Grid item xl={2} lg={2} md={3} sm={4} xs={5}
                
                >
                <TextField
                    label="Search"
                    fullWidth
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                />
                </Grid> */}

                {/* Profile */}
                <Grid item xl={10} lg={10} md={9} sm={9} xs={6}
                style={{display: 'flex'}}
                >
                    <Grid alignItems="center" justify="flex-end" container>
                        <Avatar alt="Bryan" src="/static/images/avatar/2.jpg" style={{marginRight: 10}} />
                        <Typography className={classes.text}>User</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
