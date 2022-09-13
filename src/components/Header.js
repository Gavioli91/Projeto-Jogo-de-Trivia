import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    imgGravatar: '',
  };

  componentDidMount() {
    const {
      email,
    } = this.props;
    const imgGravatar = md5(email).toString();
    this.setState({
      imgGravatar,
    });
  }

  render() {
    const {
      name,
      email,
      score,
    } = this.props;

    const {
      imgGravatar,
    } = this.state;

    return (
      <header>
        <span>{ email }</span>

        <img
          src={ `https://www.gravatar.com/avatar/${imgGravatar}` }
          alt="Perfil do Usuário"
          data-testid="header-profile-picture"
        />

        <span data-testid="header-player-name">
          { name }
        </span>

        <span data-testid="header-score">
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
