import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                    <a href="/"><img className="logo-custom" src="https://www.freepnglogos.com/uploads/chess-png/horse-chess-png-black-23.png" alt="horse chess png black" /></a>
                    <a className="nav-link navbar-brand-custom" href="/">LetsPlayChess</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="." id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Username
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Settings</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Logout</a>
                                </div>
                            </li>
                            <li>
                            <a className="nav-link" href="/play">Play Now!</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;