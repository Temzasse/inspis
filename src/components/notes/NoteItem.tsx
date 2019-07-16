import React from 'react';
import styled from 'styled-components';

import { DIMENSIONS } from '../../constants';
import { Note } from './notes.types';
import { getNoteBG } from '../../utils/color';
import NoteKindIcon from './NoteKindIcon';
import NoteTitle from './NoteTitle';

interface Props {
  note: Note;
}

function NoteItem({ note }: Props) {
  const bg = getNoteBG(note);
  return (
    <Wrapper bg={bg} href={note.url} target="_blank" rel="noopener noreferrer">
      <NoteTitle note={note} />
      <div style={{ flex: 1 }} />
      <NoteFooter>
        <NoteKindIcon note={note} />
      </NoteFooter>
    </Wrapper>
  );
}

const Wrapper = styled('a')<{ bg: string }>`
  width: ${DIMENSIONS.width * (5 / 11) - 16}px;
  height: 200px;
  border-radius: 18px;
  background: ${props => props.bg};
  margin-left: 16px;
  flex: none;
  padding: 12px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:first-child {
    margin-left: 0px;
  }
`;

const NoteFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default NoteItem;
