import React, { Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// redux
import {connect} from 'react-redux';

import {submitComment, clearErrors} from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
})

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({errors: nextProps.ui.errors});
        }
        if(!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({body: ''});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {body: this.state.body});
        this.props.clearErrors();
    }

    render() {
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' type='text' label='Comment on scream' error={errors.comment ? true : false}
                                helperText={errors.comment} value={this.state.body} onChange={this.handleChange} fullWidth
                                className={classes.textField}></TextField>
                    <Button type='submit' variant='contained' color='primary' className={classes.button}>Submit</Button>
                </form>
                <hr className={classes.visibleSeparator}></hr>
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment, clearErrors})(withStyles(styles)(CommentForm));
