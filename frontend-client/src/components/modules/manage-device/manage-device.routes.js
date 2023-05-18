import GatewayPage from './pages/GatewayPage';
import DevicePage from './pages/DevicePage';

const manageDeviceRoutes = [
        {
            path: '/',
            element: <GatewayPage />
        },
        {
            path: '/device',
            element: <DevicePage />
        }
];

export default manageDeviceRoutes;