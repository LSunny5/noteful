import React from 'react';
import './DisplayNoteFolder.css';
import NavButton from '../NavButton/NavButton';
import NotefulContext from '../../NotefulContext';
import { findNote, findFolder } from '../../noteFunctions';
import PropTypes from 'prop-types';

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

        if (!note) return 'Sorry no matching note was found...';

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
                    <h2 className="notesFolder">
                        {folder.name}
                    </h2>
                )}
    
            </div>
        );
    }
}

DisplayNoteFolder.propTypes = {
    folders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ), 
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired, 
            modified: PropTypes.instanceOf(Date).isRequired
        })
    )
};

export default DisplayNoteFolder;