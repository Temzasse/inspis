import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useModel } from '../../smook';
import { IconButton, Spacing } from '../common';
import { useBottomSheet } from '../common/BottomSheet';
import NewNoteForm from '../form/NewNoteForm';
import { NoteBase } from '../notes/notes.types';
import { useDebounce } from '../../utils/hooks';

function Navbar() {
  const [searchVisible, setSearchVisibilty] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const searchRef = React.useRef<any>();
  const notesModel = useModel('notes');
  const searchModel = useModel('search');
  const bottomSheet = useBottomSheet();
  const allCategories = notesModel.select(notesModel.selectors.getCategories);
  const searchTermDebounced = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    searchModel.actions.setSearchTerm(searchTermDebounced);
  }, [searchTermDebounced]);  // eslint-disable-line

  const saveNote = React.useCallback(
    (note: NoteBase) => {
      notesModel.actions.saveNote(note);
      setTimeout(bottomSheet.close, 500);
    },
    [bottomSheet, notesModel.actions]
  );

  function handlePlusClick() {
    if (searchVisible) {
      setSearchTerm('');
      setSearchVisibilty(false);
      searchModel.actions.setSearchTerm('');
    } else {
      bottomSheet.open(
        <NewNoteForm categories={allCategories} saveNote={saveNote} />
      );
    }
  }

  function handleSearchClick() {
    if (searchRef.current) searchRef.current.focus();
    setSearchVisibilty(true);
  }

  const searchVariants = {
    visible: { width: '100%', opacity: 1 },
    hidden: { width: '0%', opacity: 0 },
  };

  const plusStyles = {
    transform: searchVisible ? 'rotate(135deg)' : 'none',
    transition: 'transform 0.2s ease-in',
  };

  return (
    <Wrapper>
      <IconButton icon="search" onClick={handleSearchClick} />

      <SearchInput
        animate={searchVisible ? 'visible' : 'hidden'}
        variants={searchVariants}
        initial={false}
        ref={searchRef}
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />

      <Spacing amount={8} />

      <IconButton icon="plus" onClick={handlePlusClick} style={plusStyles} />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  padding: 0px 10px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SearchInput = styled(motion.input)`
  height: 44px;
  padding: 0px;
  background-color: #ffff;
  border: none;
  font-size: 16px;
  outline: none;
`;

export default Navbar;
