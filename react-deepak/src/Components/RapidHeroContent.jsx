import React, { Component } from "react";

export default class RapidHeroContent extends Component {
  render() {
    return (
      <div className="rapid-hero-content-sec">
        <div className="tech-org-logos">
          <div className="flex">
            <img src="/images/Google-grey@2x.png" alt="google-logo" />
          </div>
          <div className="flex">
            <img src="/images/infosys-logo-grey@2x.png" alt="infosys-logo" />
          </div>
          <div className="flex">
            <img
              src="/images/Microsoft-Logo-Grey@2x.png"
              alt="microsoft-logo"
            />
          </div>
          <div className="flex">
            <img src="/images/facebook-logo-grey.png" alt="facebook-logo" />
          </div>
        </div>
      </div>
    );
  }
}
