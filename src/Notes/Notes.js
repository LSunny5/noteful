import React from 'react';
import './Notes.css'
import Note from '../components/Note/Note';
import { Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';
import NotefulContext from '../NotefulContext';
import { getNotes } from '../noteFunctions';
import PropTypes from 'prop-types';
import NoteError from '../ErrorFiles/NoteError';

class Notes extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    render() {
        const { notes = [] } = this.context;
        //const { folderId } = this.props.match.params;
        const { folder_id } = this.props.match.params;
        //const folderNotes = getNotes(notes, folderId);
        const folderNotes = getNotes(notes, folder_id);

        return (
            <section className="allNotes">
                <h2>Notes</h2>
                <div className='buttonBox'>
                        <NavButton
                            tag={Link}
                            to='/addNote'
                            type='button'
                            className='addButton'
                            role='button'
                            aria-pressed='false'
                            aria-label='add note button'
                        >
                            + Note
                        </NavButton>
                </div>
                <ul>
                    {(folderNotes.length > 0) ? (
                        folderNotes.map(note =>
                            <li key={note.id}>
                                <NoteError>
                                    <Note
                                        id={note.id}
                                        /* name={note.name} */
                                        title={note.title}
                                        modified={note.modified}
                                        history={this.props.history}
                                    />
                                </NoteError>
                            </li>
                        )) : (<li className="noNotes">No notes in this folder...</li>)}
                </ul>
            </section>
        )
    }
}

//learn react
Notes.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            modified: PropTypes.instanceOf(Date).isRequired
        })
    ),
    folderId: PropTypes.string,
    folderNotes: PropTypes.array,
};

export default Notes;