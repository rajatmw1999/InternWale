import React, { Component } from "react";
import './index.css'

export default class CompanyLogo extends Component {
  render() {
    return (
      <div class="container">
       <div class="col-md-3 col-sm-2 col-xs-6 aradhna_company_icons fadeInUp">
         <img id="Google-grey" src="/images/Google-grey@2x.png" alt="google-logo"/>
       </div>
       <div class="col-md-3 col-sm-2 col-xs-6 aradhna_company_icons fadeInUp">
         <img id="infosys-logo-grey" src="/images/infosys-logo-grey@2x.png" alt="infosys-logo" />
       </div>
       <div class="col-md-3 col-sm-2 col-xs-6 aradhna_company_icons fadeInUp">
         <img id="Microsoft-Logo-Grey" src="/images/Microsoft-Logo-Grey@2x.png" alt="microsoft-logo"/>
       </div>
       <div class="col-md-3 col-sm-2 col-xs-6 aradhna_company_icons fadeInUp">
         <img id="facebook-logo-grey" src="/images/facebook-logo-grey.png" alt="facebook-logo"  />
       </div>
  
   </div>
    );
  }
}