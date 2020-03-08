import React from 'react';
import './AddFolder.css';
import NoteForm from '../NoteForm/NoteForm';

class AddFolder extends React.Component {
    constructor (props) {
        super (props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('folder name is ' + this.state.value);
    }

    render() {
        //let newFolder= NoteForm.folderName.value();
        return (
            <section className='addFolderBox'>
                <h2>Add a Folder</h2>
                <NoteForm 
                    
                >
                    <div className='text'>
                        <label htmlFor='folderName'>
                            Name
                        </label>
                        <input 
                            type='text'
                            id='folderName'
                            value={this.state.value}
                            onChange={this.handleChange}
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