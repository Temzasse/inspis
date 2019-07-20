import React from 'react';
import styled from 'styled-components';

import { DIMENSIONS } from './constants';
import NoteList from './components/notes/NoteList';
import { useModel } from './smook';
import LatestNote from './components/notes/LatestNote';
import { Spacing, Heading } from './components/common';
import CategoryHeader from './components/categories/CategoryHeader';
import { useTestData } from './utils/hooks';

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
        <Nav />
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
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
`;

const AppContent = styled.div`
  height: 100vh;
  width: 100%;
  max-width: ${DIMENSIONS.width}px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 32px 16px;
`;

const Nav = styled.nav`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
`;

const NotesSection = styled.section`
  margin-right: -16px;
  margin-left: -16px;
`;

export default App;
