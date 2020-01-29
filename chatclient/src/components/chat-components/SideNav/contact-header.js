import React from 'react'
import { Typography, Divider } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
export default function ContactHeader() {
    return (
        <div style={{display: 'flex', alignItems: 'center', padding: "10px 10px 0px 10px"}}>
            <FiberManualRecordIcon style={{fontSize: '8px', color: 'green'}}/>
            <Typography style={{fontSize: '15px'}}>Active</Typography>
        </div>
    )
}
