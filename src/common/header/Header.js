import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <FastfoodIcon className="icon"/>
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Login
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;