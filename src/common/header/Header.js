import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, Tab, Tabs, TextField} from "@material-ui/core";
import Modal from 'react-modal';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            contactnoRequired: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: ""
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactnoRequired: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }


    loginClickHandler = () => {
        this.state.contactno === "" ? this.setState({ contactnoRequired: "dispBlock" }) : this.setState({ contactnoRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

    }

    inputContactNoChangeHandler = (e) => {
        this.setState({ contactno: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

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
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            <AccountCircleIcon/>
                            Login
                        </Button>
                    </div>
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="contactno">Contact No</InputLabel>
                            <Input id="contactno" type="text" contactno={this.state.contactno} onChange={this.inputContactNoChangeHandler}/>
                            <FormHelperText className={this.state.contactnoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default Header;