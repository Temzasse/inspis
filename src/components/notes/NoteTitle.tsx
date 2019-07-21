import React from 'react';
import color from 'color';
import styled from 'styled-components';

import { truncate } from '../../utils/common';
import { Note } from './notes.types';

type Size = 'sm' | 'lg';

interface Props {
  note: Note;
  size?: Size;
}

function NoteTitle({ note, size = 'sm' }: Props) {
  const shadowColor = color(note.colors[1])
    .darken(0.6)
    .string();

  return (
    <Wrapper size={size} shadowColor={shadowColor}>
      {truncate(note.title, 40)}
    </Wrapper>
  );
}

type P = { size: Size };
const fontSize = (p: P) => ({ sm: 18, lg: 32 }[p.size]);
const fontWeight = (p: P) => ({ sm: 600, lg: 500 }[p.size]);
const lineHeight = (p: P) => ({ sm: 1.4, lg: 1.2 }[p.size]);

const Wrapper = styled('span')<{ size: Size; shadowColor: string }>`
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  color: #fff;
  text-shadow: 2px 0px 24px ${props => props.shadowColor};
  margin-right: 8px;
`;

export default NoteTitle;
