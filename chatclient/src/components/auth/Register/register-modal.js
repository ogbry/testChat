import React from 'react'
import { Dialog, Slide, AppBar, Toolbar, Typography} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close';
import Input from '../../common-components/login-input';
import RegButton from '../../common-components/login-button'
import './register.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterModal(props) {
    return (
        <div>
            <Dialog open={props.registerModal} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar >
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">Register</Typography>
                    <CloseIcon style={{cursor: 'pointer'}} onClick={props.handleClose}/>
                </Toolbar>
                </AppBar>
                <form onSubmit={props.onRegister}>
                    <div className="form-container">
                    <span className="label">Username</span>
                    <Input
                    onChange={(e) => props.setFields(e)}
                    placeholder="Username" 
                    type="text" name="user"/>
                    <span className="label">Password</span>
                    <Input 
                    onChange={(e) => {props.setFields(e)}}
                    placeholder="Password"
                    type="password" name="pass"/>
                    <RegButton label="Register" />
                    </div>
                    {
                        props.alertMessage === undefined ? 
                        null
                        :
                        <Alert style={{margin: 5, textAlign:'center'}} variant="outlined" severity={props.alertSeverity}>
                        {props.alertMessage}
                        </Alert>
                        
                    }
                </form>
            </Dialog>
        </div>
    )
}