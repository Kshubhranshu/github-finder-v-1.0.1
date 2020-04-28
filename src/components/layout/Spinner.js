import React, { Fragment } from 'react'
import spinner from './spinner.gif'

const Spinner = () =>
    <Fragment>
        <img src={spinner} alt="Loading..." style={{ width: "200px", marginLeft: "400px", display: "blocks" }} />
    </Fragment>

export default Spinner;