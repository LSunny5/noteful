import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import NotefulContext from '../../NotefulContext';
import config from '../../config';

class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => { },
    }
    static contextType = NotefulContext;

    handleClickDelete = event => {
        event.preventDefault();
        const noteId = this.props.id;
        
        //fetch code here for note
        fetch(`${config.APIEndpoint}/notes/${noteId}`, {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json'
            }, 
        })
        .then( response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
            return response.json()
        })
        .then( data => {
            this.context.deleteNote(noteId)
            this.props.deleteNote(noteId) //parent performs behavior also
        })
        .catch (error => {
            console.error({error})
        })
    }

    render() {
        const { modified, name, id } = this.props;
        return (
            <div className="note">
                <Link to={`/note/${id}`}>
                    <h2 className="noteTitle">
                        {name}
                        <div className="noteDate">
                            <div className="noteModifiedDate">
                                Modified on
                                {' '}
                                <span className='date'>
                                    {dateFormat(modified, "mmm d, yyyy")}
                                </span>
                            </div>
                        </div>
                    </h2>
                </Link>
                <button
                    className="deleteNoteButton"
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    Delete
                </button>
            </div>
        )
    }
}

export default Note;