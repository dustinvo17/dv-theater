import React, {Component} from 'react'
import {getDetails} from '../../Action'
import {connect} from 'react-redux'
import Slider from "react-slick"
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Details.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Details extends Component {
    state={isLoading:true}
    componentWillMount() {
       
      const {id, itemType} = this.props.match.params
     
      this
            .props
            .getDetails(itemType, id)
        // render loading page while component mounting
        setTimeout(() =>{
            this.setState({isLoading:false})
        },500)

    }
  
    // check item type is person or movie to re fetch data
    componentDidUpdate(prevProps) {
    
          const {id, itemType} = this.props.match.params
        if (itemType !== prevProps.match.params.itemType) {
            this.setState({isLoading:true})
           this
            .props
            .getDetails(itemType, id)
                   // render loading page while component mounting
              setTimeout(() =>{
            this.setState({isLoading:false})
        },500)
  }
}
    
    renderGenres() {
        if (this.props.details.genres) {
            const {genres} = this.props.details
            if(genres.length){
                 if (genres.length >= 2) {
                return <div className="genres-container">
                    <div>
                        {genres[0].name}
                    </div>
                    <p className="vertical-line">
                        |
                    </p>
                    <div>
                        {genres[1].name}
                    </div>
                </div>
            } else {
                return <div className="genres-container">
                    <div>{genres[0].name}</div>
                </div>
            }

            }
           
        }
    }
    renderTotalStar() {
          if (this.props.details.vote_average) {
            const ratingStar = Math.round(this.props.details.vote_average / 2)
            return starOut(ratingStar)
        }
        if (this.props.details.popularity){
            const ratingStar = Math.round(this.props.details.popularity / 5)
            return starOut(ratingStar)
        }
        function starOut(ratingStar){
           
            let listStar = []
            for (let i = 0; i < ratingStar; i++) {
                listStar.push('#ff00bf')
            }
            for (let j = 0; j < (5 - ratingStar); j++) {
                listStar.push('white')
            }
            return listStar.map((color, index) => {
                
                return <i
                    className="star icon"
                    style={{
                    color: `${color}`
                }}
                    key={index}></i>
            })
        }
      
    }

    renderCast() {
        //render either movie list or actor list based on type
            let cast
            let type

            if(this.props.details.credits){
                cast = this.props.details.credits.cast
                type ='movie-tv'
            }
            else if(this.props.details.movie_credits){
                cast = this.props.details.movie_credits.cast
                type ='person'
            }
        
            
                if(cast){
                     return cast.map(cast => {
                         if(cast.poster_path || cast.profile_path){
                             return <div key={cast.id} className="cast-box">
                    <Link to={`/details/${type === 'movie-tv' ? 'person':'movie'}/${cast.id}`}>
                        <img
                            className="cast-image"
                            src={`https://image.tmdb.org/t/p/w1280${type==="movie-tv" ? cast.profile_path : cast.poster_path}`} ></img>

                        <p className="cast-name">{cast.name || cast.title}</p>
                    </Link>

                </div>
                         }

               

            })
            
                }else{
                    return <div className="no-found">NO INFORMATION FOUND</div>
                }
                
              
            
       
          
                           


        }
    
    renderTrailer() {
        if (this.props.details.videos) {
            const {results} = this.props.details.videos
            if (results.length) {

                return results.map(video => {
                    return <div className="video-trailer" key={video.id}>

                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            border="0"
                            cellSpacing="0"
                            src={`https://www.youtube.com/embed/${video.key}`}></iframe>
                    </div>

                })
            } else {
                return <div className="no-found">NO TRAILERS FOUND</div>
            }
        }

    }
    renderReview() {
        if (this.props.details.reviews) {
            const {results} = this.props.details.reviews

            if (results.length) {
                return results
                    .slice(0, 3)
                    .map(review => {
                        let reviewContent = review.content
                        if (reviewContent.length >= 1500) {
                            reviewContent = review
                                .content
                                .split(' ')
                            reviewContent = reviewContent.slice(0, reviewContent.length / 15)
                            reviewContent = reviewContent.join(' ')
                        }

                        return <div className="marginBot review-section" key={review.author}>
                            <h1 className="author">{review.author}</h1>
                            <p className="overview review-content">{reviewContent}
                                ...</p>
                            <a
                                target="_blank"
                                className="see-full-review ui basic button primary"
                                href={review.url}>See full reviews
                                <i className="right arrow icon"></i>
                            </a>
                        </div>
                    })
            } else {
                return <div className="no-found">NO REVIEWS FOUND</div>
            }

        }
    }

    // get poster for actor
    getMovieCreditForCast(){
        if(this.props.details.movie_credits){
            const {cast} = this.props.details.movie_credits
            const randomMovieIndex = Math.floor(Math.random() * cast.length)
           if(cast[randomMovieIndex].backdrop_path){
               return cast[randomMovieIndex].backdrop_path
           }
           else{
               return cast[0].backdrop_path || cast[0].poster_path
           }
        }
    }

    render() {
    
     
     
        let settings = {

            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
              responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          
          }
        },
          {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          
          }
        },
         {
          breakpoint: 450,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          
          }
        }
        ]
        };
        let settingsTrailer = {

            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
                 responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          
          }
        }
        
        ]
        };

        return (this.props.details && this.state.isLoading === false
            ? <div className="whole-section">
                <Header/>
              
                    {/* Movie Poster */}
                    <div
                        className="poster"
                        style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)) center center / cover no-repeat, url("https://image.tmdb.org/t/p/w1280${this.props.details.backdrop_path ||this.props.details.poster_path || this.getMovieCreditForCast()}") center top / cover no-repeat rgb(255, 255, 255)`
                    }}>

                  
                        {/* movie information || actor information */}
                        <div className="movie-information">
                            <div className="left-container">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${this.props.details.poster_path || this.props.details.profile_path}`}
                                    id="poster-image"/>
                            </div>
                            <div className="right-container">
                                <h1 className="movie-name">
                                    {this.props.details.name || this.props.details.title}
                                </h1>
                                <div className="rating">
                                    <div className="rate-point">{this.props.details.vote_average || this.props.details.popularity}</div>
                                    <div >

                                        {this.renderTotalStar()}

                                    </div>

                                </div>
                                <div className="language">
                                    <div>
                                        {this.props.details.status || (this.props.details.gender === 1 ? "Female" : "Male")}
                                    </div>
                                    <p className="vertical-line">
                                        |
                                    </p>
                                    <div
                                        style={{
                                        textTransform: 'capitalize'
                                    }}>
                                        {this.props.details.original_language || this.props.details.known_for_department }
                                    </div>
                                </div>
                                <div className="genres">
                                    {this.renderGenres()}

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Body */}
                    <div className="body">

                        <div className="item-summary marginBot">
                            <h1 className="section-name">
                                {this.props.details.name ?  "BIOGRAPHY" :"SUMMARY" }
                            </h1>
                            <p className="overview">{this.props.details.overview || this.props.details.biography || 'NO INFORMATION FOUND'}</p>
                        </div>
                    
                        <div className="item-cast marginBot" >
                            <h1 className="section-name">
                                    {this.props.details.birthday ? `${this.props.details.name.toUpperCase() } MOVIES` : "CAST"}
                            </h1>
                            <Slider
                                {...settings}
                                style={{
                                padding: '2rem'
                            }}>
                                {this.renderCast()}
                            </Slider>
                        </div>
                        <div className="item-trailer marginBot"  style={{display:this.props.details.birthday ? 'none' :''}}>
                            <h1 className="section-name">
                                TRAILERS
                            </h1>
                            <Slider
                                {...settingsTrailer}
                                style={{
                                padding: '2rem'
                            }}>
                                {this.renderTrailer()}
                        </Slider> 
                        </div>

                        <div className="item-reviews " style={{display:this.props.details.birthday ? 'none' :''}}>
                            <h1 className="section-name">
                            POPULAR REVIEWS

                            </h1>
                            {this.renderReview()}

                        </div>
                             
                    </div>  
                    <Footer/>
                   

                </div>
            : 
                <Loading/>
            )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {details:state.getDetails}
}
export default connect(mapStateToProps, {getDetails})(Details)
