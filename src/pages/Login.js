import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, logUser } from '../redux/actions';

class Login extends Component {
  state = {
    playerName: '',
    email: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { playerName, email } = this.state;
      const minLength = 1;
      const rule = !(email.length >= minLength && playerName.length >= minLength);
      this.setState({ isButtonDisabled: rule });
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { playerName, email } = this.state;
    dispatch(fetchToken());
    dispatch(logUser({ playerName, email }));
    history.push('/game');
  };

  clickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { playerName, email, isButtonDisabled } = this.state;
    return (
      <main>
        <form>
          <label
            htmlFor="name-input"
            className="password-label"
          >
            Seu Nome
            <input
              type="text"
              data-testid="input-player-name"
              placeholder="Nickname"
              name="playerName"
              id="name-input"
              value={ playerName }
              onChange={ this.handleChange }
            />

          </label>
          <label
            htmlFor="email-input"
          >
            Seu e-mail
            <input
              type="email"
              data-testid="input-gravatar-email"
              placeholder="exemplo@provedor.com"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.clickSettings }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(Login);
