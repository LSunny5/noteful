import React from 'react';
import './Notes.css'
import Note from '../components/Note/Note';
import { Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';

function Notes(props) {
    return (
        <section className="allNotes">
            <h2>Notes</h2>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Note
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                            deleteNote={props.deleteNote}
                        />
                    </li>
                )}
            </ul>

            <div className='buttonBoxNotes'>
                <NavButton 
                    tag={Link}
                    to='/addNote'
                    type='button'
                    className='addNoteButton'
                >
                    + Note
                </NavButton>
            </div>
        </section>
    )
}

Notes.defaultProps = {
    notes: [],    
}

export default Notes;