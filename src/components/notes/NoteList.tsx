import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import { Note } from './notes.types';
import NoteItem from './NoteItem';
import { randomNumBetween } from '../../utils/common';

interface Props {
  notes: Note[];
  isEditing: boolean;
  deleteNote: (note: Note) => any;
}

function NoteList({ notes, isEditing, deleteNote }: Props) {
  return (
    <Wrapper>
      <AnimatePresence>
        {notes.map(note => (
          <NoteItemWrapper
            key={note.id}
            removable={isEditing}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NoteItem note={note} key={note.id} />

            {isEditing && (
              <DeleteNote
                onClick={() => deleteNote(note)}
                style={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <FaTimes size={16} />
              </DeleteNote>
            )}
          </NoteItemWrapper>
        ))}
      </AnimatePresence>

      {notes.length > 2 && <Offset />}
    </Wrapper>
  );
}

const jiggleAnim = keyframes`
  0% {
    transform: rotate(0deg) translate(1px, 1px);
  }
  25% {
    transform: rotate(1.5deg) translate(0px, 0px);
  }
  50% {
    transform: rotate(0deg) translate(-1px, 1px);
  }
  75% {
    transform: rotate(-1.5deg) translate(0px, 0px);
  }
  100% {
    transform: rotate(0deg) translate(1px, -1px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  padding: 16px 16px;
`;

const Offset = styled.div`
  width: 16px;
  flex: none;
`;

const NoteItemWrapper = styled(motion.div)<{ removable: boolean }>`
  position: relative;
  margin-left: 16px;
  transform-origin: center center;
  animation: ${props => (props.removable ? jiggleAnim : 'none')};
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-duration: 300ms;
  animation-timing-function: ease;
  animation-delay: ${randomNumBetween(300, 450)}ms;

  &:first-child {
    margin-left: 0px;
  }
`;

const DeleteNote = styled(motion.div)`
  position: absolute;
  top: -12px;
  left: -8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #222;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NoteList;
