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
                            <span className='numberNotes'>
                                {numNotes(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>

                        <button 
                className="deleteFolder"
                type='button'
                onClick={() => props.deleteFolder(folder.id)}
            >
                Delete
            </button>
                    </li>
                )}
            </ul>

            <div className="buttonBoxFolder">
                <NavButton
                    tag={Link}
                    to="/addFolder"
                    type='button'
                    className='addFolderButton'
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