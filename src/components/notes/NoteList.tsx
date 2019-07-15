import React from 'react';
import styled from 'styled-components';
import { Note } from './notes.types';
import NoteItem from './NoteItem';

interface Props {
  notes: Note[];
}

function NoteList({ notes }: Props) {
  return (
    <Wrapper>
      {notes.map(note => (
        <NoteItem note={note} key={note.id} />
      ))}

      {notes.length > 3 && <Offset />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px;
`;

const Offset = styled.div`
  width: 16px;
  flex: none;
`;

export default NoteList;
