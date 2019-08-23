import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Loading from '../Loading/Loading'
import {searchKeyword,discoverData} from '../../Action/index'
import './SearchPage.css'
class SearchPage extends Component {
    state = {
        currentPage: 1,
        isLoading: true,
        inDiscover: false,
        voteAverage:null,
        peopleInvolved:null,
        keywords:null,
        year:null

    }
    componentDidMount() {
        if(this.props.match.path === '/discover'){
            this.props.discoverData({...this.state},this.state.currentPage +"")
            this.setState({inDiscover:true})
        }
        else{
             this
                .props
                .searchKeyword(this.props.match.params.keyword, null, this.state.currentPage + "")
        
        }
           

        setTimeout(() => {
            this.setState({isLoading: false})
        }, 500)

    }
    componentDidUpdate(prevProps) {
        //handler rerender with diffent search keyword
     
        if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
           
                this.props.discoverData({...this.state},this.state.currentPage +"")
          
                   this
                .props
                .searchKeyword(this.props.match.params.keyword, null, this.state.currentPage + "")
            
         
        }
       
    
    }
    handleNextButton() {
        this.setState({
            currentPage: this.state.currentPage + 1
        }, () => {
            if(this.state.inDiscover === true){
                this.props.discoverData({...this.state},this.state.currentPage +"")
            }
            else{
                      this
                .props
                .searchKeyword(this.props.match.params.keyword, null, this.state.currentPage + "")
            }
      
        })
    }
    handlePreviousButton() {

        this.setState({
            currentPage: this.state.currentPage - 1
        }, () => {
               if(this.state.inDiscover === true){
                this.props.discoverData({...this.state},this.state.currentPage +"")
            }
            else{
                      this
                .props
                .searchKeyword(this.props.match.params.keyword, null, this.state.currentPage + "")
            }
        })
    }
    renderGridResult() {
        if (this.props.discover.results || this.props.searchResult.results  ) {
            let results =this.props.searchResult.results
            if(this.state.inDiscover === true){
                results = this.props.discover.results
            }
            if(!results.length){
                return <p className="result-title">No results found</p>
            } 
            const urlLink = ()=>{
                if(this.props.match.url.includes('people')){
                    return 'person'
                }
                if(this.props.match.url.includes('tv')){
                    return 'tv'
                }
                else{
                    return 'movie'
                }
            }
                
           console.log(this.props) 
            return results.map(movie => {
                if (movie.poster_path || movie.backdrop_path || movie.profile_path) {
                    return <div className="grid-item" key={movie.id}>
                        <Link to={`/details/${movie.media_type || urlLink()}/${movie.id}`}>
                            <img
                                className="poster-img"
                                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path || movie.backdrop_path || movie.profile_path}`}/>
                            <p className="movie-title">{movie.title || movie.name}</p>
                            {this.state.inDiscover ? <p className="movie-title"><i
                    className="star icon" style={{color:'#ff00bf'}}></i>{this.state.inDiscover === true ? movie.vote_average : ''}</p> :''}

                        </Link>

                    </div>
                }

            })

        } 
    }
    storeInputField(event,item){
        const {value} = event.target
        if(item === 'vote'){
             this.setState({voteAverage:value})
            
        }
        if(item ==='people'){
            this.setState({peopleInvolved:value})
        }
        if(item ==='keywords'){
            this.setState({keywords:value})
        }
        if(item ==='year'){
            this.setState({year:value})
        }
       
    }
    handleFormDiscoverSubmit(e){
        e.preventDefault()
        this.setState({currentPage:1},()=>{
            this.props.discoverData({...this.state},this.state.currentPage +"")
        })
        
    }
    renderFilterDiscover() {

        if (this.state.inDiscover) {
            return <form onSubmit={(e) => this.handleFormDiscoverSubmit(e)}   className="form-discover">
                <div className="ui input focus">
                    <input onChange={(e)=> this.storeInputField(e,'vote')} type="number" step="0.01" placeholder="Vote Average"/>
                </div>
                <div className="ui input focus">
                    <input  onChange={(e)=> this.storeInputField(e,'people')}type="text" placeholder="Cast"/>
                </div>
                <div className="ui input focus">
                    <input  onChange={(e)=> this.storeInputField(e,'keywords')}type="text" placeholder="Keywords"/>
                </div>
                  <div className="ui input focus">
                    <input  onChange={(e)=> this.storeInputField(e,'year')}type="number"  placeholder="Year"/>
                </div>
                <button  type="submit"className="ui basic blue button">Search</button>
            </form>
        }
    }
    renderTitleKeyWord() {
        if(this.props.match.params.keyword){
               if (this.props.match.params.keyword.includes('-')) {
            return this
                .props
                .match
                .params
                .keyword
                .split('-')
                .join(' ')
        } else {
            return this.props.match.params.keyword
        }
        }
     
    }
    render() {
 
        return (this.state.isLoading === false
            ? <div>
                    <Header/>
                    <div className="main-container">
                        {this.state.inDiscover === false
                            ? <h1 className="result-title">Search Results For {this.renderTitleKeyWord()}</h1>
                            : <h1 className="result-title">Discover</h1>}

                        <hr/>
                        {this.renderFilterDiscover()}

                        <div className="grid-results">
                            {this.renderGridResult() }
                        </div>
                        <hr/>
                        <div className="buttons">
                            <button
                                id="prev-button"
                                style={{
                                visibility: this.state.currentPage === 1
                                    ? 'hidden'
                                    : 'visible'
                            }}
                                className="ui blue basic button"
                                onClick={() => this.handlePreviousButton()}>
                                Previous
                            </button>
                            <button
                                style={{
                                visibility: this.state.currentPage === this.props.searchResult.total_pages || this.state.currentPage === this.props.discover.total_pages
                                    ? 'hidden'
                                    : 'visible'
                            }}
                                className="ui blue basic button"
                                onClick={() => this.handleNextButton()}>
                                Next
                            </button>

                        </div>
                    </div>
                    <Footer/>

                </div>
            : <Loading/>)
    }
}
const mapStateToProps = (state, ownProps) => {

    return {searchResult: state.searchResult,discover:state.discover
            
    }
}

export default connect(mapStateToProps, {searchKeyword,discoverData})(SearchPage)
