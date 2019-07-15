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

const gradientCache: { [id: string]: string } = {};

export const generateGradient = (note: Note) => {
  if (gradientCache[note.id]) return gradientCache[note.id];

  const rot = 110 * (Math.random() > 0.5 ? 1 : -1);
  const hex = colorsByNoteKind[note.kind] || randomColor();
  const hex2 = color(hex)
    .rotate(rot)
    .darken(0.1);

  const gradient = `linear-gradient(180deg, ${hex2} 0%, ${hex}) 100%`;
  gradientCache[note.id] = gradient;

  return gradient;
};
