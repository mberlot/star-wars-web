import { createAction } from 'redux-actions';
import { api } from '../configs/networkConfig';


export const getPeopleRequest = createAction('REQUEST_PEOPLE');
export const getPeopleSuccess = createAction('REQUEST_PEOPLE_SUCCESS');
export const getPeopleFailed = createAction('REQUEST_PEOPLE_FAILED');

export const getPeople = (people) => async (dispatch) => {
    dispatch(getPeopleRequest());
    try {
        let requests = people.map(item => {
            return api.get(item);
        });
        Promise.all(requests).then(value => {
            dispatch(getPeopleSuccess({people: value}));
        }).catch(errors => {
            dispatch(getPeopleFailed(errors));
        })

    }
    catch(err) {

    }
};
