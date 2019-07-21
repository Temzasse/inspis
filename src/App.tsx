import React from 'react';
import styled from 'styled-components';

import { useTestData } from './utils/hooks';
import { useModel } from './smook';
import { EmptyState } from './components/common';
import Navbar from './components/nav/Navbar';
import Notes from './components/notes/Notes';
import SearchResults from './components/search/SearchResults';

function App() {
  const searchModel = useModel('search');
  const notesModel = useModel('notes');
  const showSearchResults = !!searchModel.select('searchTerm');
  const notes = notesModel.select('notesById');
  const hasNotes =
    notes.status === 'SUCCESS' && Object.keys(notes.data).length > 0;

  useTestData();

  React.useEffect(() => {
    notesModel.actions.loadNotes();
  }, []); // eslint-disable-line

  // Wait until notes have been loaded
  if (notes.status === 'INITIAL' || notes.status === 'LOADING') {
    return null;
  }

  return (
    <AppWrapper>
      <AppContent>
        {hasNotes ? (
          <>
            <Navbar />
            <Main>{showSearchResults ? <SearchResults /> : <Notes />}</Main>
          </>
        ) : (
          <EmptyState />
        )}
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
  padding: 80px 16px;
`;

export default App;
