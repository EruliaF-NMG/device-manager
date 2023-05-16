import { ContextProvider } from './Providers';
import Routes from './Routers';
import ErrorBoundary from '../components/ui-components/common/ErrorBoundary';

const App=()=> {
  return (
    <ErrorBoundary>
      <ContextProvider>
        <Routes/>
      </ContextProvider>
    </ErrorBoundary>
  );
}

export default App;