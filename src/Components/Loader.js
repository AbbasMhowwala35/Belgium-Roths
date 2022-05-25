import React from 'react'
import { CircularProgress } from '@material-ui/core';

export default function Loader() {
    return (
        <div className="rcs_filter_wrapper" >
            <CircularProgress className="rcs_filter_loader" />
        </div>
    )
}
