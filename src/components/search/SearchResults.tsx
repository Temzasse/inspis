import React from 'react';
import styled from 'styled-components';

import { useModel } from '../../smook';
import { getNoteBG } from '../../utils/color';
import { Spacing } from '../common';
import NoteKindIcon from '../notes/NoteKindIcon';

function SearchResults() {
  const searchModel = useModel('search');
  const searchResults = searchModel.select(
    searchModel.selectors.getSearchResults
  );

  return (
    <Wrapper>
      {searchResults.map(note => {
        const bg = getNoteBG(note);

        return (
          <Result
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            key={note.id}
          >
            <NoteKindWrapper bg={bg}>
              <NoteKindIcon note={note} />
            </NoteKindWrapper>
            <Spacing />
            <NoteContent>{note.title}</NoteContent>
          </Result>
        );
      })}

      {searchResults.length === 0 && <NoResults>No results</NoResults>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Result = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const NoteKindWrapper = styled('div')<{ bg: string }>`
  flex: none;
  background: ${props => props.bg};
  height: 48px;
  width: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoteContent = styled.div`
  flex: 1;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  color: #222;
  font-weight: 500;
`;

const NoResults = styled.p`
  text-align: center;
  margin: 0;
`;

export default SearchResults;
