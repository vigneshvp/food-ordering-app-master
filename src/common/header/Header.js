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
            invalidContactNumber: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            invalidPassword: "dispNone",
            contactRequired: "dispNone",
            contact: "",
            invalidContactRequired: "dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactnoRequired: "dispNone",
            invalidContactNumber: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            invalidPassword: "dispNone",
            contactRequired: "dispNone",
            contact: "",
            invalidContactRequired: "dispNone",
            registrationSuccess: false,
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }


    loginClickHandler = () => {
        const phoneno = /^\d{10}$/;
        this.state.contactno === "" ? this.setState({ contactnoRequired: "dispBlock" }) : this.setState({ contactnoRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        this.state.contactno !== ""  && !this.state.contactno.match(phoneno) ? this.setState({ invalidContactNumber: "dispBlock" }) : this.setState({ invalidContactNumber: "dispNone" });
        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "customer/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.contactno + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    inputContactNoChangeHandler = (e) => {
        this.setState({ contactno: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    signupClickHandler = () => {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const phoneno = /^\d{10}$/;
        const passwordFormat = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.email !== ""  && !this.state.email.match(mailformat)? this.setState({ invalidEmail: "dispBlock" }) : this.setState({ invalidEmail: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.registerPassword !== "" && !this.state.registerPassword.match(passwordFormat) ? this.setState({ invalidPassword: "dispBlock" }) : this.setState({ invalidPassword: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
        this.state.contact !== "" && !this.state.contact.match(phoneno)? this.setState({ invalidContactRequired: "dispBlock" }) : this.setState({ invalidContactRequired: "dispNone" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "contact_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "customer/signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
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
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                <AccountCircleIcon/> &nbsp;
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                <AccountCircleIcon/> &nbsp;
                                Logout
                            </Button>
                        </div>
                    }
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Signup" />
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="contactno">Contact No</InputLabel>
                            <Input id="contactno" type="text" contactno={this.state.contactno} onChange={this.inputContactNoChangeHandler}/>
                            <FormHelperText className={this.state.contactnoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidContactNumber}>
                                <span className="red">Invalid Contact</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }

                    {this.state.value === 1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" firstname={this.state.firstname}
                                   onChange={this.inputFirstNameChangeHandler}/>
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname}
                                   onChange={this.inputLastNameChangeHandler}/>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={this.state.email}
                                   onChange={this.inputEmailChangeHandler}/>
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidEmail}>
                                <span className="red">Invalid Email</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword}
                                   onChange={this.inputRegisterPasswordChangeHandler}/>
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidPassword}>
                                <span className="red">Password must contain<br/> at least one capital letter,<br/> one small letter, <br/>one number, and <br/>one special character</span>
                            </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={this.state.contact}
                                   onChange={this.inputContactChangeHandler}/>
                            <FormHelperText className={this.state.contactRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                            <FormHelperText className={this.state.invalidContactRequired}>
                                <span className="red">Contact No.<br/> must contain<br/> only numbers and <br/>must be 10 digits long</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <Button variant="contained" color="primary"
                                onClick={this.signupClickHandler}>SIGNUP</Button>
                    </TabContainer>
                    }


                </Modal>
                {this.state.loggedIn === true &&
                <div className="bottomleft"></div>
                }

            </div>
        )
    }
}

export default Header;