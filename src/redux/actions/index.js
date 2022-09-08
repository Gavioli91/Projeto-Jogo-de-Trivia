export const USER_LOGGED = 'USER_LOGGED';

export function logUser(payload) {
  return {
    type: USER_LOGGED,
    payload,
  };
}
