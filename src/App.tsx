import React from 'react';
import styled from 'styled-components';

import { DIMENSIONS } from './constants';
import NoteList from './components/notes/NoteList';
import { useModel } from './smook';
// import testData from './testData.json';
// import * as storage from './utils/storage';

function App() {
  const notesModel = useModel('notes');
  const { loadNotes } = notesModel.actions;

  const latestNote = notesModel.select(notesModel.selectors.getLatesNote);
  const notesByCategory = notesModel.select(
    notesModel.selectors.getNotesByCategory
  );

  React.useEffect(() => {
    loadNotes();
    // storage.clear();
    // storage.saveNotes(testData as any);
  }, []); // eslint-disable-line

  return (
    <AppWrapper>
      <AppContent>
        <Nav />
        <Main>
          {latestNote && (
            <>
              <h1>Latest inspiry</h1>

              <NotesSection>
                <NoteList notes={[latestNote]} />
              </NotesSection>
            </>
          )}

          {Object.entries(notesByCategory).map(([category, notes]) => (
            <div key={category}>
              <h2>{category}</h2>
              <NotesSection>
                <NoteList notes={notes} />
              </NotesSection>
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
  padding: 16px;
`;

const Nav = styled.nav`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
`;

const NotesSection = styled.section`
  margin-right: -16px;
  margin-left: -16px;
  margin-bottom: 32px;
`;

export default App;
