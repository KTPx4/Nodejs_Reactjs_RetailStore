const initialState = 
{
    isChangePass: false,
    isActive: false,
    isAdmin: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_CHANGE_PASS":
      return { ...state, isChangePass: action.payload };       
      
    case "ACTIVE":
        return { ...state, isActive: action.payload };

    case "IS_ADMIN":
      return { ...state, isAdmin: action.payload };

    default:
      return state;

  }
}
  
  export default rootReducer;