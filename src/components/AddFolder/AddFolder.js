import React from 'react';
import './AddFolder.css';
import NoteForm from '../NoteForm/NoteForm';

//class AddFolder extends React.Component {

    function AddFolder (props) {


    //render() {
        
        return (
            <section className='addFolderBox'>
                <h2>Add a Folder</h2>
                <NoteForm 
                    onSubmit={() => props.addNewFolder(this.NoteForm.folderName.value)}

                >
                    <div className='text'>
                        <label htmlFor='folderName'>
                            Name
                        </label>
                        <input 
                            type='text'
                            id='folderName'
                            

                            placeholder="Please enter folder name..."
                            autoFocus
                        />
                    </div>

                    <div className='buttonBox'>
                        <button 
                            type='submit'
                            className="submitButton"
                    >
                        Add Folder
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
  //  }
}

export default AddFolder