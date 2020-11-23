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
    render() {
    return <div>
        <Home />
        <HeadCta/>
        <br />
        <br />
        <div className = 'container-fluid'>
            <div className='row'>
                <div className='col-lg-1'>

                </div>
                <div className='col-lg-3'>
                    <FilterBox />
                </div>
                <div className='col-lg-7'>
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                    <JobCard />
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