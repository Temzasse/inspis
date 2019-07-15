import color from 'color';
import { NoteKind, Note } from '../components/notes/notes.types';
import { randomNumBetween } from './common';

const colorsByNoteKind = {
  [NoteKind.Medium]: '#00ab6c',
  [NoteKind.Twitter]: '#1da1f2',
  [NoteKind.Other]: undefined,
};

const randomColor = () => {
  let hue = randomNumBetween(0, 360);
  const saturation = 100;
  const lightness = 50;
  const hex = color.hsl(hue, saturation, lightness).string();
  return hex;
};

export const getNoteColors = (kind: NoteKind): [string, string] => {
  const rot = 110 * (Math.random() > 0.5 ? 1 : -1);
  const c1 = colorsByNoteKind[kind] || randomColor();
  const c2 = color(c1)
    .rotate(rot)
    .darken(0.1)
    .string();

  return [c1, c2];
};

const gradientCache: { [id: string]: string } = {};

export const getNoteBG = (note: Note) => {
  if (gradientCache[note.id]) return gradientCache[note.id];

  const [c1, c2] = note.colors;
  const gradient = `linear-gradient(140deg, ${c2} 0%, ${c1}) 100%`;

  gradientCache[note.id] = gradient;
  return gradient;
};
