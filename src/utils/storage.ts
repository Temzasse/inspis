import storage from 'localforage';
import { Note } from '../components/notes/notes.types';

const PREFIX = 'app@';
const NOTES_KEY = `${PREFIX}_notes`;

export const loadNotes = async () => {
  try {
    const data: null | string = await storage.getItem(NOTES_KEY);
    console.log('> Storage | data', data);
    if (!data) return [];

    const notes: Note[] = JSON.parse(data);
    console.log('> Storage | notes', notes);
    return notes;
  } catch (error) {
    console.log('> Could not load notes', error);
    return [];
  }
};

export const saveNote = async (note: Note) => {
  console.log('> Storage | save note', note);
  const currentNotes = await loadNotes();
  const notes = [...currentNotes, note];
  const data = JSON.stringify(notes);
  await storage.setItem(NOTES_KEY, data);
};

export const saveNotes = async (notes: Note[]) => {
  for (const note of notes) {
    await saveNote(note);
  }
};

export const clear = async () => {
  await storage.clear();
};
