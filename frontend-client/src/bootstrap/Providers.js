import React from 'react';

import { CoreContextProvider } from '../components/global-context/context-providers/CoreContext.provider';

const ProviderComposer=({ contexts, children })=>{
    return contexts.reduceRight(
      (kids, parent) =>
        React.cloneElement(parent, {
          children: kids,
        }),
      children
    );
}

const ContextProvider=({ children })=>{
    return (
      <ProviderComposer
        contexts={[ 
          <CoreContextProvider/>     
        ]}
      >
        {children}
      </ProviderComposer>
    );
  }
  
export { 
    ContextProvider 
};