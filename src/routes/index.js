import HomePage from '../pages/Home/Home';
import Employee from '../pages/Account/Employee';
import Customer from '../pages/Account/Customer';
import NotFound from '../pages/NotFound/NotFound';




const listRoutes = [
  {
    id: 1,
    path: "/" ,
    title: 'Sell Phone System',
    pages: HomePage
  },
  {
    id: 2,
    path: "/Account",
    title: 'Manager Account',
    pages: Employee
  },
 
  {
    id: 404,
    path: "*",
    title: 'Not Found',
    pages: NotFound
  },
];


export {listRoutes}


