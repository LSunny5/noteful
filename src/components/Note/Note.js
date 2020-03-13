import React from 'react';
import './Note.css';
import { Link, withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import NotefulContext from '../../NotefulContext';
import config from '../../config';
import PropTypes from 'prop-types';
import NoteError from '../../ErrorFiles/NoteError';

class Note extends React.Component {
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
            .then(response => {
                if (!response.ok)
                    return response.json().then(error => Promise.reject(error))
                return response.json()
            })
            .then(data => {
                this.context.deleteNote(noteId)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error })
                alert('Could not delete note:  ' + error );
            })
    }

    render() {
        const { modified, name, id } = this.props;
        return (
            <div className="note">
                {(id) ? (
                    <NoteError>
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
                                <button
                                    className="deleteNoteButton"
                                    type='button'
                                    onClick={this.handleClickDelete}
                                >
                                    Delete
                            </button>
                            </h2>
                        </Link>
                    </NoteError>) : (<div className="noInfo">Sorry no note details were found</div>)}
            </div>
        )
    }
}

Note.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            modified: PropTypes.instanceOf(Date).isRequired
        })
    )
};

export default withRouter(Note)