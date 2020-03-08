import React from 'react';
import './DisplayNote.css';
import Note from '../Note/Note';

function DisplayNote(props) {
    return (
        <section className="displayNote">
            <Note
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
            />
            <div className="noteDesc">
                {props.note.content.split(/\n \r|\n/).map((paragraph, index) =>
                    <p key={index}>{paragraph}</p>
                )}
            </div>
        </section>
    )
}

DisplayNote.defaultProps = {
    note: {
        content: ''
    }
}

export default DisplayNote;