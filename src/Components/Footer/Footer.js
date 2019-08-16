import React, { Component } from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
export default class Footer extends Component {
    renderFooter(h1,icon,...args){
        return    <div className="footer-box">
                 
                            
                    <h1>{icon} {h1}</h1>
                    
                
                   {args.map(item =>{
                       let url = item.split(' ').join('-').toLowerCase()
                       let basicRoute = ['home','discover']
                       const getBasicRoute=()=>{
                           if(url ==='home'){
                               return '/'
                           }
                           else{
                               return `/${url}`
                           }
                       }
                       // custom url replce space with '-'
                       return <div className="option-box" key={item}>
                          <p><Link to={basicRoute.includes(url) ? getBasicRoute() :`/search/results/${url}`}style={{color:'inherit'}}>{item}</Link></p>
                       </div>
                   })}

                </div>

    }
    render() {
        return (
            <div className="footer" >
                {this.renderFooter('Explore',<i className="home icon"></i>,'Home','Discover')}
                {this.renderFooter('Movies',<i className="video icon"></i>,'Top rated movies','Now playing movies','Upcoming movies','Popular movies')}
                {this.renderFooter('TV',<i className="tv icon"></i>,'Top rated TV shows','On the air TV shows','Airing today TV shows','Popular TV shows')}
                {this.renderFooter('People',<i className="user icon"></i>,'Popular people')}
            </div>
        )
}
}
