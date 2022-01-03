import React,{Fragment} from "react";
import {Navbar} from 'react-bootstrap'
import Filter from "./filter"

const NavBar = () => {


    return(
        
        <Fragment>
             <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Filter/>
            
            </Navbar>
        </Fragment>
    )


};

export default NavBar;
