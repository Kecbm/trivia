import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './answersStyles.css';
import './gamepage.css';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUserToken, fetchQuestions } from '../services/fetchApi';
import { getUserTokenThunk,
  questionsRequest as questionsRequestAction,
  setAssertions as setAssertionsAction,
  setScore as setScoreAction } from '../actions';

class GamePage extends Component {
  state = {
    isLoading: true,
    isAnswered: false,
    timer: 30,
    questionIndex: 0,
    shuffledArray: [],
    score: 0,
    assertions: 0,
  }

  componentDidMount = async () => {
    const { setUserToken, questionsRequest } = this.props;
    const token = localStorage.getItem('token');
    const apiData = await fetchQuestions(token);

    if (apiData.response_code !== 0) {
      const newApiData = await getUserToken();
      await setUserToken(newApiData.token);
      await fetchQuestions(newApiData.token);
      localStorage.setItem('token', newApiData.token);
      await questionsRequest(newApiData.results);
    } else {
      await questionsRequest(apiData.results);
    }
    const MS = 1000;
    this.timerTime = setInterval(this.timerHandler, MS);
    this.randomizeAnswers();
  }

  randomizeAnswers = () => {
    const { questionIndex } = this.state;
    const { questions } = this.props;

    if (questions && questions.length > 0 && questionIndex <= questions.length - 1) {
      const sortRandom = 0.5;
      const correctAnswer = questions[questionIndex].correct_answer;
      const incorrectAnswers = questions[questionIndex].incorrect_answers;
      const shuffledArray = [correctAnswer, ...incorrectAnswers]
        .sort(() => Math.random() - sortRandom);
      this.setState({ shuffledArray });
    }
  }

  handleLoading = () => {
    const { questions } = this.props;
    if (questions && questions.length > 0) {
      this.setState({ isLoading: false });
    }
  }

  timerHandler = () => {
    const { isAnswered, timer } = this.state;
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));
    if (timer <= 1) {
      this.setState({ isAnswered: true });
      clearInterval(this.timerTime);
    }
    if (isAnswered) return clearInterval(this.timerTime);
  }

  answerClickHandle = ({ target }, correctAnswer, difficulty) => {
    const { value } = target;
    const { timer } = this.state;

    this.setState({ isAnswered: true });
    if (value === correctAnswer) {
      const BASE_POINTS = 10;
      const difficultyValue = { hard: 3, medium: 2, easy: 1 };

      this.setState((prevState) => ({
        score: prevState.score + BASE_POINTS + (timer * difficultyValue[difficulty]),
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        const { setScore, setAssertions } = this.props;
        setScore(score);
        setAssertions(assertions);
      });
    }
  };

  correctButton = (answer, index, correctAnswer, difficulty) => {
    const { isAnswered } = this.state;
    return (
      <button
        type="button"
        key={ index }
        data-testid="correct-answer"
        onClick={ (event) => this.answerClickHandle(event, correctAnswer, difficulty) }
        value={ answer }
        disabled={ isAnswered }
        className={ isAnswered ? 'correctAnswer' : null }
      >
        {answer}
      </button>);
  }

  incorrectButtons = (answer, index) => {
    const { isAnswered } = this.state;
    return (
      <button
        type="button"
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.answerClickHandle }
        value={ answer }
        disabled={ isAnswered }
        className={ isAnswered ? 'incorrectAnswer' : null }
      >
        {answer}
      </button>);
  }

  handleNextButton = () => {
    this.setState((prevState) => ({
      isAnswered: false,
      timer: 30,
      questionIndex: prevState.questionIndex + 1,
    }), () => this.randomizeAnswers());
    const MS = 1000;
    this.timerTime = setInterval(this.timerHandler, MS);
  }

  render() {
    const { isLoading, isAnswered, timer,
      questionIndex, shuffledArray, score } = this.state;
    const { questions } = this.props;

    if (questions && questions.length > 0 && questionIndex <= questions.length - 1) {
      const correctAnswer = questions[questionIndex].correct_answer;
      const { difficulty } = questions[questionIndex];

      return (
        <div className="game">
          <header>
            <Header score={ score } />
          </header>
          <section className="game-section">
            <p className="timer">{`Timer: ${timer}s`}</p>
            <p
              data-testid="question-category"
            >
              { `Category: 
              ${questions[questionIndex].category}`}
            </p>
            <h3
              data-testid="question-text"
            >
              { questions[questionIndex].question }
            </h3>
            <div data-testid="answer-options">
              { shuffledArray.map((answer, index) => {
                if (answer === correctAnswer) {
                  return this.correctButton(answer, index, correctAnswer, difficulty);
                }
                return this.incorrectButtons(answer, index);
              })}
            </div>
            {isAnswered ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextButton }
                className="next-btn"
              >
                Next
              </button>) : null}
          </section>
        </div>
      );
    }
    if (isLoading && questions && questions.length > 0) {
      this.handleLoading();
    }
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return <Redirect to="/results" />;
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  token: state.token,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setUserToken: (token) => dispatch(getUserTokenThunk(token)),
  questionsRequest: (payload) => dispatch(questionsRequestAction(payload)),
  setScore: (payload) => dispatch(setScoreAction(payload)),
  setAssertions: (payload) => dispatch(setAssertionsAction(payload)),
});

GamePage.propTypes = {
  setUserToken: PropTypes.func,
  questionsRequest: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
