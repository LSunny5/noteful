import React from 'react';
import './AddFolder.css';
import NoteForm from '../NoteForm/NoteForm';
import NotefulContext from '../../NotefulContext';
import config from '../../config';
import ValidationError from '../../ErrorFiles/ValidationError';

class AddFolder extends React.Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            checkFolderName: {
                value: '',
                touched: false
            },
            ///fetchError: null,
        }
    }

    updateFolderName(name) {
        this.setState({ checkFolderName: { value: name, touched: true } });
    }

    validateFolderName() {
        const name = this.state.checkFolderName.value.trim();
        if (name.length === 0) {
            return "A name is required...";
        } else if (name.length < 3) {
            return "Folder name must be more than 3 characters.";
        } else if (name.length > 50) {
            return "Folder name must be less than 50 characters.";
        }
    }

    handleCancel = () => {
        this.props.history.push('/');
    };

    handleSubmit = event => {
        event.preventDefault();
        const folder = { name: event.target['folderName'].value };
	//	this.setState({ fetchError: null });

        fetch(`${config.APIEndpoint}/folders`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(folder)
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(error => { throw error })
                return response.json()
            })
            .then(folder => {
                this.context.addNewFolder(folder)
                this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(error => {
               // this.setState({ fetchError: error });
               
            })
    }

    render() {
        const nameError = this.validateFolderName();
        // this.setState({ fetchError: null });

        if (this.state.fetchError) {
            return <p className="error">{this.state.fetchError}</p>;
        }

        return (
            <section className='addFolderBox'>
                <h2>Add a Folder</h2>
                <NoteForm
                    onSubmit={this.handleSubmit}
                >
                    <div className='text'>
                        <div className="errorBox">

                            {this.state.checkFolderName.touched && <ValidationError message={nameError} />}
                        </div>
                        <label htmlFor='folderName'>
                            Enter the name of the folder:
                        </label>
                        <p>Folder name must be between 3 and 50 characters.</p>
                        <input
                            type='text'
                            id='folderName'
                            autoFocus
                            onChange={e => this.updateFolderName(e.target.value)}
                        />
                    </div>

                    <div className='addFolderbuttonBox'>
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="addFolderButton"
                            disabled={this.validateFolderName()}
                        >
                            Add
                        </button>
                    </div>
                </NoteForm>
            </section>
        )
    }
}

export default AddFolder