import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from './trivia-title.png';
import './loginpage.css';
import { getUserToken } from '../services/fetchApi';
import { savePlayer as savePlayerAction,
  getUserTokenThunk,
  setScore as setScoreAction,
  setAssertions as setAssertionsAction } from '../actions';

class LoginPage extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    isDisabled: true,
  }

  componentDidMount() {
    const { setScore, setAssertions } = this.props;
    setScore(0);
    setAssertions(0);
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableEnterButton());
  }

  enableEnterButton = () => {
    const { name, gravatarEmail } = this.state;
    const EMAIL_MIN_LENGTH = 8;
    const nameFilled = name.length >= 2;
    const emailFilled = gravatarEmail.length >= EMAIL_MIN_LENGTH;
    const isEnabled = nameFilled && emailFilled;

    this.setState({ isDisabled: !isEnabled });
  }

  handleClickBtnPlay = async () => {
    const { history, savePlayer, setUserToken } = this.props;
    const { name, gravatarEmail } = this.state;
    const { token } = await getUserToken();

    const hash = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    savePlayer({ name, gravatarEmail, picture });

    await setUserToken(token);
    localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="login">
        <img src={ logo } className="login-logo" alt="logo" />
        <form>
          Player Name
          <input
            id="name"
            name="name"
            value={ name }
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
            required
          />
          <br />
          E-mail
          <input
            id="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            type="text"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
            required
          />
          <button
            className="play-btn"
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClickBtnPlay }
          >
            PLAY
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </form>
        <footer>
          <p>
            Projeto desenvolvido no módulo de Front-End | Trybe -
            Grupo 27 [Fran Oliveira, Klecianny Melo, Mário Júnior]
          </p>
        </footer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setUserToken: func,
  savePlayer: func,
  setScore: func,
  setAssertions: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setUserToken: (token) => dispatch(getUserTokenThunk(token)),
  savePlayer: (payload) => dispatch(savePlayerAction(payload)),
  setScore: (payload) => dispatch(setScoreAction(payload)),
  setAssertions: (payload) => dispatch(setAssertionsAction(payload)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
