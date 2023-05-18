
import { BaseTemplate } from '../../../ui-components/templates/BaseTemplate';

const DevicePage = () => {
    return (
        <BaseTemplate
            breadcrumbList={[
                {
                    path: '/device',
                    title: (
                    <>
                        <span>Device</span>
                    </>
                    ),
                }
            ]}
        >
            
            DevicePage
            

        </BaseTemplate>
    );
  };
  
  export default DevicePage;