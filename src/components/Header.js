import React, { Component } from 'react';
import './header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;

    const hash = md5(gravatarEmail).toString();
    const srcImage = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <>
        <div className="header-personal">
          <img src={ srcImage } data-testid="header-profile-picture" alt="" />
          <h3 data-testid="header-player-name">{ name }</h3>
        </div>
        <div className="header-game">
          <div className="score">
            <h3>Score:</h3>
            <h3 data-testid="header-score">{ score }</h3>
          </div>
          <span><Link to="/">Logout</Link></span>
        </div>
      </>);
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
