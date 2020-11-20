import { handleActions } from 'redux-actions';
import {
    getPeopleRequest,
    getPeopleSuccess,
    getPeopleFailed
} from '../actions/people';

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const initialState = {
    fetchState: FetchState.NOT_FETCHED,
    people: []
};

export default handleActions({
        [getPeopleRequest]: state => ({ ...state, fetchState: FetchState.FETCHING }),
        [getPeopleSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [getPeopleFailed]: (state, action) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: action.payload,
        })
    },
    initialState);
