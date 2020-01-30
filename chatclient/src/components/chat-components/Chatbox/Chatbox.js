import React, { Component } from 'react'
import { Grid, Avatar, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const styles = {
	text: {
        textAlign: 'right',
        border: 'solid 2px #999',
        borderRadius: '20px 20px 0px 20px',
        fontSize: '19px',
        padding: 10,
        backgroundColor: '#F1F1F1',
        wordBreak: 'break-word',
        '@media (max-width:950px)': {
            fontSize: '15px'
        },
    },
    senderText: {
        textAlign: 'left',
        borderRadius: '20px 20px 20px 0px',
        fontSize: '19px',
        padding: 10,
        backgroundColor: '#1580F4',
        color: 'white',
        wordBreak: 'break-word',
        '@media (max-width:950px)': {
            fontSize: '15px'
        },
    },
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
    textArea: {
        resize: 'none', 
        width: '97%', 
        fontSize: '17px', 
        borderRadius: '20px', 
        outline: 'none', 
        padding: 10,
        '@media (max-width:950px)': {
            fontSize: '15px'
        },
        '@media (max-width:400px)': {
            fontSize: '12px'
        },
    }
}

const mock = [
    { "id": 1, "userId": 2, "name":"Bry", "message": "Sample shit about life Sample shit about life Sample shit about life" },
    { "id": 2, "userId": 3, "name":"Men", "message": "Sample shit about life Sample shit about life" },
    { "id": 3, "userId": 3, "name":"Rej", "message": "Sample shit about life Sample shit about life Sample shit about life Sample shit about life Sample shit about life" },
    { "id": 4, "userId": 3, "name":"Dan", "message": "Sample " },
    { "id": 5, "userId": 3, "name":"Jude", "message": "Sample shit about life Sample shit about life" },
    { "id": 6, "userId": 2, "name":"Bry", "message": "Sample shit about life Sample shit about life Sample shit about life" },
    { "id": 7, "userId": 3, "name":"Noun", "message": "Sample shit about life" },
    { "id": 8, "userId": 3, "name":"Nayvs", "message": "Sample shit about life" },
    { "id": 9, "userId": 2, "name":"Bry", "message": "Sample shit about life Sample shit about life Sample shit about life" },
    { "id": 10, "userId": 3, "name":"Nor", "message": "Sample shit about life Sample shit about life" },
] 


class Chatbox extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const {classes} = this.props
        
        return (
            <div style={{height: '780px', width: '100%'}}> 
                <Grid container style={{border: 'solid 1px', borderRadius: '15px', width: '98%', margin: '0 auto'}}
                >
                    <Grid item xl={12} lg={12} md={12} style={{height: '680px', overflow: 'auto'}}  
                    
                    >
                        <Grid container direction="column" >
                            {
                                mock.map((element, index) => {
                                    return <div key={index} ref={(el) => { this.messagesEnd = el; }}>
                                        {
                                            element.userId !== 2 ? 
                                            <Grid style={{display: 'flex', alignItems: 'center'}}
                                            xl={12} lg={12}
                                            item>
                                                <Grid container alignItems="center" justify="flex-end" style={{padding: 5}}>
                                                    <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-end'}}
                                                    xl={5} lg={5} md={6} sm={7} xs={8}
                                                    item>
                                                        <span className={classes.text}>
                                                            {element.message}
                                                        </span>
                                                    </Grid>

                                                    <Grid style={{ height: '80px', display: 'flex', alignItems: 'flex-end'}}
                                                    item>
                                                        <Avatar alt={element.name} src="/static/images/avatar/1.jpg" />
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                            :

                                            <Grid container alignItems="center" justify="flex-start" style={{padding: 5}}>

                                                <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-start'}}

                                                item>
                                                    <Avatar alt={element.name} src="/static/images/avatar/1.jpg" />
                                                </Grid>

                                                <Grid style={{ display: 'flex', alignItems: 'flex-end'}}
                                                xl={5} lg={5} md={6} sm={7} xs={8}
                                                item>
                                                    <span className={classes.senderText}>
                                                        {element.message} 
                                                    </span>
                                                    
                                                </Grid>

                                            </Grid>
                                        }
                                    </div>
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container style={{}}>
                        <Grid item style={{}}
                        xl={12} lg={12} md={12} sm={12} xs={12}
                        >
                            <Grid container>
                                <Grid item style={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}
                                lg={11} md={10} sm={9} xs={9}
                                >
                                    <textarea rows="2" autoFocus className={classes.textArea} placeholder="Type your message...">
                                        
                                    </textarea>
                                </Grid>

                                <Grid item style={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3}}
                                lg={1} md={2} sm={3} xs={3}
                                >
                                    <Button style={{height: '50px'}}
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
                            
                        </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Chatbox)