import React, { Component } from 'react'
import './Griditem.css'
import {Link} from 'react-router-dom'
export default class componentName extends Component {
    
    render() {
     
       
        return (
          <div id="item" >
                
                     <Link  to={`/details/${this.props.itemType}/${this.props.id}`}>
                     <div id="grid-column">
                         <div className="ui label"><i className="thumbs up outline icon"></i>{this.props.vote_average}</div>
                        <img alt={this.props.name} id="img-movie"src={`https://image.tmdb.org/t/p/w1280/${this.props.poster_path || this.props.backdrop_path}`}  />
                     </div>
                            
                </Link>
               
                <p id="title-movie">{  this.props.title || this.props.name}</p>
         
               
            </div> 
           
        )
    }
}
