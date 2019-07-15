import { createStore } from './smook';

import notesModel, {
  State as NotesState,
  NotesModel,
} from './components/notes/notes.model';

export interface Models {
  notes: NotesModel;
}

export interface RootState {
  notes: NotesState;
}

const store = createStore([notesModel]);

export default store;
