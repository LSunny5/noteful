import React from 'react';
import './Notes.css'
import Note from '../components/Note/Note';
import { Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';
import NotefulContext from '../NotefulContext';
import { getNotes } from '../noteFunctions';

class Notes extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    render() {
        const { notes = [] } = this.context;
        const { folderId } = this.props.match.params;
        const folderNotes = getNotes(notes, folderId);
        return (

            <section className="allNotes">
                <h2>Notes</h2>
                <ul>
                    {folderNotes.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            //  deleteNote={props.deleteNote} *removed to use context instead
                            />
                        </li>
                    )}
                    <div className='buttonBox'>
                        <NavButton
                            tag={Link}
                            to='/addNote'
                            type='button'
                            className='addButton'
                        >
                            + Note
                </NavButton>
                    </div>

                </ul>

            </section>


        )
    }
}

export default Notes;