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

const sizeMapper = { sm: 18, lg: 28 };
const weightMapper = { sm: 600, lg: 500 };

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

const Wrapper = styled('span')<{ size: Size; shadowColor: string }>`
  font-size: ${props => sizeMapper[props.size]}px;
  font-weight: ${props => weightMapper[props.size]};
  color: #fff;
  line-height: 1.4;
  text-shadow: 2px 0px 24px ${props => props.shadowColor};
  margin-right: 8px;
`;

export default NoteTitle;
