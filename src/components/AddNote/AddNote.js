import React from 'react';
import './AddNote.css';
import NoteForm from '../NoteForm/NoteForm';

class AddNote extends React.Component {
    static defaultProps = {
        folders: []
    }

    render() {
        const {folders} = this.props;

        return(
            <section className="addNote">
                <h2>Add a note</h2>
                <NoteForm>
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
                        />
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
                            {folders.map(folder=> 
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