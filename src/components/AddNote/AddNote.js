import React from 'react';
import './AddNote.css';
import NoteForm from '../NoteForm/NoteForm';
import NotefulContext from '../../NotefulContext';
import config from '../../config';
import ValidationError from '../../ErrorFiles/ValidationError'
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.state = {
            noteName: {
                value: '',
                touched: false
            },
            noteContent: {
                value: '',
                touched: false
            },
            chooseFolder: {
                value: '',
                touched: false
            }, 
        }
    }
    
    updateName(name) {
        this.setState({ noteName: { value: name, touched: true } });
    }

    updateContent(content) {
        this.setState({ noteContent: { value: content, touched: true } });
    }

    updateFolderChoice(folder) {
        this.setState({chooseFolder: {value: folder, touched: true}});
    }

    validateName() {
        const name = this.state.noteName.value.trim();
        if (name.length === 0) {
            return "Name is required";
        } else if (name.length < 3) {
            return "Name must be at least 3 characters long";
        }
    }

    validateContent() {
        const content = this.state.noteContent.value.trim();
        if (content.length === 0) {
            return "Content is required";
        }
    }

    validateFolderChoice() {
        const choice = this.state.chooseFolder.value;
        if (choice === '') {
            return "A folder selection is needed...";
        }
    }

    handleCancel = () => {
        this.props.history.push('/');
    };

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
                alert('Error! New note was not added:  ' + error);
            })
    }

    render() {
        const { folders = [] } = this.context;
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folderError = this.validateFolderChoice();

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
                            onChange={e => this.updateName(e.target.value)}
                        />
                        <div className="errorBox">
                            {this.state.noteName.touched && <ValidationError message={nameError} />}
                        </div>
                    </div>

                    <div className='text'>
                        <label htmlFor='noteContent'>
                            Content
                        </label>
                        <textarea
                            id='noteContent'
                            required
                            onChange={e => this.updateContent(e.target.value)}
                        >
                        </textarea>
                        <div className="errorBox">
                            {this.state.noteContent.touched && <ValidationError message={contentError} />}
                        </div>
                    </div>

                    <div className='text'>
                        <label htmlFor='chooseFolder'>
                            Folder
                        </label>
                        <select
                            id='chooseFolder'
                            onChange={e => {this.updateFolderChoice(e.target.value)}}
                            defaultValue=''
                            required
                        >
                            <option
                                value=''
                                disabled
                            >
                                Please choose a folder...
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
                        <div className="errorBox">
                            {this.state.chooseFolder.touched && <ValidationError message={folderError} />}
                        </div>
                    </div>

                    <div className="buttonBox">
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="addNoteButton"
                            disabled={
                                this.validateName() ||
                                this.validateContent() ||
                                this.validateFolderChoice()
                            }
                        >
                            Add Note
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
    }
}

AddNote.propTypes = {
    folders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
}

export default AddNote