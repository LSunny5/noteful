import React from 'react';

class FolderError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
            return (
              <h3>Folder could not be displayed.</h3>
            );
          }
          return this.props.children;
    }
}

export default FolderError;