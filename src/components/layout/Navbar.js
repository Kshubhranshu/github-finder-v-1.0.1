import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    static defaultProps = {
        title: '  Github Finder',
        icon: 'fa fa-github'
    }

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    render() {
        return (
            <nav className="bg-primary navbar">
                <h1><i className={this.props.icon}></i>{this.props.title}</h1>
                <ul>
                    <li><Link to={process.env.PUBLIC_URL + '/'}>Home</Link></li>
                    <li><Link to={process.env.PUBLIC_URL + '/about'} >About</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;