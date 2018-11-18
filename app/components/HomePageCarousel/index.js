import React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import {
  Carousel
} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class HomePageCarousel extends React.PureComponent {

  render() {
    
    return (
      <Carousel autoPlay={true} infiniteLoop={true} interval={4000} showStatus={false} showThumbs={false}>
        <div>
            <img src='https://i.walmartimages.ca/img/landing-pages/2018/Week39/Pre-BlackFriday/Bounceback/HPHB_WMS_Pre-BlackFriday-Redemption-Desktop_20181115_E.jpg' />
        </div>
        <div>
            <img src='https://i.walmartimages.ca/img/homepage/hero/2018/Week41/HPHB_WMS_TO-ToyAcademy-Babie-HotWheels-FisherPrice-PJMasks-Desktop_20181031_E.jpg' />
        </div>
        <div>
            <img src='https://i.walmartimages.ca/img/homepage/hero/2018/Week43/L1HB12_SA_Mobile-PBF-Desktop_20181115_E.jpg' />
        </div>
      </Carousel>
    );
  }
}

const styles = {
  root: {
    padding: '0 20px',
  },
}

export default compose(
  withStyles(styles),
  connect(),
)(HomePageCarousel);