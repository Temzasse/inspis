import React from 'react';
import styled from 'styled-components';

import { useModel } from '../../smook';
import NoteList from './NoteList';
import LatestNote from './LatestNote';
import { Spacing, Heading } from '../common';
import CategoryHeader from '../categories/CategoryHeader';

function Notes() {
  const notesModel = useModel('notes');
  const isEditingNotes = notesModel.select('isEditing');
  const latestNote = notesModel.select(notesModel.selectors.getLatestNote);
  const notesByCategory = notesModel.select(
    notesModel.selectors.getNotesByCategory
  );

  return (
    <>
      {latestNote && (
        <>
          <Heading>Latest</Heading>
          <Spacing dir="y" />
          <LatestNote note={latestNote} />
        </>
      )}

      <Spacing dir="y" amount={48} />

      {Object.entries(notesByCategory).map(([category, notes]) => (
        <div key={category}>
          <CategoryHeader category={category} />
          <NotesSection>
            <NoteList
              notes={notes}
              isEditing={isEditingNotes}
              deleteNote={notesModel.actions.deleteNote}
            />
          </NotesSection>
          <Spacing dir="y" amount={40} />
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
