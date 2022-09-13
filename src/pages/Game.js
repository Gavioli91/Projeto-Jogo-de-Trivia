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
  };

  componentDidMount() {
    const { history, code } = this.props;
    if (code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.countdown = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    console.log('didUpdate');
    if (timer === ZERO) {
      clearInterval(this.countdown);
      const { isButtonsDisabled } = this.state;
      if (isButtonsDisabled === false) {
        this.setState({ isButtonsDisabled: true });
      }
    }
  }

  changeColor = () => {
    this.setState({
      btnCorrect: 'btnCorrect',
      btnWrong: 'btnWrong',
    });
  };

  scoreSum = () => {
    this.changeColor();
    const { dispatch, score, results } = this.props;
    const { timer } = this.state;
    const difficulties = ['easy', 'medium', 'hard'];
    const defaultPoints = 10;
    const gameScore = defaultPoints + (timer * (difficulties
      .indexOf(results[0].difficulty) + 1)) + score;
    console.log(gameScore);
    dispatch(refreshScore(gameScore));
  };

  render() {
    const { btnCorrect, btnWrong, isButtonsDisabled, timer } = this.state;
    const { results, score } = this.props;
    const question = results.map((result, i) => {
      const arrayAnswers = [...result.incorrect_answers, result.correct_answer];
      const randomAnswers = arrayAnswers.sort(() => Math.random() - NUM);
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
                ? this.scoreSum : this.changeColor }
            >
              {answer}
            </button>))}
        </div>
      </div>
    );
    });
    return (
      <section>
        Game
        <Header />
        <div>
          <p>{ timer }</p>
          { question[0] }
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
