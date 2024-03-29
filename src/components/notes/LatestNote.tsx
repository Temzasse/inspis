import React from 'react';
import styled from 'styled-components';

import { Note } from './notes.types';
import { getNoteBG } from '../../utils/color';
import NoteKindIcon from './NoteKindIcon';
import NoteTitle from './NoteTitle';
import NoteTags from './NoteTags';
import { Spacing } from '../common';

interface Props {
  note: Note;
}

function LatestNote({ note }: Props) {
  const bg = getNoteBG(note);

  return (
    <Wrapper bg={bg} href={note.url} target="_blank" rel="noopener noreferrer">
      <NoteTitle note={note} size="lg" />

      <Spacing dir="y" amount={12} />

      {note.tags.length > 0 && <NoteTags tags={note.tags} size="lg" />}

      <div style={{ flex: 1 }} />

      <NoteFooter>
        <NoteKindIcon note={note} size="lg" />
      </NoteFooter>
    </Wrapper>
  );
}

const Wrapper = styled('a')<{ bg: string }>`
  width: 100%;
  height: 250px;
  border-radius: 22px;
  background: ${props => props.bg};
  padding: 14px 18px 18px 18px;
  text-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const NoteFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default LatestNote;
