import React from 'react';
import ReactDOM from 'react-dom';

//IMPORTING THE REACT COMPONENTS DESIGNED FOR THE WEBSITE
import CompanyLogo from '../../components/companyLogo/index'
import Cta from '../../components/cta/index'
import FilterBox from '../../components/FilterBox/index'
import Home from '../../components/home/index'
import JobCard from '../../components/jobCard/index'
import Footer from '../../components/footer/index'
import HeadCta from '../../components/headCta/index'

class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading:true,
          data:null
        };
      }
    async componentDidMount(){
        var fetchUrl = 'http://jobskillungaserver.herokuapp.com/api/jobs/all';
        await fetch(fetchUrl)
        .then(res => res.json())
        .then((data) => {
          this.setState({
              loading:false,
              data:data.message
          });
        //   console.log(this.state.data);
        });
      }

    render() {
    return <div>
        <Home />
        <HeadCta/>
        <br />
        <br />
        <div className = 'container-fluid'>
            <div className='row'>
                <div className='col-lg-0'>

                </div>
                <div className='col-lg-3'>
                    <FilterBox />
                </div>
                <div className='col-lg-8'>
                {
                    this.state.loading?
                    <h3>Loading</h3>
                    :
                    <JobCard data={this.state.data}/>
                }
                    
                
                </div>
            </div>
        </div>
        <CompanyLogo />
        <Cta />
        <Footer />

    </div>;
     
  }
  }
  
  export default LandingPage;