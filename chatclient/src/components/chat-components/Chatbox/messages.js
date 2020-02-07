import React, { useState, useEffect } from 'react'
import { Grid, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ScrollableFeed from 'react-scrollable-feed'
import ReactEmoji from 'react-emoji'
import { Avatar } from 'antd'
import Zoom from '@material-ui/core/Zoom';
const useStyles = makeStyles(theme => ({
    text: {
        textAlign: 'left',
        border: 'solid 2px #999',
        borderRadius: '20px 20px 20px 0px',
        fontSize: '19px',
        padding: 10,
        backgroundColor: '#F1F1F1',
        wordBreak: 'break-word',
        '@media (max-width:950px)': {
            fontSize: '15px'
        },
    },
    senderText: {
        textAlign: 'right',
        borderRadius: '20px 20px 0px 20px',
        fontSize: '19px',
        padding: 10,
        backgroundColor: '#1580F4',
        color: 'white',
        wordBreak: 'break-word',
        '@media (max-width:950px)': {
            fontSize: '15px'
        },
    },
    textArea: {
        resize: 'none',  
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
  }));


export default function Messages(props) {
    const classes = useStyles();

    const trimUser = (word) => {
        return word.charAt(0).toUpperCase()
    }

    return (
        <React.Fragment>
            <ScrollableFeed>
                {
                    props.chatArray.map((element, index) => 
                    
                        <div key={index}>
                            {
                                
                                parseInt(localStorage.getItem('id')) !== element.userId ? 
                                <Grid style={{display: 'flex', alignItems: 'center'}}
                                xl={12} lg={12}
                                item>
                                    
                                    {/* Received */}
                                    <Grid container justify="flex-start" alignItems="center" style={{padding: 5}}>

                                        <Grid style={{ display: 'flex', alignItems: 'flex-end'}}
                                            item>
                                            <Tooltip TransitionComponent={Zoom} placement="top" arrow title={element.name.toUpperCase()}>
                                                <Avatar>{trimUser(element.name)}</Avatar>
                                            </Tooltip>
                                        </Grid>

                                        <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-start'}}
                                        xl={5} lg={5} md={6} sm={7} xs={8}
                                        item>
                                            <span className={classes.text}>
                                                {ReactEmoji.emojify(element.content)}
                                            </span>
                                        </Grid>

                                        
                                        

                                    </Grid>
                                </Grid>
                                :
                                // Sent
                                <Grid container alignItems="center" justify="flex-end" style={{padding: 5}}>

                                    <Grid style={{ display: 'flex', justifyContent: 'flex-end'}}
                                    xl={5} lg={5} md={6} sm={7} xs={8}
                                    item>
                                        <span className={classes.senderText}>
                                            {ReactEmoji.emojify(element.content)}
                                        </span>
                                                    
                                    </Grid>
                                    <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-end'}}

                                    item>
                                        <Tooltip TransitionComponent={Zoom} placement="top" arrow title={localStorage.getItem('username').toUpperCase()}>
                                            <Avatar>{trimUser(localStorage.getItem('username'))}</Avatar>
                                        </Tooltip>
                                    
                                    </Grid>

                                    

                                </Grid>
                            }
                        </div>
                    )
                }
                </ScrollableFeed>
        </React.Fragment>
    )
}
