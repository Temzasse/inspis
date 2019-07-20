import React from 'react';
import styled from 'styled-components';

import { useModel } from '../../smook';
import { IconButton, Heading } from '../common';
import { useBottomSheet } from '../common/BottomSheet';
import NewNoteForm from '../form/NewNoteForm';

interface Props {
  category: string;
}

function CategoryHeader({ category }: Props) {
  const notesModel = useModel('notes');
  const allCategories = notesModel.select(notesModel.selectors.getCategories);

  const { openBottomSheet } = useBottomSheet(
    <NewNoteForm categories={allCategories} />
  );

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
