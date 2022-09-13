/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { refreshScore } from '../redux/actions';

const ERROR_CODE = 3;
const RESULTS_LENGTH = 5;
const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';
const ONE_SECOND = 1000;
const ZERO = 0;
const THIRTY = 30;
const NUM = 0.5;

class Game extends Component {
  state = {
    btnCorrect: '',
    btnWrong: '',
    timer: THIRTY,
    isButtonsDisabled: false,
    isNextbuttonClicked: false,
    currentQuestIndex: 0,
    isAnswered: false,
  };

  componentDidMount() {
    const { history, code } = this.props;
    if (code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.timer();
    this.setState({ isNextbuttonClicked: true });
  }

  componentDidUpdate() {
    const { timer } = this.state;
    console.log('didUpdate');
    if (timer === ZERO) {
      clearInterval(this.countdown);
      const { isButtonsDisabled } = this.state;
      if (isButtonsDisabled === false) {
        this.setState({
          isButtonsDisabled: true,
        });
      }
    }
  }

  timer = () => {
    this.countdown = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1,
        isNextbuttonClicked: false }));
    }, ONE_SECOND);
  };

  refreshTimer = () => {
    clearInterval(this.countdown);
    this.setState({ timer: THIRTY }, () => {
      this.timer();
    });
  };

  changeColor = () => {
    this.setState({
      btnCorrect: 'btnCorrect',
      btnWrong: 'btnWrong',
    });
  };

  scoreSum = () => {
    this.setAnswered();
    const { dispatch, score, results } = this.props;
    const { timer } = this.state;
    const difficulties = ['easy', 'medium', 'hard'];
    const defaultPoints = 10;
    const gameScore = defaultPoints + (timer * (difficulties
      .indexOf(results[0].difficulty) + 1)) + score;
    console.log(gameScore);
    dispatch(refreshScore(gameScore));
  };

  setAnswered = () => {
    this.setState({
      isAnswered: true,
      isNextbuttonClicked: false,
    });
    this.changeColor();
  };

  nextQuestion = () => {
    this.setState({
      isAnswered: false,
      isNextbuttonClicked: true,
      btnCorrect: '',
      btnWrong: '',
    }, () => {
      this.setState((prevState) => ({
        ...prevState,
        currentQuestIndex: prevState.currentQuestIndex + 1,
      }));
    });
    this.refreshTimer();
    const { currentQuestIndex } = this.state;
    const { history } = this.props;
    const lastIndex = 4;
    if (currentQuestIndex >= lastIndex) {
      history.push('/feedback');
    }
    clearInterval(this.countdown);
  };

  render() {
    const {
      btnCorrect,
      btnWrong,
      isButtonsDisabled,
      timer, isAnswered,
      isNextbuttonClicked,
      currentQuestIndex,
    } = this.state;
    const { results, score } = this.props;
    const question = results.map((result, i) => {
      const arrayAnswers = [...result.incorrect_answers, result.correct_answer];
      const randomAnswers = isNextbuttonClicked ? (
        arrayAnswers
          .sort(() => Math.random() - NUM)) : (
        arrayAnswers
      );
      return results.length === RESULTS_LENGTH
    && (
      <div key={ i }>
        <h3 data-testid="question-category">{ result.category }</h3>
        <h4 data-testid="question-text">{ result.question }</h4>
        <div data-testid="answer-options">
          {randomAnswers.map((answer, index) => (
            <button
              type="button"
              disabled={ isButtonsDisabled }
              data-testid={ answer === result.correct_answer
                ? CORRECT_ANSWER : `${WRONG_ANSWER}-${index}` }
              key={ index }
              className={ answer === result.correct_answer
                ? btnCorrect : btnWrong }
              onClick={ answer === result.correct_answer
                ? this.scoreSum : this.setAnswered }
            >
              {answer}
            </button>))}
        </div>
      </div>
    );
    });
    return (
      <section>
        <Header />
        <div>
          <p>{ timer }</p>
          { question[currentQuestIndex] }
        </div>
        <div>
          { isAnswered && (

            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Next
            </button>)}

        </div>
        <div>
          <span>
            Pontuação:
            { score }
          </span>
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  code: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  code: state.questionReducer.code,
  results: state.questionReducer.results,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
// teste
