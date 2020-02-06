import React from 'react'
import '../../components/auth/Login/login.css'
export default function LoginInput(props) {
    return (
        <React.Fragment>
            <input className="fields" type={props.type} onChange={props.onChange} name={props.name} placeholder={props.placeholder} value={props.value} required />
        </React.Fragment>
    )
}
