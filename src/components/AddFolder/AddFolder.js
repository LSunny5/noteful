import React from 'react';
import './AddFolder.css';
import NoteForm from '../NoteForm/NoteForm';

class AddFolder extends React.Component {
    addUserFolder = event => {
        event.preventDefault();

        let newFolder = {
            name: this.state.name
        }

        this.setState(
            {folders: [...this.state.folders, newFolder]}
        )
    }


    render() {
        
        return (
            <section className='addFolder'>
                <h2>Add a Folder</h2>
                <NoteForm>
                    <div className='text'>
                        <label htmlFor='folderName'>
                            Name
                        </label>
                        <input 
                            type='text'
                            id='folderName'
                        />
                    </div>

                    <div className='buttonBoxFolder'>
                        <button type='submit'>
                            Add Folder
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
    }
}

export default AddFolder