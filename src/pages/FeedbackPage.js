import React, { Component } from 'react';
import './feedbackpage.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { setRanking as setRankingAction } from '../actions';

class FeedbackPage extends Component {
  componentDidMount() {
    const { name, score, picture, setRanking } = this.props;
    setRanking({ name, score, picture });
  }

  handleButtonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleButtonRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;

    let message = '';
    const MINIMUM = 3;

    if (assertions < MINIMUM) {
      message = 'Could be better... 👀';
    }

    if (assertions >= MINIMUM) {
      message = 'Well Done! 🥳';
    }

    return (
      <div className="results">
        <header>
          <Header score={ score } />
        </header>
        <section className="results-section">
          <h2 data-testid="feedback-text">{ message }</h2>
          <div className="final-score">
            <h3>Final Score:</h3>
            <h3
              data-testid="feedback-total-score"
            >
              { score }
            </h3>
          </div>
          <div className="assertions-number">
            <h3>Assertions Number:</h3>
            <h3
              data-testid="feedback-total-question"
            >
              { assertions }
            </h3>
          </div>
          <div className="results-btns">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handleButtonPlayAgain }
            >
              Play Again
            </button>
            <br />
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleButtonRanking }
            >
              Go Ranking
            </button>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  picture: state.player.picture,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setRanking: (payload) => dispatch(setRankingAction(payload)),
});

FeedbackPage.propTypes = {
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  picture: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
