import React from 'react';
import styled from 'styled-components';

import { DIMENSIONS } from '../../constants';
import { Note } from './notes.types';
import { getNoteBG } from '../../utils/color';
import NoteKindIcon from './NoteKindIcon';
import NoteTitle from './NoteTitle';
import NoteTags from './NoteTags';
import { Spacing } from '../common';

interface Props {
  note: Note;
}

function NoteItem({ note }: Props) {
  const bg = getNoteBG(note);

  return (
    <Wrapper
      bg={bg}
      href={note.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NoteTitle note={note} />

      <Spacing dir="y" amount={8} />

      {note.tags.length > 0 && <NoteTags tags={note.tags} />}

      <div style={{ flex: 1 }} />

      <NoteFooter>
        <NoteKindIcon note={note} />
      </NoteFooter>
    </Wrapper>
  );
}

const getNoteWidth = () => Math.max(DIMENSIONS.width * (5 / 11) - 16, 160);

const Wrapper = styled('a')<{ bg: string }>`
  width: ${getNoteWidth()}px;
  height: 200px;
  border-radius: 18px;
  background: ${props => props.bg};
  flex: none;
  padding: 12px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
`;

const NoteFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default NoteItem;
