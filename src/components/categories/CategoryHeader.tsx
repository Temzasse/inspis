import React from 'react';
import styled from 'styled-components';
import { IconButton, Heading } from '../common';
import { useBottomSheet } from '../common/BottomSheet';
import NewNoteForm from '../form/NewNoteForm';

interface Props {
  category: string;
}

function CategoryHeader({ category }: Props) {
  const { openBottomSheet } = useBottomSheet(<NewNoteForm />);
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
