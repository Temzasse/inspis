import { createStore } from './smook';

import notesModel, {
  State as NotesState,
  NotesModel,
} from './components/notes/notes.model';

import searchModel, {
  State as SearchState,
  SearchModel,
} from './components/search/search.model';

export interface Models {
  notes: NotesModel;
  search: SearchModel;
}

export interface RootState {
  notes: NotesState;
  search: SearchState;
}

const store = createStore([notesModel, searchModel]);

export default store;
