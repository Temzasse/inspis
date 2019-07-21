import storage from 'localforage';
import { Note } from '../components/notes/notes.types';

const PREFIX = 'app@';
const NOTES_KEY = `${PREFIX}:notes`;

export const loadNotes = async () => {
  try {
    const data: null | string = await storage.getItem(NOTES_KEY);
    if (!data) return [];

    const notes: Note[] = JSON.parse(data);
    return notes;
  } catch (error) {
    console.log('> Could not load notes', error);
    return [];
  }
};

export const saveNote = async (note: Note) => {
  try {
    const currentNotes = await loadNotes();
    const notes = [...currentNotes, note];
    const data = JSON.stringify(notes);

    await storage.setItem(NOTES_KEY, data);
  } catch (error) {
    console.log('> Could not save note', note, error);
  }
};

export const removeNote = async (note: Note) => {
  try {
    const currentNotes = await loadNotes();
    const notes = currentNotes.filter(n => n.id !== note.id);
    const data = JSON.stringify(notes);

    await storage.setItem(NOTES_KEY, data);
  } catch (error) {
    console.log('> Could not remove note', note, error);
  }
};

export const saveNotes = async (notes: Note[]) => {
  for (const note of notes) {
    await saveNote(note);
  }
};

export const clear = async () => {
  try {
    await storage.clear();
  } catch (error) {
    console.log('> Could not clear storage', error);
  }
};
