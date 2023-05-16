import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import cocktailRoutes from '../components/modules/cocktail/cocktail.routes';

const router = createBrowserRouter([
    ...cocktailRoutes,
]);

const Routes = () => {
    return (
        <RouterProvider router={router} />
    );
};
  
export default Routes;