import React, {Component} from 'react'
import * as actions from '../../Action'
import {connect} from 'react-redux'
import SlideDislay from './SlideDisplay'
import Slider from "react-slick";


class SliderComponent extends Component {
 
    componentDidMount() {
  
        this.props.fetchList('movie','slider')
        this.props.fetchList('tv','slider')
        
                  
              
                
           
    
      
    }

    renderEachSlide(moviesList) {

        if (moviesList) {
         

            return moviesList.slice(0,6).map((movie, index) => {

                return <SlideDislay  key={index}
                        {...movie} itemType={this.props.itemType}/>

           

            })

        }
    }
    render() {
   
      
  
        let settings = {


            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (

            <div>
                
                <Slider {...settings}>

                {this.props.itemType ==='movie' ? (this.props.latestMovie 
                        ? this.renderEachSlide(this.props.latestMovie.results)
                        : '') : (this.props.tvShow ? this.renderEachSlide(this.props.tvShow.results) :'')}   
                </Slider>
        

            </div>
        )

    }
}
const mapStateToProps = (state, ownProps) => { 
  
  
   
    return {latestMovie: state.movieSlider,itemType:state.itemType,tvShow:state.tvSlider}
}
export default connect(mapStateToProps, actions)(SliderComponent)
