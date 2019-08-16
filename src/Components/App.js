import React from 'react'
import landingPage from './LandingPage/landingPage'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import history from './history/history'
import Details from './Details/Details'
import SearchPage from './SearchPage/SearchPage'
class App extends React.Component {
   
    render(){
        return (
        <div>
            
            <Router history={history}>
                    <Switch>
                        <Route path='/search/results/:keyword' key="Search-Page"  exact component={SearchPage}/>
                     <Route path='/' exact component={landingPage}/>
                  
                     <Route path='/details/:itemType/:id' exact component={Details}/>
                     <Route path='/discover' key="Discover" exact component={SearchPage}/>
                    </Switch>
                    
                     

            </Router>
        
           
            </div>
        )
    }
}
export default App