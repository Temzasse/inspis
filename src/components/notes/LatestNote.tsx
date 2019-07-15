import React from 'react';
import styled from 'styled-components';
import { DIMENSIONS } from '../../constants';
import { Note } from './notes.types';
import { getNoteBG } from '../../utils/color';

interface Props {
  note: Note;
}

function LatestNote({ note }: Props) {
  const bg = getNoteBG(note);
  return (
    <Wrapper bg={bg}>
      <NoteTitle>{note.title}</NoteTitle>
    </Wrapper>
  );
}

const Wrapper = styled('div')<{ bg: string }>`
  width: 100%;
  height: ${DIMENSIONS.width * (3 / 5)}px;
  border-radius: 22px;
  background: ${props => props.bg};
  padding: 16px 24px;
  text-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const NoteTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.45;
`;

export default LatestNote;
