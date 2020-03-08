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
                        />
                    </div>

                    <div className='text'>
                        <label htmlFor='noteContent'>
                            Content
                        </label>
                        <textarea id='noteContent' />
                    </div>

                    <div className='text'>
                        <label htmlFor='chooseFolder'>
                            Folder
                        </label>
                        <select id='chooseFolder'>
                            <option value={null}>Please choose one</option>
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

                    <div className="buttonBoxSubmit">
                        <button type='submit'>
                            Add Note
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
    }
}

export default AddNote