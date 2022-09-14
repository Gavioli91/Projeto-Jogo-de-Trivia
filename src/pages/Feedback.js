import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const num = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions < num
            ? 'Could be better...' : 'Well Done!'}
        </h1>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
