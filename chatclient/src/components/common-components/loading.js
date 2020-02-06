import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

export default function Loading(props) {
    return (
        <React.Fragment>
            <Backdrop style={{zIndex: 1}} open={props.backdropOpen}>
                <CircularProgress />
            </Backdrop>
        </React.Fragment>
    )
}
