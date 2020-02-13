import React, { useState, useEffect} from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
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
    const [load, setload] = useState(false)
    const [typingName, setTypingName] = useState('')
    

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
                socket.on("chat", data => {
                    setTypingName('')
                    chatArray.push( [{id: undefined, userId: data.userId, name: data.name, content: data.content}] , chatArray);
                    setload(true)
                });
            })
            setload(false)
    }

    useEffect(() => {
        getChats()
        return () => {
          socket.emit("disconnect");
          socket.off();
        };
      }, [load]);

    useEffect(() => {
        socket.on('typing', name => {
            setTypingName(name.name)
          })
          socket.on('not typing', val => {
            setTypingName('')
          })
    }, [load])

      const textAreaHandler = (e) => {
          let newCount = e.target.maxLength - e.target.value.length
          setChar(newCount)
          
          if(e.target.value.length <= 0){
            setButtonDisabled(true)
            setTextValue('')
            const val = ''
            socket.emit('not typing', val)
          }
          else{
            setTextValue(e.target.value)
            setButtonDisabled(false)
            socket.emit('typing', ({name: localStorage.getItem('username')}))
          }
      }

      const onSend = (e) => {
            e.preventDefault()
            setTextValue('')
            setChar(50)
            setButtonDisabled(true)
            axios.post(`/api/message/${localStorage.getItem('id')}`, {
                name: localStorage.getItem('username'),
                content: textValue
            })
            .then(res => {
                socket.emit('chat', {userId: parseInt(localStorage.getItem('id')), name: res.data.name, content: textValue})
            })
            axios.get(`/api/getMessages`)
            .then(res => {
                if(res.data.length > 20){
                    axios.delete(`/api/deleteMessages/${res.data[0].id}`)
                    .then(x => {
                        console.log("Deleting old messages")
                    })
                }
            })
            
    }
    const classes = useStyles(); 
    return (
        
    <div style={{height: '780px', width: '100%'}}> 
            <Grid container style={{border: 'solid 1px', borderRadius: '15px', width: '98%', margin: '0 auto', height: '660px'}}
            >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{height: '640px', overflow: 'auto'}}  
                >
                    
                    <MessagesComponent chatArray={chatArray} />
                    
                </Grid>
                
                {
                    typingName.length > 0 ? 
                    <span style={{marginLeft: 15, fontStyle: 'italic', fontSize: '12px'}}> {typingName} is typing...</span>
                    
                    : 
                    
                    null
                }

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
