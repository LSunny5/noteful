import React from 'react';
import './DisplayNote.css';
import Note from '../Note/Note';
import NotefulContext from '../../NotefulContext';
import { findNote } from '../../noteFunctions';

class DisplayNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    //Implement delete button on the note page, if delete is successful, redirect to / path.
    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const { notes = [] } = this.context;
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || { content: '' }
        return (
            <section className="displayNote">
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    deleteNote={this.handleDeleteNote}
                />
                <div className="noteDesc">
                    {note.content.split(/\n \r|\n/).map((paragraph, index) =>
                        <p key={index}>{paragraph}</p>
                    )}
                </div>
            </section>
        )
    }
}

export default DisplayNote;