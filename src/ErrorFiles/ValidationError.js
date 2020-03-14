import React, {Fragment} from 'react';
import './ValidationError.css';

export default function ValidationError(props) {
    if (props.message) {
        return (
            <Fragment className="error">{props.message}</Fragment>
        );
    }
    return <></>
}