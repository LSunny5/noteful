import React from 'react';
import './DisplayNote.css';
import Note from '../Note/Note';
import NotefulContext from '../../NotefulContext';
import { findNote } from '../../noteFunctions';
import PropTypes from 'prop-types';

class DisplayNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        match: {
            params: {}
        }
    }

    render() {
        const { notes = [] } = this.context;
        //const { noteId } = this.props.match.params;
        const { note_id } = this.props.match.params;
        //const note = findNote(notes, noteId) || { content: '' }
        const note = findNote(notes, note_id) || { content: '' }
        return (
            <section className="displayNote">
                <Note
                    id={note.id}
                    //name={note.name}
                    title={note.title}
                    modified={note.modified}
                    history={this.props.history}
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

Note.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            //name: PropTypes.string.isRequired,
            modified: PropTypes.instanceOf(Date).isRequired, 
			content: PropTypes.string.isRequired,
		})
	)
};

export default DisplayNote;