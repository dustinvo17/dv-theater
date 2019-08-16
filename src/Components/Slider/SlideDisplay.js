import React, {Component} from 'react'
import './SliderDisplay.css'
import {Link} from 'react-router-dom'

export default class SlideDisplay extends Component {

    render() {
      

        return (
            <Link to={`/details/${this.props.itemType}/${this.props.id}`}>
            <div
                style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) center center / cover no-repeat, url("https://image.tmdb.org/t/p/w1280/${this.props.backdrop_path}") center top / cover no-repeat rgb(255, 255, 255)`
            }}
                id="slide">
                <div
                    className="information">
                    <p>{this.props.itemType === 'movie'
                            ? 'Latest'
                            : 'Airing Today'}</p>
                    <div>
                        <p className="title-slider">{
                                 this.props.title
                                || this.props.name}</p>
                    </div>

                    <p>
                        Rating : {this.props.vote_average}
                    </p>
                    <p>{this.props.itemType === 'movie'
                            ? (`Release date :  ${this.props.release_date}`)
                            : (`First air date : ${this.props.first_air_date}`)}</p>

                </div>
            </div>
            </Link>
            
        )
    }
}
