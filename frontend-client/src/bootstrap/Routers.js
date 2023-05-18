import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import manageDeviceRoutes from '../components/modules/manage-device/manage-device.routes';

const router = createBrowserRouter([
    ...manageDeviceRoutes,
]);

const Routes = () => {
    return (
        <RouterProvider router={router} />
    );
};
  
export default Routes;