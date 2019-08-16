import React from 'react'
import SliderComponent from '../Slider/SliderComponent'
import ButtonOptions from '../ButtonOptions/ButtonOptions'
import GridList from '../GridList/GridList';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './landingPage.css'
import {connect} from 'react-redux'
import Loading from '../Loading/Loading'
 class landingPage extends React.Component {
     state ={ isLoading:true}
     componentDidMount(){
       
           setTimeout(() =>{
            this.setState({isLoading:false})
        },500)
     }
    
    render() {
        
        return (
            this.state.isLoading === false? <div className="landingPage">
                     <Header/>
          
            <SliderComponent/>
            <div className="grid-list-container">
                 <ButtonOptions/>
                 <GridList name="upcoming"/>
                 <GridList name="popular"/>
                 <GridList name="now playing"/>
                 <GridList name="top rated"/>
            </div>
            <Footer/>
           
            </div>: <Loading/>
                 
          
        )
    }
}

export default landingPage
