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
  const closeSheetRef = React.useRef<() => any>();

  const saveNote = React.useCallback(
    (note: NoteBase) => {
      notesModel.actions.saveNote(note);
      setTimeout(() => {
        if (closeSheetRef.current) closeSheetRef.current();
      }, 500);
    },
    [notesModel.actions]
  );

  const { openBottomSheet, closeBottomSheet } = useBottomSheet(
    <NewNoteForm categories={allCategories} saveNote={saveNote} />
  );

  React.useEffect(() => {
    closeSheetRef.current = closeBottomSheet;
  });

  return (
    <Wrapper>
      <Heading variant="h2">{category}</Heading>
      <IconButton icon="plus" onClick={() => openBottomSheet()} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: -8px;
`;

export default CategoryHeader;
