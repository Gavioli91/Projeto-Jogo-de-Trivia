/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const ERROR_CODE = 3;
const RESULTS_LENGTH = 5;
const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

class Game extends Component {
  state = {
    btnCorrect: '',
    btnWrong: '',
  };

  componentDidMount() {
    console.log('did');
    const { history, code } = this.props;
    console.log(code);
    if (code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  changeColor = () => {
    this.setState({
      btnCorrect: 'btnCorrect',
      btnWrong: 'btnWrong',
    });
  };

  render() {
    const { btnCorrect, btnWrong } = this.state;
    const { results } = this.props;
    const num = 0.5;
    const question = results.map((result, i) => {
      const arrayAnswers = [...result.incorrect_answers, result.correct_answer];
      console.log(arrayAnswers);
      const randomAnswers = arrayAnswers.sort(() => Math.random() - num);
      console.log(randomAnswers);
      return results.length === RESULTS_LENGTH
    && (
      <div key={ i }>
        <h3 data-testid="question-category">{ result.category }</h3>
        <h4 data-testid="question-text">{ result.question }</h4>
        <div data-testid="answer-options">
          {randomAnswers.map((answer, index) => (
            <button
              type="button"
              data-testid={ answer === result.correct_answer
                ? CORRECT_ANSWER : `${WRONG_ANSWER}-${index}` }
              key={ index }
              className={ answer === result.correct_answer
                ? btnCorrect : btnWrong }
              onClick={ this.changeColor }
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
          { question[0] }
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  code: PropTypes.number.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  code: state.questionReducer.code,
  results: state.questionReducer.results,
});

export default connect(mapStateToProps)(Game);
// teste
