import React, { Component } from 'react'
import { Grid, Paper, Backdrop, CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import './Login/login.css'
import LoginTitle from './Login/login-title' ;
import LoginInput from './Login/login-input';
import LoginButton from './Login/login-button';
import io from 'socket.io-client'
import RegisterModal from './Register/register-modal'
import axios from 'axios'
let socket;
export default class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            buttonLabel: 'Login',
            buttonDisabled: false,
            backdropOpen: false,
            username: '',
            password: '',
            user: '',
            pass: '',
            registerModal: false,
        }
        
    }
    setFields = (e) => {
        var fieldname = e.target.name;
        var value = e.target.value;
        this.setState({
        [fieldname]: value,
        alertMessage: undefined
    });
    }

    handleOpen = (zEvent) =>{
        if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.keyCode === 192) {  
            this.setState({
                registerModal: true,
            })
        }    
    }
    componentDidMount(){
        document.addEventListener("keydown", this.handleOpen, false);
      }
      componentWillUnmount(){
        document.removeEventListener("keydown", this.handleOpen, false);
      }

    handleClose = () => {
        this.setState({registerModal: false, alertMessage: undefined})
    }
    
    onLogin = (e) => {
        e.preventDefault()
        this.setState({
            buttonLabel: 'Logging In', buttonDisabled: true, backdropOpen: true
        })
        setTimeout(() => {
            this.setState({
                buttonLabel: 'Login', buttonDisabled: false, backdropOpen: false
            })

            axios.post(`/api/login`, {
                username: this.state.username,
                password: this.state.password
            }).then(res => {
                socket = io('localhost:5001')
                
                socket.emit('join', ({id: res.data.id, user: res.data.username}))
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('tokenAccess', res.data.token)
                this.props.history.push('/chat')
            })

            
        }, 2000);
    }

    onRegister = (e) => {
        e.preventDefault()
        axios.post(`/api/register`,{
            username: this.state.user,
            password: this.state.pass,
            plainPass: this.state.pass
        }).then(res => {
            if(res.data.Message === undefined){
                this.setState({
                    alertSeverity: 'success',
                    alertMessage: 'Registered'
                })
                setTimeout(() => {
                    this.handleClose()
                }, 2000);
            }
            else{
                this.setState({
                    alertSeverity: 'warning',
                    alertMessage: res.data.Message
                })
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <Grid container justify="center" style={{marginTop: 60}}>
                    <Paper className="paper" >
                        <Grid item>
                            <LoginTitle title="Login" />
                        </Grid>
                        <Grid item className="flex-center"
                        >
                            <QuestionAnswerIcon style={{fontSize: '50px', color: '#1580F4'}} />
                        </Grid>

                        <form onSubmit={(e) => this.onLogin(e)}>
                        <Grid item className="column-flex">
                            <LoginInput 
                            onChange={(e) => this.setFields(e)} 
                            value={this.state.username} 
                            name="username" 
                            type="text" 
                            placeholder="Username" />

                            <LoginInput 
                            name="password" 
                            onChange={(e) => this.setFields(e)} 
                            value={this.state.password} 
                            type="password" 
                            placeholder="Password" />
                        </Grid>

                        <Grid item>
                            <LoginButton disabled={this.state.buttonDisabled} label={this.state.buttonLabel}/>
                        </Grid>
                        </form>
                        
                    </Paper>

                    <Backdrop style={{zIndex: 1}} open={this.state.backdropOpen}>
                        <CircularProgress />
                    </Backdrop>
                </Grid>
                <RegisterModal 
                alertMessage={this.state.alertMessage}
                alertSeverity={this.state.alertSeverity}
                onRegister={this.onRegister}
                setFields={this.setFields}
                handleClose={this.handleClose}
                handleOpen={this.handleOpen}
                registerModal={this.state.registerModal}
                />
            </React.Fragment>
        )
    }
}
