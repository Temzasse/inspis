import React from 'react';
import styled from 'styled-components';

import { useModel } from '../../smook';
import NoteList from './NoteList';
import LatestNote from './LatestNote';
import { Spacing, Heading } from '../common';
import CategoryHeader from '../categories/CategoryHeader';

function Notes() {
  const notesModel = useModel('notes');
  const latestNote = notesModel.select(notesModel.selectors.getLatestNote);
  const notesByCategory = notesModel.select(
    notesModel.selectors.getNotesByCategory
  );

  React.useEffect(() => {
    notesModel.actions.loadNotes();
  }, []); // eslint-disable-line

  return (
    <>
      {latestNote && (
        <>
          <Heading>Latest</Heading>
          <Spacing dir="y" amount={32} />
          <LatestNote note={latestNote} />
        </>
      )}

      <Spacing dir="y" amount={40} />

      {Object.entries(notesByCategory).map(([category, notes]) => (
        <div key={category}>
          <CategoryHeader category={category} />
          <Spacing dir="y" amount={24} />
          <NotesSection>
            <NoteList notes={notes} />
          </NotesSection>
          <Spacing dir="y" amount={32} />
        </div>
      ))}
    </>
  );
}

const NotesSection = styled.section`
  margin-right: -16px;
  margin-left: -16px;
`;

export default Notes;
