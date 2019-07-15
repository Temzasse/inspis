export enum NoteKind {
  Medium = 'Medium',
  Twitter = 'Twitter',
  Other = 'Other',
}

export interface NoteBase {
  title: string;
  url: string;
  kind: NoteKind;
  category: string;
  tags: string[];
}

export interface Note extends NoteBase {
  id: string;
  createdAt: string;
}

export interface NotesById {
  [id: string]: Note;
}

export interface NotesByCategory {
  [id: string]: Note[];
}
