import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function Note(props) {
    return (
        <div className="note">
            <h2 className="noteTitle">
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>

            <div className="noteDate">
                <div className="noteModifiedDate">
                    Modified on 
                    {' '}
                    <span className='date'>
                        {dateFormat(props.modified, "mmm d, yyyy")}
                    </span>
                </div>
            </div>

            <button 
                className="deleteNote"
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