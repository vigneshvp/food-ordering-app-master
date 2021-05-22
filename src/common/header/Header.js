import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {IconButton,InputAdornment, TextField} from "@material-ui/core";


class Header extends Component {
    render() {
        const styles = {
            color:'white',
            width:"300px"
        }
        return (
            <div>
                <header className="app-header">
                    <FastfoodIcon className="icon"/>
                    <TextField
                        id = "restaurant-search"
                        placeholder="Search by restaurant name"
                        style={styles}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            <AccountCircleIcon/>
                            Login
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;