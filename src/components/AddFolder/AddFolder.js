import React from 'react';
import './AddFolder.css';
import NoteForm from '../NoteForm/NoteForm';
import NotefulContext from '../../NotefulContext';
import config from '../../config';

class AddFolder extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        history: {
            push: () => [] 
        },
    }

    handleSubmit = event => {
        event.preventDefault();
        const folder = { name: event.target['folderName'].value};

        fetch(`${config.APIEndpoint}/folders`, {
            method: 'POST', 
            headers: { 'content-type': 'application/json'}, 
            body: JSON.stringify(folder)
        })
        .then( response => {
            if (!response.ok)
                return response.json().then(e => Promise.reject(e))
            return response.json()
        })
        .then( folder => {
            this.context.addNewFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
            console.error({error})
        })
    }

    render() {
        
        return (
            <section className='addFolderBox'>
                <h2>Add a Folder</h2>
                <NoteForm 
                    onSubmit={this.handleSubmit}
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
    }
}

export default AddFolder