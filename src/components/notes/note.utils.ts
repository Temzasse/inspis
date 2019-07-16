import { Note, NoteKind } from "./notes.types";

const hostToKind: { [host: string]: NoteKind } = {
  'twitter.com': NoteKind.Twitter,
  'medium.com': NoteKind.Medium,
  'youtu.be': NoteKind.Youtube,
  'youtube.com': NoteKind.Youtube,
};

export const getNoteKind = (note: Note): NoteKind => {
  const url = new URL(note.url);
  console.log('> Note url', url);
  return hostToKind[url.host] || NoteKind.Other;
}