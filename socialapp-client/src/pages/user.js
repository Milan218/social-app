import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            screamIdParam: null
        };
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) this.setState({screamIdParam: screamId})
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({profile: res.data.user})
            })
            .catch(err => console.log(err));
    }
    render() {
        const {screams, loading} = this.props.data;
        const {screamIdParam} = this.state;

        const screamsMarkup = loading ? (
            <ScreamSkeleton></ScreamSkeleton>
        ) : (
            screams === null ? (
                <p>No screams from this user</p>
            ) : !screamIdParam ? (
                    screams.map(scream => <Scream key={scream.screamId} scream={scream}></Scream>)
                ) : (
                    screams.map(scream => {
                        if(scream.screamId !== screamIdParam)
                            return <Scream key={scream.screamId} scream={scream} />
                        else {
                            console.log('111');
                            return <Scream key={scream.screamId} scream={scream} openDialog/>
                        }
                    })
                )
        )

        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton></ProfileSkeleton>
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {getUserData})(user);
