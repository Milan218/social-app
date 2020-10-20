import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// redux
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';

// mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.spreadThis
})

export class EditDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bio:'',
            website:'',
            location:'',
            open: false
        }
    }


    componentDidMount(){
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>

                <MyButton tip='Edit details' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary'></EditIcon>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name ='bio' type='text' label='Bio' multiline rows='3' onChange={this.handleChange} fullWidth
                                    placeholder='A short bio about yourself' className={classes.TextField} value={this.state.bio}/>
                            
                            <TextField name ='website' type='text' label='Website'  onChange={this.handleChange} fullWidth
                                    placeholder='Your personal/profesional website' className={classes.TextField} value={this.state.website}/>
                            
                            <TextField name ='location' type='text' label='Location'  onChange={this.handleChange} fullWidth
                                    placeholder='Where you live' className={classes.TextField} value={this.state.location}/>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
