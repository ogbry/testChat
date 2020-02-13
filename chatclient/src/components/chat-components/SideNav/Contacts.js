import React, { Component } from 'react'
import ChatHeader from './contact-header'
import ChatList from './contact-list'
import { Grid, Divider, InputAdornment, TextField } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles';

const styles = {

}

class Contacts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Grid container direction="column" >
                <Grid style={{padding: 15}}
                item>
                    <TextField
                    label="Search"
                    fullWidth
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <Search />
                        </InputAdornment>
                    ),
                    }}
                />
                </Grid>
                <Divider light={true}/>

                <Grid item >
                <ChatHeader />
                </Grid>

                <Grid style={{padding: 20}}
                item>
                    <ChatList active={this.props.active} />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Contacts)
