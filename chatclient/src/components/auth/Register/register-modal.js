import React from 'react'
import { Dialog, Slide, AppBar, Toolbar, Typography} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Input from './../Login/login-input';
import RegButton from './../Login/login-button'
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
                    <div className="form-container">
                    <span className="label">Username</span>
                    <Input
                    placeholder="Username" 
                    type="text" name="username"/>
                    <span className="label">Password</span>
                    <Input 
                    placeholder="Password"
                    type="password" name="password"/>
                    <RegButton label="Register" />
                    </div>
            </Dialog>
        </div>
    )
}
