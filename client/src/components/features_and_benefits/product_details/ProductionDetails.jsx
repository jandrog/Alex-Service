import React from 'react';
import Detail from './detail/Detail';

const ProductionDetails = ({ productDetails }) => (
  <>
    <h5 className="simple">Product Details</h5>
    <table id="prodspecs">
      <tbody>
        { productDetails.map(([ detail, description ]) => <Detail key={ detail } detail={ detail } description={ description } />) }
      </tbody>
      
    </table>
  </>
);

export default ProductionDetails;