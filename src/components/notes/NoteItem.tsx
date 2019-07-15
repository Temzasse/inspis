import React from 'react';
import styled from 'styled-components';
import { DIMENSIONS } from '../../constants';
import { Note } from './notes.types';
import { getNoteBG } from '../../utils/color';

interface Props {
  note: Note;
}

function NoteItem({ note }: Props) {
  const bg = getNoteBG(note);
  return (
    <Wrapper bg={bg}>
      <NoteTitle>{note.title}</NoteTitle>
    </Wrapper>
  );
}

const Wrapper = styled('div')<{ bg: string }>`
  width: ${DIMENSIONS.width * (5 / 11) - 16}px;
  height: 200px;
  border-radius: 22px;
  background: ${props => props.bg};
  margin-left: 16px;
  flex: none;
  padding: 12px;
  text-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-left: 0px;
  }
`;

const NoteTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1.45;
`;

export default NoteItem;
