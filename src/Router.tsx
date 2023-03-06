import { createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv';

const router = createBrowserRouter([
  {
    path: '/moonflix',
    element: <Header />,
    children: [
      {
        index: true,
        path: '/moonflix',
        element: <Home />,
      },
      {
        path: '/moonflix/movies/:types/:movieId',
        element: <Home />,
      },
      {
        path: '/moonflix/tv/:types/:tvId',
        element: <Tv />,
      },
      {
        path: '/moonflix/tv',
        element: <Tv />,
      },
      {
        path: '/moonflix/search/:searchId',
        element: <Search />,
      },
      {
        path: '/moonflix/search',
        element: <Search />,
      },
    ],
  },
]);

export default router;
