export enum NoteKind {
  Medium = 'Medium',
  Twitter = 'Twitter',
  Youtube = 'Youtube',
  Github = 'Github',
  Reddit = 'Reddit',
  Other = 'Other',
}

export interface NoteBase {
  title: string;
  url: string;
  category: string;
  tags: string[];
}

export interface Note extends NoteBase {
  id: string;
  createdAt: string;
  colors: [string, string];
}

export interface NotesById {
  [id: string]: Note;
}

export interface NotesByCategory {
  [id: string]: Note[];
}
