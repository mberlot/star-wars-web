import React, { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { getPeople } from '../../actions/people';

import './planet.scss';
import Card from "../cards";
import {useHistory} from "react-router-dom";

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};


const Planet = props => {
    const planet = useSelector( state => state.planets.selectedPlanet );
    const people = useSelector( state => state.people.people );
    const peopleFetchState = useSelector( state => state.people.fetchState );
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (planet)
            dispatch(getPeople(planet.residents))
    }, [dispatch]);
    return (<div className='planet-container'>
        {planet && <section className='planet-description'>
            <h3>{planet.name}</h3>
            <div>
                <span><b>Rotation period: </b></span>
                <span>{planet.rotation_period}</span>
            </div>
            <div>
                <span><b>Orbital period: </b></span>
                <span>{planet.orbital_period}</span>
            </div>
            <div>
                <span><b>Diameter: </b></span>
                <span>{planet.diameter}</span>
            </div>
            <div>
                <span><b>Climate: </b></span>
                <span>{planet.climate}</span>
            </div>
            <div>
                <span><b>Gravity:</b></span>
                <span>{planet.gravity}</span>
            </div>
            <hr width='80%'/>
            <span><b>Residents</b></span>
            <br/>
            <div className='character-container'>
                <div className='characters'>
                    {people && peopleFetchState === FetchState.FETCHED && people.map((person, index) => {
                        return <Card
                            key={index}
                            class='character'
                            title={person.data.name}>
                            <>
                                <span><b>height: </b> {person.data.height.toUpperCase()}</span>
                                <span><b>gender: </b> {person.data.gender.toUpperCase()}</span>
                                <span><b>Birth year: </b> {person.data.birth_year.toUpperCase()}</span>
                            </>
                        </Card>
                    })}
                    {planet.residents.length === 0 && <span>There are no residents for this planet</span>}
                    {peopleFetchState === FetchState.FETCHING && <span>Loading</span>}
                </div>
            </div>
        </section>}
        {!planet &&
          <section className='planet-description'>
              <span>{'There is no planet selected, plase select one'}</span>
          </section>
        }
        <button className='button' onClick={() => history.push('/planets')}>Go to Planet selection</button>
    </div>);
}
export default Planet;
