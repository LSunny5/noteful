import React from 'react';
import './Folders.css';
import { NavLink, Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';
import { numNotes } from '../noteFunctions';
import NotefulContext from '../NotefulContext';
import config from '../config';
import { getNotes } from '../noteFunctions';
import PropTypes from 'prop-types';
import FolderError from '../ErrorFiles/FolderError';

class Folders extends React.Component {
    static contextType = NotefulContext;

    handleDelete = folder => {
        //event.preventDefault();
        const folderId = folder;
        const notesInFolder = getNotes(folder);

        fetch(`${config.APIEndpoint}/folders/${folderId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(error => { throw error })
                return response.json()
            })
            .then(data => {
                this.context.deleteFolder(folderId)
                this.context.deleteNote(notesInFolder)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { folders = [] } = this.context;

        return (
            <section className="allFolders">
                <h2>Folders</h2>
                <ul className="folderList">
                    {folders.map(folder =>
                        <li
                            key={folder.id}
                            className="folderName"
                        >
                            <FolderError message="Folder could not be found.">
                                <NavLink
                                    className="folderLink"
                                    to={`/folder/${folder.id}`}
                                >
                                    <div className='nameBox'>
                                        {folder.name}
                                        <span className='numberNotes'>
                                            {' ('}{numNotes(notes, folder.id)})
                                    </span>
                                    </div>

                                    <button
                                        className="deleteFolderButton"
                                        type='button'
                                        onClick={() => this.handleDelete(folder.id)}
                                    //implement note removal later..

                                    //deleteFolder={props.deleteFolder} *removed to use context instead






                                    >
                                        Delete
                                    </button>
                                </NavLink>
                            </FolderError>
                        </li>
                    )}
                </ul>
                <NavButton
                    tag={Link}
                    to="/addFolder"
                    type='button'
                    className='addFolderButtonMain'
                >
                    + Add Folder
                </NavButton>
            </section>
        );
    }
}

Folders.propTypes = {
    folders:
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        )
}

export default Folders;