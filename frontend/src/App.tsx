import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import SendMoney from './pages/SendMoney';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Root from './pages/Root';
import { path } from './utils';
import History from './pages/History';
import Favourites from './pages/Favourites';
import Account from './pages/Account';

const App = () => {
  const { isUserLoggedIn } = useSelector(
    (state: indexState) => state.user_slice
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: isUserLoggedIn ? <Home /> : <SignUp />,
        },
        {
          path: path.signin,
          element: !isUserLoggedIn ? (
            <SignIn />
          ) : (
            <Navigate to={path.home + '/1'} />
          ),
        },
        {
          path: path.signup,
          element: !isUserLoggedIn ? (
            <SignUp />
          ) : (
            <Navigate to={path.home + '/1'} />
          ),
        },
        {
          path: path.home + '/:pgNo',
          element: isUserLoggedIn ? <Home /> : <Navigate to={path.signin} />,
        },
        {
          path: path.history + '/:pgNo',
          element: isUserLoggedIn ? <History /> : <Navigate to={path.signin} />,
        },
        {
          path: path.favourites,
          element: isUserLoggedIn ? (
            <Favourites />
          ) : (
            <Navigate to={path.signin} />
          ),
        },

        {
          path: path.account,
          element: isUserLoggedIn ? <Account /> : <Navigate to={path.signin} />,
        },
        {
          path: path.sendMoney + '/:id',
          element: isUserLoggedIn ? (
            <SendMoney />
          ) : (
            <Navigate to={path.signin} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
