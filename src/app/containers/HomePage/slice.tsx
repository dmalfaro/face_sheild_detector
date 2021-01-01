import { PayloadAction } from '@reduxjs/toolkit';
// Importing from `utils` makes them more type-safe ✅
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { ContainerState, ClassificationTypes, SagaPayloadType } from './types';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  loading: false,
  classification: {
    vgg16: '',
    vgg19: '',
    densenet: '',
  },
};

export const setClassificationRequested = createAction<SagaPayloadType>(
  'setClassificationRequested',
);

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setClassificationResponse(
      state,
      action: PayloadAction<ClassificationTypes>,
    ) {
      state.classification = action.payload;
    },
  },
});

/*
 * `reducer` will be used to add this slice to our Redux Store
 * `actions` will be used to trigger change in the state from where ever you want
 * `name` will be used to add this slice to our Redux Store
 */
export const { actions, reducer, name: sliceKey } = homepageSlice;
