import { createSelector } from '@reduxjs/toolkit';
import { ContainerState } from './types';

const homepageSelector = createSelector(
  ({ globalData }: { globalData: { APP_API: string } }) => globalData,
  ({ homepage }: { homepage: ContainerState }) => homepage,
  (global, homepage) => ({
    ...global,
    ...homepage,
  }),
);

export { homepageSelector };
