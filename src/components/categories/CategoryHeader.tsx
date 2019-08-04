import React from 'react';
import styled from 'styled-components';

import { useModel } from '../../smook';
import { IconButton, Heading } from '../common';
import { useBottomSheet } from '../common/BottomSheet';
import NewNoteForm from '../form/NewNoteForm';
import { NoteBase } from '../notes/notes.types';

interface Props {
  category: string;
}

function CategoryHeader({ category }: Props) {
  const notesModel = useModel('notes');
  const allCategories = notesModel.select(notesModel.selectors.getCategories);
  const bottomSheet = useBottomSheet();

  const saveNote = React.useCallback(
    (note: NoteBase) => {
      notesModel.actions.saveNote(note);
      setTimeout(bottomSheet.close, 500);
    },
    [bottomSheet, notesModel.actions]
  );

  function openBottomSheet() {
    bottomSheet.open(
      <NewNoteForm
        categories={allCategories}
        initialCategory={category}
        saveNote={saveNote}
      />
    );
  }

  return (
    <Wrapper>
      <Heading variant="h2">{category}</Heading>
      <div style={{ flex: 1 }} />
      <IconButton icon="plus" onClick={openBottomSheet} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: -8px;
`;

export default CategoryHeader;
