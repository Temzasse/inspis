import { Note, NoteKind } from "./notes.types";

const hostToKind: { [host: string]: NoteKind } = {
  'twitter.com': NoteKind.Twitter,
  'medium.com': NoteKind.Medium,
  'link.medium.com': NoteKind.Medium,
  'youtu.be': NoteKind.Youtube,
  'youtube.com': NoteKind.Youtube,
  'github.com': NoteKind.Github,
  'reddit.com': NoteKind.Reddit,
  'www.reddit.com': NoteKind.Reddit,
};

export const getNoteKind = (note: Note): NoteKind => {
  const url = new URL(note.url);
  return hostToKind[url.host] || NoteKind.Other;
}