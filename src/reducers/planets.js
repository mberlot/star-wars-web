import { handleActions } from 'redux-actions';
import {
    getPlanetsRequest,
    getPlanetsSuccess,
    getPlanetsFailed,
    selectPlanetAction
} from '../actions/planets';

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const initialState = {
    fetchState: FetchState.NOT_FETCHED,
    planets: [],
    listOfPlanets: [],
    selectPlanet: {},
    errorMessage: ''
};

export default handleActions({
        [getPlanetsRequest]: state => ({ ...state, fetchState: FetchState.FETCHING }),
        [getPlanetsSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
            listOfPlanets: [...state.listOfPlanets, ...action.payload.listOfPlanets],
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [getPlanetsFailed]: (state, action) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: action.payload,
        }),
        [selectPlanetAction]: (state, action) => ({
            ...state,
            ...action.payload,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
    },
    initialState);
