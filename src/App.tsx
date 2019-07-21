import React from 'react';
import styled from 'styled-components';

import { useModel } from './smook';
import { useTestData } from './utils/hooks';
import Navbar from './components/nav/Navbar';
import Notes from './components/notes/Notes';
import SearchResults from './components/search/SearchResults';

function App() {
  const searchModel = useModel('search');
  const showSearchResults = !!searchModel.select('searchTerm');

  useTestData();

  return (
    <AppWrapper>
      <AppContent>
        <Navbar />
        <Main>{showSearchResults ? <SearchResults /> : <Notes />}</Main>
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

export default App;
