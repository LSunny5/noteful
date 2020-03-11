import React from 'react';
import './AddNote.css';
import NoteForm from '../NoteForm/NoteForm';
import NotefulContext from '../../NotefulContext';
import config from '../../config';

class AddNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        history: {
            push: () => { }
        },
    }

    handleSubmit = event => {
        event.preventDefault()
        const newNote = {
            name: event.target['noteName'].value,
            content: event.target['noteContent'].value,
            folderId: event.target['chooseFolder'].value,
            modified: new Date(),
        }
        fetch(`${config.APIEndpoint}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(e => Promise.reject(e))
                return response.json()
            })
            .then(note => {
                this.context.addNewNote(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { folders = [] } = this.context;

        return (
            <section className="addNote">
                <h2>Add a note</h2>
                <NoteForm onSubmit={this.handleSubmit}>
                    <div className='text'>
                        <label htmlFor='noteName'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='noteName'
                            autoFocus
                            required
                        />
                    </div>

                    <div className='text'>
                        <label htmlFor='noteContent'>
                            Content
                        </label>
                        <textarea
                            id='noteContent'
                            required
                        >
                        </textarea>
                    </div>

                    <div className='text'>
                        <label htmlFor='chooseFolder'>
                            Folder
                        </label>
                        <select
                            id='chooseFolder'
                            required
                        >
                            <option
                                id='nullValue'
                                value={null}
                                disabled
                                selected
                                hidden
                            >
                                Please select one...
                            </option>
                            {folders.map(folder =>
                                <option
                                    key={folder.id}
                                    value={folder.id}
                                >
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="buttonBox addNoteBox">
                        <button
                            type='submit'
                            className="submitButton"
                        >
                            Add Note
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
    }
}

export default AddNote