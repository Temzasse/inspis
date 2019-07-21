import React from 'react';
import styled from 'styled-components';
import { FiPlusCircle } from 'react-icons/fi';

import { useModel } from '../../smook';
import { Heading } from '../common';
import { useBottomSheet } from '../common/BottomSheet';
import NewNoteForm from '../form/NewNoteForm';
import { NoteBase } from '../notes/notes.types';
import Spacing from './Spacing';

function EmptyState() {
  const notesModel = useModel('notes');
  const bottomSheet = useBottomSheet();

  const saveNote = React.useCallback(
    (note: NoteBase) => {
      notesModel.actions.saveNote(note);
      setTimeout(bottomSheet.close, 500);
    },
    [bottomSheet, notesModel.actions]
  );

  function openBottomSheet() {
    bottomSheet.open(<NewNoteForm categories={[]} saveNote={saveNote} />);
  }

  return (
    <Wrapper>
      <Heading color="#fff">Hi there!</Heading>

      <Spacing dir="y" amount={32} />

      <Heading color="#fff" variant="h2">
        Let's get started by creating our very first note.
      </Heading>

      <Spacing dir="y" amount={48} />

      <AddArea onClick={openBottomSheet}>
        <FiPlusCircle size={120} color="#170d8c" />
      </AddArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 32px;
  text-align: center;
  background: linear-gradient(140deg, #ff00a7 0%, #0c00ff) 100%;
  height: 100vh;
`;

const AddArea = styled.div`
  height: 250px;
  width: 90%;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default EmptyState;
