import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import styles from './styles.css';

class Toolbar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    render() {
        return(
         <div className={styles.toolbar}>
            <ul>
                <li className={styles.headerfirst}>FIND A REPAIR SHOP</li>
                <li className={styles.headersecond}>FOR THE PROFESSIONAL</li>
            </ul>
         </div>
        )
    }
}


export default Toolbar;