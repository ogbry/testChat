import React, { useState, useEffect} from 'react'
import { Grid, Avatar, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import MessagesComponent from './messages.js'
import { socket } from '../../socket/socket.js'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    buttonLabel: {
        '@media (max-width: 687px)': {
            display: 'none'
        },
    },
    button: {
        background: '#1580F4',
        "&:hover": {
            background: "#1580F4",
            cursor: 'pointer',
          },
        '@media (max-width:462px)': {
            width: '20px',
            padding: 0
        },
    },
  }));

export default function Chatbox(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [textValue, setTextValue] = useState('')
    const [char, setChar] = useState(50)
    const [chatArray, setChatArray] = useState([])

    useEffect(() => {
        if(localStorage.getItem('tokenAccess') != null){
            props.history.push('/chat')
        }
        else{
            props.history.push('/')
        }
      }, []);

      const getChats = () => {
        axios.get(`/api/getMessages`)
            .then(res => {
                setChatArray([...res.data])
            })
      }

    useEffect(() => {
        // socket.on("chat", data => {
        //     setChatArray( [{id: undefined, userId: data.userId, content: data.content}] , chatArray);
        // });
        
        getChats()
        return () => {
          socket.emit("disconnect");
          socket.off();
        };
      }, [chatArray]);

      const textAreaHandler = (e) => {
          let newCount = e.target.maxLength - e.target.value.length
          setChar(newCount)
          setTextValue(e.target.value)
          e.target.value.length <= 0 ? setButtonDisabled(true) : setButtonDisabled(false)
      }

      const onSend = (e) => {
            e.preventDefault()
            setTextValue('')
            setChar(50)
            setButtonDisabled(true)
            axios.post(`/api/message/${localStorage.getItem('id')}`, {
                content: textValue
            })
            .then(res => {
                socket.emit('chat', {userId: parseInt(localStorage.getItem('id')), content: textValue})
            })
            
    }
      const classes = useStyles();  
    return (
        
    <div style={{height: '780px', width: '100%'}}> 
            <Grid container style={{border: 'solid 1px', borderRadius: '15px', width: '98%', margin: '0 auto'}}
            >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{height: '680px', overflow: 'auto'}}  
                >
                    
                    
                        <MessagesComponent chatArray={chatArray} />
                    
                    
                </Grid>
            </Grid>
            <Grid container style={{}}>
                    <Grid item style={{}}
                        xl={12} lg={12} md={12} sm={12} xs={12}
                    >
                        <form onSubmit={(e)=> onSend(e)}>
                        <Grid container>
                            <Grid item style={{height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                            lg={11} md={10} sm={8} xs={9}
                            >
                                <span style={{fontSize: '11px', color: "#999", marginLeft: 10}}>Characters remaining: {char}</span>
                                <TextField
                                placeholder="Type your message..."
                                onChange={(e) => textAreaHandler(e)}
                                value={textValue}
                                inputProps={{
                                    maxLength: 50,
                                    }}
                                autoFocus
                                fullWidth
                                variant="outlined"
                                />
                            </Grid>

                            <Grid item style={{height: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: 3}}
                            lg={1} md={2} sm={4} xs={3}
                            >
                                <Button style={{height: '70px'}}
                                    
                                fullWidth
                                    type="submit"
                                    disabled={buttonDisabled}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SendIcon/>}
                                >
                                    <label className={classes.buttonLabel}>SEND</label>
                                </Button>
                                    
                            </Grid>
                        </Grid>
                        </form>
                            
                    </Grid>
            </Grid>
        </div>
    )
}
