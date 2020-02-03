import React from 'react'
import './login.css'
export default function LoginButton(props) {
    return (
        <React.Fragment>
            <button disabled={props.disabled}>{props.label}</button>
        </React.Fragment>
    )
}
