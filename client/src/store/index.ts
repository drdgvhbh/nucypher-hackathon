import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { epic as documentEpic, reducer as documentReducer } from './document';
import { reducer as roleReducer } from './role';

const documentPersistConfig = {
  key: 'document',
  storage,
  blacklist: [
    'data',
    'slateRepr',
    'peerID',
    'retrievalCounts',
    'authentications',
    'authorizedPeers',
    'isLoading',
    'peersToKick',
    'isSavingDocumentToSwarm',
  ],
};

const persistedDocumentReducer = persistReducer(
  documentPersistConfig,
  documentReducer,
);

export interface AppState {
  document: ReturnType<typeof persistedDocumentReducer>;
  role: ReturnType<typeof roleReducer>;
}

export const rootReducer = combineReducers<AppState>({
  document: persistedDocumentReducer,
  role: roleReducer,
});

export const rootEpic = combineEpics(documentEpic);
