import React from 'react';
import './Folders.css';
import { NavLink, Link } from 'react-router-dom';
import NavButton from '../components/NavButton/NavButton';
import { numNotes } from '../noteFunctions';

function Folders(props) {
    return (
        <section className="allFolders">
            <h2>Folders</h2>
            <ul className="folderList">
                {props.folders.map(folder =>
                    <li
                        key={folder.id}
                        className="folderName"
                    >
                        <NavLink
                            className="folderLink"
                            to={`/folder/${folder.id}`}
                        >
                            <div className='nameBox'> 
                                {folder.name}
                                <span className='numberNotes'>
                                    {' ('}{numNotes(props.notes, folder.id)})
                                </span>
                            </div>
                            <button
                                className="deleteFolderButton"
                                type='button'
                                onClick={() => props.deleteFolder(folder.id)}
                            >
                                Delete
                        </button>
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className="buttonBox">
                <NavButton
                    tag={Link}
                    to="/addFolder"
                    type='button'
                    className='addButton'
                >
                    + Add Folder
                </NavButton>
            </div>

        </section>
    );
}

Folders.defaultProps = {
    folders: []
}

export default Folders;