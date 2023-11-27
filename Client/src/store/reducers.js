const initialState = {
    isChangePass: false,
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "IS_CHANGE_PASS":
        return { ...state, isChangePass: action.payload };
      default:
        return state;
    }
  }
  
  export default rootReducer;