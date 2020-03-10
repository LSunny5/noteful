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

    handleClickDelete = e => {
        e.preventDefault();
        
        //fetch code here for note


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