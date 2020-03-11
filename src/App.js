import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
//import dummyStore from './dummy-store';

import Header from './Header/Header';
import Folders from './Folders/Folders';
import Notes from './Notes/Notes';
import DisplayNote from './components/DisplayNote/DisplayNote';
import DisplayNoteFolder from './components/DisplayNoteFolder/DisplayNoteFolder';
import AddFolder from './components/AddFolder/AddFolder';
import AddNote from './components/AddNote/AddNote';

import NotefulContext from './NotefulContext';
import config from './config';



class App extends React.Component {
  static contextType = NotefulContext;

  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    //use for using dummyStore
    //setTimeout(() => this.setState(dummyStore), 600);

    Promise.all([
      fetch(`${config.APIEndpoint}/notes`),
      fetch(`${config.APIEndpoint}/folders`),
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(event => Promise.reject(event));
        if (!foldersResponse.ok)
          return notesResponse.json().then(event => Promise.reject(event));
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  deleteNote = noteId => {
    const notesArray = this.state.notes.filter(note => note.id !== noteId);
    this.setState({ notes: notesArray });
  }









  //do later
  handleDeleteFolder = (folderNum, noteId) => {
    const folderArray = this.state.folders.filter(folder => folder.id !== folderNum);
    this.setState({ folders: folderArray });

    // getNotes;
  }








  addNewFolder = newFolder => {
    this.setState({ folders: [...this.state.folders, newFolder] });
    console.log('folder added')
    //this.setState({folders: this.state.folders.concat(newFolder)})
  };

  addNewNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
  };

 








  renderFolderRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            key={path}
            path={path}
            exact
            component={Folders}
          />
        ))}

        <Route
          path='/note/:noteId'
          component={DisplayNoteFolder}
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
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            key={path}
            path={path}
            exact
            component={Notes}
          />
        ))}

        <Route
          path='/note/:noteId'
          component={DisplayNote}
        />
        <Route
          path='/addFolder'
          component={AddFolder}
        />

        <Route
          path='/addNote'
          component={AddNote}
        />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addNewFolder: this.addNewFolder, 
      addNewNote: this.addNewNote
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