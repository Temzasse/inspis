import React from 'react';
import styled from 'styled-components';

import { DIMENSIONS } from './constants';
import NoteList from './components/notes/NoteList';
import { useModel } from './smook';
import LatestNote from './components/notes/LatestNote';
import { Spacing, Heading } from './components/common';
import CategoryHeader from './components/categories/CategoryHeader';
import { useTestData } from './utils/hooks';
import Navbar from './components/nav/Navbar';

function App() {
  const notesModel = useModel('notes');
  const { loadNotes } = notesModel.actions;
  const latestNote = notesModel.select(notesModel.selectors.getLatestNote);
  const notesByCategory = notesModel.select(
    notesModel.selectors.getNotesByCategory
  );

  React.useEffect(() => {
    loadNotes();
  }, []); // eslint-disable-line

  useTestData();

  return (
    <AppWrapper>
      <AppContent>
        <Navbar />

        <Main>
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
        </Main>
      </AppContent>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

const AppContent = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    max-width: 480px;
  }
`;

const Main = styled.main`
  flex: 1;
  padding-top: 92px;
  padding-bottom: 32px;
  padding-left: 16px;
  padding-right: 16px;
`;

const NotesSection = styled.section`
  margin-right: -16px;
  margin-left: -16px;
`;

export default App;
