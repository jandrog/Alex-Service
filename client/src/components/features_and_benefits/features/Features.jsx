import React from 'react';
import Benefits from './benefits/Benefits';

const Features = ({ features, benefits }) => (
  <>
    <h5 className="simple">Features & Benefits</h5>
    <p>{ features }</p>
    <Benefits benefits={ benefits }/>
  </>
);

export default Features;