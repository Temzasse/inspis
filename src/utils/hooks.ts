import React from 'react';

import * as storage from '../utils/storage';
import testData from '../testData.json';
import { useModel } from '../smook';
import { sleep } from './common';

export function usePrevious(value: any) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useTestData() {
  const notesModel = useModel('notes');
  const allNotes = notesModel.select('notesById');

  React.useEffect(() => {
    console.log('> allNotes', allNotes);
    if (
      allNotes.status === 'SUCCESS' &&
      Object.values(allNotes.data).length === 0
    ) {
      async function saveTestNotes() {
        await storage.clear();
        for (const note of testData) {
          notesModel.actions.saveNote(note);
          await sleep();
        }
      }
      saveTestNotes();
    }
  }, [allNotes, notesModel.actions]);
}