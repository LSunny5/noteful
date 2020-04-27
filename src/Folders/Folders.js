import React from 'react';
import './Folders.css';
import { NavLink, Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';
import { numNotes } from '../noteFunctions';
import NotefulContext from '../NotefulContext';
import config from '../config';
import PropTypes from 'prop-types';
import FolderError from '../ErrorFiles/FolderError';

class Folders extends React.Component {
    static contextType = NotefulContext;

    handleDelete = folder => {
        fetch(`${config.APIEndpoint}/folders/${folder}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok)
                    return response.json().then(error => { throw error })
                //return response.json()
                return response
            })
            .then(data => {
                this.context.deleteFolder(folder)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error })
                alert('Could not delete folder:  ' + error);
            })
    }

    render() {
        const { folders = [] } = this.context;
        const { notes = [] } = this.context;

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
                                        {/* {folder.name} - for use with noteful-json-server */}
                                        {folder.title}{' '}
                                        <span className='numberNotes'>
                                            ({numNotes(notes, folder.id)})
                                    </span>
                                    </div>

                                    <button
                                        className="deleteFolderButton"
                                        type='button'
                                        onClick={() => this.handleDelete(folder.id)}
                                        aria-pressed='false'
                                        aria-label='delete folder button'
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
                    role='button'
                    aria-pressed='false'
                    aria-label='delete folder button'
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
        ),
    notes: PropTypes.array
}

export default Folders;