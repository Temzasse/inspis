import { Model, effect, FetchableValue, fetchable, Action } from '../../smook';
import * as storage from '../../utils/storage';
import { guid, byDateSort } from '../../utils/common';
import { RootState } from '../../store';
import { getNoteColors } from '../../utils/color';
import { NotesById, Note, NoteBase, NotesByCategory } from './notes.types';

export interface State {
  notesById: FetchableValue<NotesById>;
  isEditing: boolean;
}

const notesModel = {
  name: 'notes',

  state: {
    notesById: fetchable.value({}),
    isEditing: false,
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
    setEditing: (state: State, action: Action<boolean>) => ({
      ...state,
      isEditing: action.payload,
    }),

    setNotes: fetchable.reducer<State, 'notesById'>('notesById'),

    addNote: (state: State, action: Action<Note>) => ({
      ...state,
      notesById: {
        ...state.notesById,
        data: { ...state.notesById.data, [action.payload.id]: action.payload },
      },
    }),

    removeNote: (state: State, action: Action<Note>) => {
      const { notesById: { data: notes } } = state;
      const { [action.payload.id]: noteToRemove, ...remainingNotes } = notes;

      return {
        ...state,
        notesById: {
          ...state.notesById,
          data: remainingNotes,
        },
      };
    },

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

    deleteNote: effect(async (models, _, payload: Note) => {
      await storage.removeNote(payload);
      models.notes.actions.removeNote(payload);
    }),
  },
};

export type NotesModel = Model<typeof notesModel, State>;

export default notesModel;
