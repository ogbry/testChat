import React from 'react'
import { Grid, Avatar, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        cursor: 'pointer',
        padding: 10,
        '&:hover': {
            backgroundColor: '#ededed',
            transform: 'scale(1.15)'
       },
    },
    
  }));

const mock = [
    { "id": 1, "name":"Bry", "description": "Sample shit about life" },
    { "id": 2, "name":"Men", "description": "Sample shit about life" },
    { "id": 3, "name":"Rej", "description": "Sample shit about life" },
    { "id": 4, "name":"Dan", "description": "Sample shit about life" },
    { "id": 5, "name":"Jude", "description": "Sample shit about life" },
    { "id": 6, "name":"Noun", "description": "Sample shit about life" },
    { "id": 7, "name":"Nayvs", "description": "Sample shit about life" },
    { "id": 8, "name":"Nor", "description": "Sample shit about life" },
] 
  
export default function ContactList() {
    const classes = useStyles();
    return (
        <React.Fragment>
            {
                mock.map((element, index) => 
                    <div key={element.id}>
                       <Grid container
                        className={classes.grid}
                        
                        >
                            <Grid item xl={2} style={{margin: 5}}>
                            <Avatar alt={element.name} src="/static/images/avatar/1.jpg" />
                            </Grid>
                            <Grid item xl={9} style={{display: 'flex'}}>
                                <Grid container justify="center" direction="column">
                                    <Grid item>
                                        {element.name}
                                    </Grid>
                                    <Grid item>
                                        <em style={{fontSize: '12px'}}>{element.description}...</em>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                    </div>
                        
                )
            }
        </React.Fragment>
        
        
    )
}
