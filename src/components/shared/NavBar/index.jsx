import React from 'react'
import logo from "../../../assets/icons/dayraLogo.png"
import { Button } from 'antd';
//styles 
import "./_index.scss"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className='navbar py-3'>
            <div className="d-flex flex-row align-items-center justify-content-between ctr">
                <Link to="/" className='d-block navbar_logo' >
                    <img src={logo} className='h-100 w-100' />
                </Link>
                <Button>
                    Visit Our Website
                </Button>

            </div>
        </nav>
    )
}

export default NavBar