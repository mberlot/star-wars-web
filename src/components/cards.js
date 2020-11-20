import React from 'react';

const Card = props => (
    <div className={props.class}>
        <h3>{props.title}</h3>
        <div className='info'>{props.children}</div>
    </div>
);

export default Card;
