import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const ERROR_CODE = 3;
const RESULTS_LENGTH = 5;

class Game extends Component {
  componentDidMount() {
    console.log('did');
    const { history, code } = this.props;
    console.log(code);
    if (code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { results } = this.props;
    const question = results[0].map((result, i) => result.length === RESULTS_LENGTH
    && (
      <div key={ i }>
        <h3 data-testid="question-category">{ result.category }</h3>
        <h4 data-testid="question-text">{ result.question }</h4>
        <div data-testid="answer-options">
          <button type="button" data-testid="correct-answer">
            { result.correctAnswer }
          </button>
          <button type="button" data-testid={ `wrong-answer-${i}` }>
            { result.incorrect_answers }
          </button>
          <button type="button" data-testid={ `wrong-answer-${i}` }>
            { result.incorrect_answers }
          </button>
          <button type="button" data-testid={ `wrong-answer-${i}` }>
            { result.incorrect_answers }
          </button>
          <button type="button" data-testid={ `wrong-answer-${i}` }>
            { result.incorrect_answers }
          </button>
        </div>
      </div>
    ));
    return (
      <section>
        Game
        <Header />
        <div>
          { question }
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
