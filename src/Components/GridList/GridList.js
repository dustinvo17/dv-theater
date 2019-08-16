import React, { Component } from 'react'
import * as actions from '../../Action'
import {connect} from 'react-redux'
import Slider from "react-slick";
import GridItem from './Griditem'
import './GridList.css'
class GridList extends Component {
    componentDidMount(){
        if(this.props.name === "upcoming"){
            return
        }
        else if(this.props.name === "popular"){
            this.props.fetchList('movie','popular')
            this.props.fetchList('tv','popular')
            return
        }
        else if(this.props.name ==="now playing"){
            this.props.fetchList('movie','now_playing')
            this.props.fetchList('tv','now_playing')
            return
        }
        else if(this.props.name ==="top rated"){
            this.props.fetchList('movie','top_rated')
            this.props.fetchList('tv','top_rated')
            return
        }

    }
     renderListGridList (){
        const checkitemType = ()=>{
            return this.props.itemType === 'movie'
        }
        let list = {}
        if(this.props.name ==='upcoming'){
            list = checkitemType() ? this.props.latestMovie :this.props.tvShow 
        }
        else if(this.props.name==='popular'){
            list = checkitemType() ? this.props.popularMovie:this.props.popularTV
        }
        else if(this.props.name ==='now playing'){
            list = checkitemType() ? this.props.nowPlayingMovie : this.props.nowPlayingTV
        }
        else if(this.props.name ==='top rated'){
            list = checkitemType() ? this.props.topRatedMovie:this.props.topRatedTV

        }
        if(list.results){
             return list.results.map(item => {
                 if(item.poster_path){
                         return <GridItem {...item} key={item.id} itemType={this.props.itemType}/>
                 }
       
        })
        }
        else{
            return <div></div>
        }
    
       
    }
    render() {
         const settings = {
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
       responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          
          }
        },
         {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          
          }
        },
         {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          
          }
        },
         {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          
          }
        },{
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          
          }
        }
        
    ]
     
     
    }

   
      
        return (
            <div  id="container">
                <p id="title">{this.props.name} </p>
                <Slider {...settings} >
                        {this.renderListGridList()}
                </Slider>
                <hr />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        latestMovie: state.movieSlider,
        itemType:state.itemType,
        tvShow:state.tvSlider,
        nowPlayingMovie:state.nowPlayingMovie,
        nowPlayingTV:state.nowPlayingTV,
        popularMovie:state.popularMovie,
        popularTV:state.popularTV,
        topRatedMovie:state.topRatedMovie,
        topRatedTV:state.topRatedTV
    }
}
export default connect(mapStateToProps,actions)(GridList)


