import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const _Token_Auth = process.env.REACT_APP_AUTH_LOGIN || 'TOKEN_AUTH_LOGIN';
const _URLServer = process.env.REACT_APP_SERVER || '';
const tokenLogin = localStorage.getItem(_Token_Auth) || '';
const serverLogin = `${_URLServer}/api/account/login`;

export function useVerifyLogin() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(serverLogin, {
          headers: {
            authorization: `bearer ${tokenLogin}`,
            'Content-Type': 'application/json',
          },
        });

        const code = res.data.code;
     
       
        if(code === 400)
        {
          window.location.replace('/account/login')
        }
        else if(code === 200 || code === 203)
        {
          let role = res.data.data.role
          if(role.includes("Admin"))
          {
            dispatch({ type: "IS_ADMIN", payload: true });
          }
          if (code === 203) 
          {
            dispatch({ type: 'IS_CHANGE_PASS', payload: true });
          }
        }

      } catch (err) {
        console.log("Error at 'Home' fetch verify token: ", err);
      }
    };

    fetchData();
  }, [dispatch]);
}