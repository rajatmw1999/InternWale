import React, { Component } from "react";
import CompanyLogo from '../components/companyLogo/index'
import Home from '../components/home/index'
import JobCard from '../components/jobCard/index'
import FilterBox from '../components/FilterBox/index'
import CTA from "../components/cta/index";
import Footer from '../components/footer/index'


let mainCards = [];
for(let i=0;i<5;i++){
    mainCards.push(<JobCard />);
}

export default class MainPage extends Component {
  render() {
    return (
        <div>
            <Home/>
            <CompanyLogo/>
            <div className="container col-12  col-xl-10">
                <div className="row">
                <div className="col-12 col-lg-3 cardRow">
                    <FilterBox />
                </div>
                            
                <div className="col-12 col-lg-9 cardRow">
                    {mainCards}
                </div>
                </div>
            </div>
            <CTA/>
            <Footer />
        </div>
    );
  }
}