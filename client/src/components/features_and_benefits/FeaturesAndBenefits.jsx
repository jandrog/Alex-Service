import React, { Component } from 'react';
import Features from './features/Features';
import ProductDetails from './product_details/ProductionDetails';
import Axios from 'axios';
import Promise from 'bluebird';
import './style.css';


class FeaturesAndBenefits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productID: 1,
      tab: 'Features & Benefits',
      features: '',
      benefits: [],
      productDetails: [],
    };

    this.tabViewClick = this.tabViewClick.bind(this);
    this.getView = this.getView.bind(this);
    this.getAllProductInfo = this.getAllProductInfo.bind(this);
  }

  componentDidMount() {
    this.getAllProductInfo(this.state.productID, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        let { features, benefits, productDetails } = results; 
    
        this.setState({
          features: features,
          benefits: benefits,
          productDetails: productDetails
        });
      }
    });
  }

  tabViewClick(event) {
    event.preventDefault();
    const { textContent } = event.target;
    this.setState({
      tab: textContent
    });
  }

  getAllProductInfo(productID, callback) {
   
    var featuresBenefitsDetails = {
      features: '',
      benefits: [],
      productDetails: []
    };

    const getFeatures = Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/features`);
    const getBenefits = Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/benefits`);
    const getProductDetails = Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/product_details`);

    Promise.all([getFeatures, getBenefits, getProductDetails])
      .then(results => {
        featuresBenefitsDetails.features = results[0].data;
        featuresBenefitsDetails.benefits = results[1].data;
        featuresBenefitsDetails.productDetails = results[2].data;
        callback(null, featuresBenefitsDetails);
      })
      .catch(err => callback(err, null));
  }

  getView() {
    const { features, benefits, productDetails } = this.state;

    if (this.state.tab === 'Features & Benefits') {
      return <div id="tab-features">
        <Features features={ features } benefits={ benefits }/>
        <ProductDetails productDetails={ productDetails }/>
      </div>;
    } else if (this.state.tab === 'Vehicle Fitment') {
      return <p>Vehicle Fitment</p>;
    } else {
      return <p>Reviews</p>;
    }
  }

  render() {
    return (
      <div>
        <ul className="tabs" onClick={ this.tabViewClick }>
          <li className="tab_default tab_selected">Features & Benefits</li>
          <li className="tab_default tab_unselected">Vehicle Fitment</li>
          <li className="tab_default tab_unselected">Reviews</li>
        </ul>
        <div>
          {this.getView()}
        </div>
      </div>
    );
  }
}

export default FeaturesAndBenefits;
