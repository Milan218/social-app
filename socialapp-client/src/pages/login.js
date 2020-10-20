import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.ui.errors) {
            this.setState({errors: nextProps.ui.errors});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes, ui:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='App Icon' className={classes.image}></img>
                    <Typography variant='h2' className={classes.pageTitle}>
                        Login    
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField} 
                                   value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                        
                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField} 
                                   value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true : false} fullWidth/>

                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                Wrong Email or Password
                            </Typography>
                        )}

                        {errors.error && (
                            <Typography variant='body2' className={classes.customError}>
                                You have to Sign Up first
                            </Typography>
                        )}
                        
                        <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Don't have account yet? Sign up <Link to='/signup'>here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
