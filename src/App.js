import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import dummyStore from './dummy-store';

import Header from './Header/Header';
import Folders from './Folders/Folders';
import Notes from './Notes/Notes';
import DisplayNote from './components/DisplayNote/DisplayNote';
import DisplayNoteFolder from './components/DisplayNoteFolder/DisplayNoteFolder';
import NotefulContext from './NotefulContext';
import config from './config';

import AddFolder from './components/AddFolder/AddFolder';
import AddNote from './components/AddNote/AddNote';


import { findFolder, findNote, getNotes } from './noteFunctions';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  handleDeleteNote = noteId => {
    const notesArray = this.state.notes.filter(note => note.id !== noteId);
    this.setState({ notes: notesArray });
  }





  handleDeleteFolder = (folderNum, noteId) => {
    const folderArray = this.state.folders.filter(folder => folder.id !== folderNum);
    this.setState({ folders: folderArray });

    // getNotes;
  }

  /*Add later
  
    addNote = note => {
      this.setState({ notes: [...this.state.notes, note]});
    };
  
    addNewFolder = newFolder => {
  
      this.setState({folders: [...this.state.folders, newFolder]});
      console.log('folder added')
      //this.setState({folders: this.state.folders.concat(newFolder)})
    };
    
  */

  renderFolderRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            key={path}
            path={path}
            exact
            render={routeProps =>
              <Folders
                folders={folders}
                notes={notes}
                {...routeProps}
                deleteFolder={this.deleteFolder}
              />
            }
          />
        )}

        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);

            return (
              <DisplayNoteFolder
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />

        <Route
          path='/addFolder'
          component={DisplayNoteFolder}
        />

        <Route
          path='/addNote'
          component={DisplayNoteFolder}
        />
      </>
    );
  }

  renderNoteRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            key={path}
            path={path}
            exact
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotes(notes, folderId);

              return (
                <Notes
                  {...routeProps}
                  notes={notesForFolder}
                  deleteNote={this.deleteNote}
                />
              );
            }}
          />
        ))}

        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);

            return (
              <DisplayNote
                {...routeProps}
                note={note}
                deleteNote={this.deleteNote}
              />
            );
          }}
        />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className='App'>
          <Header />
          <main>
            <nav className="folderList">
              {this.renderFolderRoutes()}
            </nav>
            <section className="noteList">
              {this.renderNoteRoutes()}
            </section>
          </main>
        </div>
      </NotefulContext.Provider>

    );
  }
}

export default App;