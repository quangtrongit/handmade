export const initialUsersState = {
  isLoading: true,
  isSignedIn: false,
  userToken: null,
  userName: null,
}

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      }
    case 'SIGN_IN':
      return {
      ...state,
      isSignedIn: true,
      userName: action.id,
      userToken: action.token,
      isLoading: false
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        userName: null,
        userToken: null,
        isLoading: false
      };
    case 'REGISTER':
      return {
        ...state,
        userName: action.id,
        userToken: action.token,
        isLoading: false
      }
    default:
      return state;
  }
};