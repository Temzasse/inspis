import React from 'react';
import styled from 'styled-components';
import { TextInput, Spacing, Heading } from '../common';

interface Props {
  foo?: any;
}

function NewNoteForm({ foo }: Props) {
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  return (
    <Wrapper>
      <Heading variant="h2">New note</Heading>
      <Spacing dir="y" amount={32} />
      <TextInput value={url} onTextChange={setUrl} label="URL" />
      <Spacing dir="y" amount={24} />
      <TextInput value={title} onTextChange={setTitle} label="Title" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export default NewNoteForm;
