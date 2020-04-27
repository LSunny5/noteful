export const findFolder = (folders = [], folderId) =>
    folders.find(folder => folder.id === folderId);

export const findNote = (notes = [], noteId) =>
    //notes.find(note => note.id === noteId);
    notes.find(note => note.id === parseInt(noteId));

export const getNotes = (notes = [], folderId) => (
    (!folderId)
        ? notes
        //: notes.filter(note => note.folderId === folderId)
        : notes.filter(note => note.folder_id === parseInt(folderId))
);

export const numNotes = (notes = [], folderId) =>
    //notes.filter(note => note.folderId === folderId).length;

    //accessing data from created server
    notes.filter(note => note.folder_id === folderId).length;