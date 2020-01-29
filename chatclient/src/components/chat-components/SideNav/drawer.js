import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Drawer,List, ListItem } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  }
  }));

export default function DrawerComponent() {
    const classes = useStyles()
    return (
        <div>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
    )
}
