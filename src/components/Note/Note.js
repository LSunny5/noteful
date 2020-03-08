import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function Note(props) {
    return (
        <div className="note">
            <Link to={`/note/${props.id}`}>
                <h2 className="noteTitle">
                    {props.name}
                    <div className="noteDate">
                        <div className="noteModifiedDate">
                            Modified on
                            {' '}
                            <span className='date'>
                                {dateFormat(props.modified, "mmm d, yyyy")}
                            </span>
                        </div>
                    </div>

                    
                </h2>
            </Link>
            <button
                        className="deleteNoteButton"
                        type='button'
                        onClick={() => props.deleteNote(props.id)}
                    >
                        Delete
            </button>
        </div>
    )
}

Note.defaultProps = {
    notes: []
}

export default Note;