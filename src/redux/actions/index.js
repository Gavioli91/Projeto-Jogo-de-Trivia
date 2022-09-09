import getTokenApi from '../../services/api';

export const USER_LOGGED = 'USER_LOGGED';
export const LOADING = 'LOADING';
export const TOKEN_SUCESS = 'TOKEN_SUCESS';
export const TOKEN_FAIL = 'TOKEN_FAIL';

export function logUser(infoUser) {
  return {
    type: USER_LOGGED,
    infoUser,
  };
}

const loading = () => ({
  type: LOADING,
});

const getTokenSucess = (token) => ({
  type: TOKEN_SUCESS,
  token,
});

const getTokenFail = (error) => ({
  type: TOKEN_FAIL,
  error,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await getTokenApi();
    const { token } = response;
    dispatch(getTokenSucess(token));
    localStorage.setItem('token', token);
  } catch (error) {
    dispatch(getTokenFail(error));
  }
};
