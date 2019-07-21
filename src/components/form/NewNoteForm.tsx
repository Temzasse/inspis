import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

import { TextInput, Spacing, Heading, MotionButton } from '../common';
import { NoteBase } from '../notes/notes.types';
import { isValidUrl } from '../../utils/common';

interface Props {
  categories: string[];
  initialCategory?: string;
  saveNote: (note: NoteBase) => any;
}

const parseTags = (tags: string) =>
  tags
    .split(',')
    .filter(Boolean)
    .map(t => t.trim());

function NewNoteForm({ categories, initialCategory = '', saveNote }: Props) {
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState(initialCategory);
  const [tagsStr, setTagsStr] = React.useState('');
  const [error, setError] = React.useState<null | string>(null);
  const [newCategory, setNewCategory] = React.useState<null | string>(
    categories.length > 0 ? null : ''
  );

  function validateNote(note: NoteBase) {
    if (!note.title) return false;
    if (!isValidUrl(note.url)) return false;
    if (!note.category) return false;
    if (note.tags.length > 3) return false;
    return true;
  }

  function _saveNote() {
    const tags = parseTags(tagsStr);
    const cat = newCategory || category;
    const note: NoteBase = { url, title, category: cat, tags };
    const noteValid = validateNote(note);

    if (noteValid) {
      console.log('> Save note', note);
      saveNote(note);
    } else {
      setError('Check the inputs!');
    }
  }

  // Clear error when inputs change
  React.useEffect(() => {
    setError(null);
  }, [url, title, category, newCategory, tagsStr]);

  return (
    <Wrapper>
      <Heading variant="h2">New note</Heading>

      <Spacing dir="y" amount={24} />

      {newCategory !== null ? (
        <>
          <TextInput
            value={newCategory}
            onTextChange={setNewCategory}
            label="Category"
            required
          />
          {categories.length > 0 && (
            <>
              <Spacing dir="y" amount={8} />
              <ClearNewCategory onTap={() => setNewCategory(null)}>
                <FiArrowLeft />
                <Spacing dir="x" amount={4} />
                Select existing category
              </ClearNewCategory>
            </>
          )}
        </>
      ) : (
        <Categories>
          {categories.map(c => (
            <CategoryButton
              key={c}
              selected={category === c}
              onTap={() => setCategory(c)}
            >
              {c}
            </CategoryButton>
          ))}

          <CategoryButton onTap={() => setNewCategory('')}>
            <FaPlus size={10} color="#222" />
            <Spacing dir="x" amount={4} />
            NEW
          </CategoryButton>
        </Categories>
      )}

      <Spacing dir="y" amount={24} />

      <TextInput value={url} onTextChange={setUrl} label="URL" required />

      <Spacing dir="y" amount={24} />

      <TextInput value={title} onTextChange={setTitle} label="Title" required />

      <Spacing dir="y" amount={24} />

      <TextInput
        value={tagsStr}
        onTextChange={setTagsStr}
        label="Tags"
        labelInfo="comma separated (max 3)"
        placeholder="Eg. react, hooks, material"
      />

      <Spacing dir="y" amount={24} />

      <MotionButton onTap={_saveNote}>Save</MotionButton>

      <Spacing dir="y" amount={16} />

      {error && (
        <ErrorMessage>
          <FiAlertTriangle size={16} />
          <Spacing amount={6} />
          {error}
        </ErrorMessage>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryButton = styled(motion.button)<{ selected?: boolean }>`
  outline: none;
  background-color: #fff;
  border: 1px solid ${props => (props.selected ? '#222' : '#ddd')};
  border-radius: 99px;
  height: 24px;
  padding: 0px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 10px;
  color: #222;
`;

const ClearNewCategory = styled(motion.button)`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background: none;
  padding: 0;
  font-size: 12px;
`;

const ErrorMessage = styled.div`
  color: #e40404;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default NewNoteForm;
