import React from 'react';
import './DisplayNoteFolder.css';
import NavButton from '../NavButton/NavButton';
import NotefulContext from '../../NotefulContext';
import { findNote, findFolder } from '../../noteFunctions';

class DisplayNoteFolder extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        history: {
            goBack: () => {}
        }, 
        match: {
            params: []
        }
    }

    render () {
        const {notes, folders } = this.context;
        const {noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);

        return (
            <div className="displayNoteFolder">
                <NavButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className="backButton"
                >
                    Go Back
                </NavButton>
    
                {folder && (
                    <h3 className="notesFolder">
                        {folder.name}
                    </h3>
                )}
            </div>
        );
    }
}

export default DisplayNoteFolder;