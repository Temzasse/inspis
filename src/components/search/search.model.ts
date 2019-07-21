import { Model, Action } from '../../smook';
import { RootState } from '../../store';
import { Note } from '../notes/notes.types';

export interface State {
  searchTerm: string;
}

const searchModel = {
  name: 'search',

  state: {
    searchTerm: '',
  },

  selectors: {
    getSearchResults: ({ notes, search }: RootState) => {
      const searchTerm = search.searchTerm.toLowerCase();
      const allNotes = Object.values(notes.notesById.data);

      return allNotes
        .reduce((results: Note[], note) => {
          const { title, tags } = note;
          if (title.toLowerCase().includes(searchTerm)) {
            // First add direct title matches
            results.push(note);
          } else if (
            tags.map(t => t.toLowerCase()).filter(t => t.includes(searchTerm))
              .length > 0
          ) {
            // Then matches by tags
            results.push(note);
          }
          return results;
        }, [])
        .sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
    },
  },

  actions: {
    setSearchTerm: (state: State, action: Action<string>) => ({
      ...state,
      searchTerm: action.payload,
    }),

    clearSearchTerm: (state: State) => ({
      ...state,
      searchTerm: '',
    }),
  },
};

export type SearchModel = Model<typeof searchModel, State>;

export default searchModel;
