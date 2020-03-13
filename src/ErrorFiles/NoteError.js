import React from 'react';

class NoteError extends React.Component {
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
              <h3>Note could not be found.</h3>
            );
          }
          return this.props.children;
    }
}

export default NoteError;