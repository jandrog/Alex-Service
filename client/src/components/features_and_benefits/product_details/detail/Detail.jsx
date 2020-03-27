import React from 'react';

const Detail = ({ detail, description }) => (
  <tr>
    <td className="product_detail">{ `${detail}:` }</td>
    <td>{ description }</td>
  </tr>
);

export default Detail;