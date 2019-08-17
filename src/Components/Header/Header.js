import React, {Component} from 'react'
import "./Header.css"
import {searchKeyword} from '../../Action/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
 class Header extends Component {
     state = {keyword:'',toggle:false}
     handleFormSubmit(e){
         e.preventDefault()
         this.props.searchKeyword(this.state.keyword,this.props.history,'1')
     }
     handleTogglebox(){
        if(this.state.toggle === false){
            this.setState({toggle:true})
        }
        else{
            this.setState({toggle:false})
        }
     }
    render() {
        
    
        return (
           
                    <div className={`header-container ${this.state.toggle ? 'showHeader':'hidebar'}`}>
            <div>
                <Link to="/">
                {/* <img  className="name-web"src='dvtheater.png'></img> */}
                 <img alt="logo" className="name-web"src="https://www.freelogodesign.org/file/app/client/thumb/a537dda3-6f46-40d0-94a4-4125b4b1df14_200x200.png?1565758435775"/>
                 
                </Link>
               
            </div>
               
                <div className="ui search"  id="bar-container" >
                    <form className="ui icon input form-bar" onSubmit={(e)=>this.handleFormSubmit(e)}>
                        <input  className="prompt"  id="search-bar" type="text" placeholder="Search Movie..." onChange={(e)=>this.setState({keyword:e.target.value})}/>
                        <div className="glass" onClick={(e)=>this.handleFormSubmit(e)}><i className="search icon"></i></div>
                    </form>
               
                </div>
                <div id="icons-right">
                   
                        <Link to="/"><button className="ui basic blue button"><i className="home icon"></i> HOME </button></Link>
                        
                     <Link to="/discover"><button className="ui basic blue button"><i className="map icon"></i> DISCOVER</button></Link> 
                    
                    <a href="https://www.themoviedb.org/"><img alt="logo" className="name-tmdb"src="https://www.themoviedb.org/assets/2/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png"/></a>
                  
                   
                </div>
                <div className="toggle-box" onClick={()=>this.handleTogglebox()}>
                    <div className={`bar1 ${this.state.toggle ? 'change' :''}`}></div>
                    <div className={`bar2 ${this.state.toggle ? 'change' :''}`}></div>
                    <div className={`bar3 ${this.state.toggle ? 'change' :''}`}></div>
                </div>
   
                 
            </div>
           
        
        )
    }
}

export default connect(null, {searchKeyword})(withRouter(Header))
