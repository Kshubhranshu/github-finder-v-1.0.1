import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'

const User = ({ user, loading, repos, getUser, getUserRepos, match }) => {
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        followers,
        following,
        html_url,
        public_repos,
        public_gists,
        hireable,
        company,
    } = user;

    const blog_url = `https://${blog}/`;

    if (loading) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <Link to="/">
                <button className="btn btn-light">Back to search</button>
            </Link>
                Hireable: {' '}
            {hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="avatar" className="round-img" style={{ width: "150px" }} />
                    <h1>{name}</h1>
                    <p>Location :{location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Company: </strong>{company}
                            </Fragment>}
                        </li>

                        <li>
                            {login && <Fragment>
                                <strong>Username: </strong>{login}
                            </Fragment>}
                        </li>

                        <li>
                            {login && <Fragment>
                                <strong>Website: </strong><a href={blog_url} target="_blank" rel="noopener noreferrer">{(blog === '' ? 'NA' : blog)}</a>
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    );

}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired

}

export default User;