import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import HeaderComponent from './header'
import SideNav from './SideNav/Contacts'
import ChatBox from './Chatbox/Chatbox'
import { socket } from '../socket/socket.js'
import axios from 'axios'
const useStyles = makeStyles(theme => ({}));

export default function Chat(props) {
    const classes = useStyles()
    const [active, setActive] = useState([])
    const [load, setLoad] = useState([false])
    const [backdropOpen, setbackdropOpen] = React.useState(false);

    const onLogout = () => {
        setbackdropOpen(true)
        setTimeout(() => {
            
            axios.patch(`/api/status/${localStorage.getItem('id')}`, {
                status: 'offline'
            })
            setbackdropOpen(true)
            socket.emit('logout', ({user: localStorage.getItem('username')}))
            localStorage.clear();
            props.history.push('/')
        }, 2000);
    }

    useEffect(() => {
        setLoad(true)
        axios.get(`/api/getUsers`)
        .then(res => {
            setActive([...res.data])
        })
        setLoad(false)
    }, [load, props.history])

    useEffect(() => {
        socket.on('active', data =>{
            setActive([{...data}])
            setLoad(true)
        })
    }, [load, props.history])

    console.log(active)
    return (
        <div>
            <Grid container style={{border: 'solid 2px #999', padding: 5, background: '#1580F4'}}>
                <Grid xl={12} lg={12} md={12} sm={12} xs={12}
                item>
                <HeaderComponent history={props.history} onLogout={onLogout} backdropOpen={backdropOpen} />
                </Grid>
            </Grid>
            <Grid container style={{border: 'solid 1px', padding: 5}}
            className={classes.reverse}
            >
                <Grid xl={2} lg={3} md={3} sm={5} xs={12}
                style={{border: 'solid 1px'}}
                item>
                    <SideNav active={active} />
                </Grid>
                <Grid xl={10} lg={9} md={9} sm={7} xs={12}
                style={{border: 'solid 1px', backgroundColor: 'whitesmoke', padding: 20}}
                item>
                    <ChatBox history={props.history} />
                </Grid>
            </Grid>
        </div>
    )
}
