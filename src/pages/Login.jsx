import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import logo from '../imagens/TrybeWalletLogo.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.checkEmail);
  };

  checkEmail = () => {
    const { email, password } = this.state;
    const defaultEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const minLength = 6;
    if (password.length >= minLength && defaultEmail.test(email)) {
      return this.setState({ isDisable: false });
    }
    return this.setState({ isDisable: true });
  };

  submitLogin = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisable } = this.state;

    return (
      <div className="login__page">
        <form className="login__form">
          <img src={ logo } alt="foto do porquinho" />
          <label className="email__label">
            <input
              data-testid="email-input"
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={ this.onInputChange }
            />
          </label>

          <label className="password__label">
            <input
              data-testid="password-input"
              name="password"
              type="password"
              placeholder="Senha"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            id="btn__entry"
            onClick={ this.submitLogin }
            disabled={ isDisable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps)(Login);

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
