import React, { Component } from 'react';
import Features from './features/Features';
import ProductDetails from './product_details/ProductionDetails';
import Axios from 'axios';
import Promise from 'bluebird';
import './style.css';
import $ from 'jquery';


class FeaturesAndBenefits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productID: 1,
      tab: 'Features & Benefits',
      tabCss: ['tab_selected', 'tab_unselected', 'tab_unselected'], 
      features: '',
      benefits: [],
      productDetails: [],
    };

    this.tabViewClick = this.tabViewClick.bind(this);
    this.updateMyComponents = this.updateMyComponents.bind(this);
    this.getAllProductInfo = this.getAllProductInfo.bind(this);
  }

  componentDidMount() {
    
    // window.onstorage = (e) => {
    //   this.updateMyComponents(e);
    // };

    setInterval(() => { this.updateMyComponents(); }, 1000);

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
    $('#fitment_tab').css('display', 'none');
    $('#reviews_tab').css('display', 'none');
  }

  updateMyComponents() {
    let { productID } = this.state;
    let localProductID = localStorage.getItem('productID');

    if (productID !== localProductID) {
      this.getAllProductInfo(localProductID, (err, results) => {
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
  }

  // updateMyComponents(e) {
  //   if (e.key === 'productID' && e.oldValue !== e.newValue) {
  //     this.getAllProductInfo(e.newValue, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         let { features, benefits, productDetails } = results; 
      
  //         this.setState({
  //           features: features,
  //           benefits: benefits,
  //           productDetails: productDetails
  //         });
  //       }
  //     });
  //   }
  // }

  tabViewClick(event) {
    event.preventDefault();
    const { textContent } = event.target;

    if (textContent === 'Features & Benefits') {
      $('#features_tab').css('display', '');
      $('#fitment_tab').css('display', 'none');
      $('#reviews_tab').css('display', 'none');
      $('#tab1').removeClass('tab_unselected');
      $('#tab1').addClass('tab_selected');
      $('#tab2').removeClass('tab_selected');
      $('#tab2').addClass('tab_unselected');
      $('#tab3').removeClass('tab_selected');
      $('#tab3').addClass('tab_unselected');
    } else if (textContent === 'Vehicle Fitment') {
      $('#features_tab').css('display', 'none');
      $('#fitment_tab').css('display', '');
      $('#reviews_tab').css('display', 'none');
      $('#tab2').removeClass('tab_unselected');
      $('#tab2').addClass('tab_selected');
      $('#tab1').removeClass('tab_selected');
      $('#tab1').addClass('tab_unselected');
      $('#tab3').removeClass('tab_selected');
      $('#tab3').addClass('tab_unselected');
    } else {
      $('#features_tab').css('display', 'none');
      $('#fitment_tab').css('display', 'none');
      $('#reviews_tab').css('display', '');
      $('#tab3').removeClass('tab_unselected');
      $('#tab3').addClass('tab_selected');
      $('#tab1').removeClass('tab_selected');
      $('#tab1').addClass('tab_unselected');
      $('#tab2').removeClass('tab_selected');
      $('#tab2').addClass('tab_unselected');
    }
  }

  getAllProductInfo(productID, callback) {
   
    var featuresBenefitsDetails = {
      features: '',
      benefits: [],
      productDetails: []
    };

    const getFeatures = Axios.get(`http://alexservice-env.eba-mwr4bchv.us-east-2.elasticbeanstalk.com/api/features_benefits/${ productID }/features`); //Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/features`);
    const getBenefits = Axios.get(`http://alexservice-env.eba-mwr4bchv.us-east-2.elasticbeanstalk.com/api/features_benefits/${ productID }/benefits`); //Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/benefits`);
    const getProductDetails = Axios.get(`http://alexservice-env.eba-mwr4bchv.us-east-2.elasticbeanstalk.com/api/features_benefits/${ productID }/product_details`); //Axios.get(`http://127.0.0.1:8086/api/features_benefits/${ productID }/product_details`);

    Promise.all([getFeatures, getBenefits, getProductDetails])
      .then(results => {
        featuresBenefitsDetails.features = results[0].data;
        featuresBenefitsDetails.benefits = results[1].data;
        featuresBenefitsDetails.productDetails = results[2].data;
        callback(null, featuresBenefitsDetails);
      })
      .catch(err => callback(err, null));
  }

  // getView() {
  //   const { features, benefits, productDetails } = this.state;

  //   if (this.state.tab === 'Features & Benefits') {
  //     return <div id="tab-features">
  //       <Features features={ features } benefits={ benefits }/>
  //       <ProductDetails productDetails={ productDetails }/>
  //     </div>;
  //   } else if (this.state.tab === 'Vehicle Fitment') {
  //     return <p>Vehicle Fitment</p>;
  //   } else {
  //     return <div id='reviewsComponent'></div>;
  //   }
  // }

  render() {
    const { features, benefits, productDetails, tabCss } = this.state;
    return (
      <div>
        <ul className="tabs" onClick={ this.tabViewClick }>
          <li id='tab1' className="tab_default tab_selected">Features & Benefits</li>
          <li id='tab2' className="tab_default tab_unselected">Vehicle Fitment</li>
          <li id='tab3' className="tab_default tab_unselected">Reviews</li>
        </ul>
        <div>
          <div id='features_tab'>
            <Features features={ features } benefits={ benefits }/>
            <ProductDetails productDetails={ productDetails }/>
          </div>
          <div id='fitment_tab'>
            <p>Fitment</p>
          </div>
          <div id='reviews_tab'>
            <div id='reviewsComponent'></div>
          </div>
          {/* {this.getView()} */}
        </div>
      </div>
    );
  }
}

export default FeaturesAndBenefits;
