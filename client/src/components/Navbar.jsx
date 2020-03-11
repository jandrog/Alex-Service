import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import styles from './styles.css';
import Toolbar from './Toolbar'

class Navbar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    render() {
        return(
        <>
         <Toolbar/>
         <div>
         </div>
        </>
        )
    }
}


export default Navbar;
