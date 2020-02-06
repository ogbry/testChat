import React, { useState, useEffect } from 'react'
import { Grid, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ScrollableFeed from 'react-scrollable-feed'

const useStyles = makeStyles(theme => ({
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
                                    <Grid container alignItems="center" justify="flex-end" style={{padding: 5}}>
                                        <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-end'}}
                                        xl={5} lg={5} md={6} sm={7} xs={8}
                                        item>
                                            <span className={classes.text}>
                                                {element.content}
                                            </span>
                                        </Grid>

                                        <Grid style={{ height: '80px', display: 'flex', alignItems: 'flex-end'}}
                                        item>
                                            <Avatar alt={'Joven'} src="/static/images/avatar/1.jpg" />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                :

                                <Grid container alignItems="center" justify="flex-start" style={{padding: 5}}>

                                    <Grid style={{margin: 15, display: 'flex', justifyContent: 'flex-start'}}

                                    item>
                                        <Avatar alt={localStorage.getItem('username')} src="/static/images/avatar/1.jpg" />
                                    </Grid>

                                    <Grid style={{ display: 'flex', alignItems: 'flex-end'}}
                                    xl={5} lg={5} md={6} sm={7} xs={8}
                                    item>
                                        <span className={classes.senderText}>
                                            {element.content}
                                        </span>
                                                    
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
