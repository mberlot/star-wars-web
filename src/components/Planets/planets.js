import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanets, getNextPlanets, selectPlanet } from '../../actions/planets';
import Card from "../cards";
import { useHistory } from "react-router-dom";

import './planets.scss';
import Loading from "../loading";

const Planets = props => {

    const dispatch = useDispatch();
    const planets = useSelector( state => state.planets.planets );
    const listOfPlanets = useSelector( state => state.planets.listOfPlanets );
    const history = useHistory();

    useEffect(() => {
        if(!planets.results)
            dispatch(getPlanets());
    },
    [dispatch]);

    const loadNext = () => {
        dispatch(getNextPlanets(planets.next));
    }

    const selectPlanetClick = (planet) => {
        dispatch(selectPlanet(planet));
        history.push('/planet')
    }

    return(
        <div className='planets-container'>
            <div className='planets-body'>

                    {listOfPlanets &&
                        <>
                            <h3>Planets</h3>
                            <div className='planets'>
                                {listOfPlanets.map((planet, index) => {
                                return <Card
                                    key={index}
                                    class='planet'
                                    title={planet.name}
                                >
                                    <>
                                        <span><b>Climate: </b> {planet.climate.toUpperCase()}</span>
                                        <span><b>Diameter: </b> {planet.diameter.toUpperCase()}</span>
                                        <span><b>Population: </b> {planet.population.toUpperCase()}</span>
                                        <span><b>Terrain: </b> {planet.terrain.toUpperCase()}</span>
                                        <br/>
                                        <div className='button-container'>
                                            <button className='button' onClick={() => selectPlanetClick(planet)}>Read more</button>
                                        </div>
                                    </>
                                </Card>;
                            })}
                            </div>
                        </>
                    }
                {!planets.results && <span>Loading...</span>}
                {planets.next && <button className='button' onClick={loadNext}>See more...</button>}
            </div>
        </div>
    );
}

export default Planets;
