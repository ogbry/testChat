import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import HeaderComponent from './header'
import SideNav from './SideNav/Contacts'
import ChatBox from './Chatbox/Chatbox'

const useStyles = makeStyles(theme => ({}));

export default function Chat() {
    const classes = useStyles()


    return (
        <div>
            <Grid container style={{border: 'solid 2px #999', padding: 5, }}>
                <Grid xl={12} lg={12} md={12} sm={12} xs={12}
                item>
                <HeaderComponent />
                </Grid>
            </Grid>
            <Grid container style={{border: 'solid 1px', padding: 5}}
            className={classes.reverse}
            >
                <Grid xl={2} lg={3} md={3} sm={5} xs={12}
                style={{border: 'solid 1px'}}
                item>
                    <SideNav />
                </Grid>
                <Grid xl={10} lg={9} md={9} sm={7} xs={12}
                style={{border: 'solid 1px', backgroundColor: 'whitesmoke', padding: 20}}
                item>
                    <ChatBox />
                </Grid>
            </Grid>
        </div>
    )
}
