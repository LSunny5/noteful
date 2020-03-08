import React from 'react';
import './DisplayNoteFolder.css';
import NavButton from '../NavButton/NavButton';

function DisplayNoteFolder (props) {
    return (
        <div className="displayNoteFolder">
            <NavButton
                tag='button'
                role='link'
                onClick={() => props.history.goBack()}
                className="backButton"
            >
                Go Back
            </NavButton>

            {props.folder && (
                <h3 className="notesFolder">
                    {props.folder.name}
                </h3>
            )}
        </div>
    );
}

DisplayNoteFolder.defaultProps = {
    history: {
        goBack: () => {}
    }
}

export default DisplayNoteFolder;