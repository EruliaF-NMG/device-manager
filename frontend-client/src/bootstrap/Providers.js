import React from 'react';

import { CoreContextProvider } from '../components/global-context/context-providers/CoreContext.provider';
import { UIContextProvider } from '../components/global-context/context-providers/UIContext.provider';
import { FormContextProvider } from '../components/global-context/context-providers/FormContext.provider';

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
          <UIContextProvider/>,
          <FormContextProvider/>,  
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