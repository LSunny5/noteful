export const findFolder = (folders = [], folderId) =>
    folders.find(folder => folder.id === folderId);

export const findNote = (notes = [], noteId) =>
    notes.find(note => note.id === noteId);


export const getNotes = (notes = [], folderId) => (
    (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
);

export const numNotes = (notes = [], folderId) =>
    notes.filter(note => note.folderId === folderId).length;