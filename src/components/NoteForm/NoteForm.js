import React from 'react';

function NoteForm(props) {
    const {className, ...otherProps} = props
    return (
        <form
            className={['noteForm', className].join(' ')}
            action='#'
            {...otherProps}
        />
    )
}

export default NoteForm;