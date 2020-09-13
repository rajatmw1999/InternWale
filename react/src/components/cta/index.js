import React, { Component } from "react";

import './index.css'

export default class CTA extends Component {
  render() {
    return (
        <section id="home" data-stellar-background-ratio="0.2">
      <div class="overlay"></div>
      <div class="container col-12 col-lg-6">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="home-info">
              <h1>Tired Of Endless Job Hunt ??</h1>
              <h3>
                Don't Worry, Subscribe To Our Newsletter And Get Daily Alerts
                About Every Opening
              </h3>
              <form action="" method="get" >
                <div class="input-group mb-3 aradhna_home_search" >
                    <input type="text" class="form-control" placeholder="youremail@gmail.com" aria-label="youremail@gmail.com" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn  aradhna_home_search_button" type="button" style={{backgroundColor:"#29ca8e", color:"#fff"}}>Start Now</button>
                    </div>
                </div>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </section>
       
    );
  }
}