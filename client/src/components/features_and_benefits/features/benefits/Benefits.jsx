import React from 'react';

const Benefits = ({ benefits }) => (
  <ul>
    {benefits.map((benefit, key) => <li key={`key: ${key * 2}`}>{ benefit }</li>)}
  </ul>
);

export default Benefits;