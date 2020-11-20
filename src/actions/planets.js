import { createAction } from 'redux-actions';
import { api } from '../configs/networkConfig';


export const getPlanetsRequest = createAction('REQUEST_PLANETS');
export const getPlanetsSuccess = createAction('REQUEST_PLANETS_SUCCESS');
export const getPlanetsFailed = createAction('REQUEST_PLANETS_FAILED');
export const selectPlanetAction =  createAction('SELECT_PLANET');

export const getPlanets = () => async (dispatch) => {
    dispatch(getPlanetsRequest());
    try {
        const response = await api.get('/planets');
        console.log(response.data);
        dispatch(getPlanetsSuccess({ planets: response.data, listOfPlanets: response.data.results }));
    }
    catch(err) {
        dispatch(getPlanetsFailed(err));
    }
};

export const getNextPlanets = (next) => async (dispatch) => {
    dispatch(getPlanetsRequest());
    try {
        const response = await api.get(next);
        dispatch(getPlanetsSuccess({ planets: response.data, listOfPlanets: response.data.results }));
    }
    catch(err) {
        dispatch(getPlanetsFailed(err));
    }
}

export const selectPlanet = (planet) => async (dispatch) => {
    dispatch(selectPlanetAction({ selectedPlanet: planet }));
}
