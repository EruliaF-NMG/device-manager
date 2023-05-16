import React, { Component, Fragment } from "react";

class ErrorBoundary extends Component {

    static defaultProps = {
      displayErrorElement: null
    };

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      const DisplayErrorComponent = this.props.displayErrorElement;

      return (
          <Fragment>
              {
                  (this.state.hasError) ? (
                      (this.props.displayErrorElement === null) ? (
                        <div className='w-full flex justify-center mt-8'>
                          <h1>Something went wrong.</h1>
                        </div>
                      ) : (
                          <DisplayErrorComponent />
                      )
                  ) : (
                      <Fragment>
                          {this.props.children}
                      </Fragment>
                  )
              }
          </Fragment>
      )
    }
}

export default ErrorBoundary;