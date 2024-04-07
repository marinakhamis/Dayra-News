import React from 'react'
import loader from "../../../assets/images/loader.gif"
import "./_index.scss"
const Loader = () => {
    return (
        <div className='loader_ctr d-flex flex-column justify-content-center align-items-center'>
            <img src={loader} />
            <p> Loading... </p>
        </div>
    )
}

export default Loader