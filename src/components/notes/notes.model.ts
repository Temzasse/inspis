import { Model, effect, FetchableValue, fetchable, Action } from '../../smook';
import * as storage from '../../utils/storage';
import { guid, byDateSort } from '../../utils/common';
import { RootState } from '../../store';
import { getNoteColors } from '../../utils/color';
import { NotesById, Note, NoteBase, NotesByCategory } from './notes.types';

export interface State {
  notesById: FetchableValue<NotesById>;
}

const notesModel = {
  name: 'notes',

  state: {
    notesById: fetchable.value({}),
  },

  selectors: {
    getNotesByCategory: ({ notes }: RootState) => {
      const notesByCategory: NotesByCategory = Object.values(
        notes.notesById.data
      ).reduce((acc: any, note) => {
        if (!acc[note.category]) {
          acc[note.category] = [];
          acc[note.category].push(note);
        } else {
          acc[note.category].push(note);
          acc[note.category].sort(byDateSort);
        }

        return acc;
      }, {});

      return notesByCategory;
    },

    getLatestNote: ({ notes }: RootState) => {
      const notesArr = Object.values(notes.notesById.data);
      if (notesArr.length === 0) return null;

      notesArr.sort(byDateSort);
      return notesArr[0];
    },

    getCategories: ({ notes }: RootState) => {
      return Object.keys(
        Object.values(notes.notesById.data).reduce((acc: any, note) => {
          if (!acc[note.category]) {
            acc[note.category] = true;
          }
          return acc;
        }, {})
      );
    },
  },

  actions: {
    setNotes: fetchable.reducer<State, 'notesById'>('notesById'),

    addNote: (state: State, action: Action<Note>) => ({
      ...state,
      notesById: {
        ...state.notesById,
        data: { ...state.notesById.data, [action.payload.id]: action.payload },
      },
    }),

    loadNotes: effect(async models => {
      const notes = await storage.loadNotes();

      const notesById: NotesById = notes.reduce((acc: any, note) => {
        acc[note.id] = note;
        return acc;
      }, {});

      models.notes.actions.setNotes(fetchable.success(notesById));
    }),

    saveNote: effect(async (models, _, payload: NoteBase) => {
      const note: Note = {
        ...payload,
        id: guid(),
        createdAt: new Date().toISOString(),
        colors: getNoteColors(),
      };

      console.log('> Save note', note);

      await storage.saveNote(note);
      models.notes.actions.addNote(note);
    }),
  },
};

export type NotesModel = Model<typeof notesModel, State>;

export default notesModel;
