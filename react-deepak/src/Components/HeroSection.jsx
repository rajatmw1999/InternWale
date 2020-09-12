import React, { Component } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrLinkedinOption, GrReddit } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";

export default class HeroSection extends Component {
  render() {
    return (
      <div className="hero-section flex">
        <div className="container flex">
          <div className="intro-sec-text-content">
            <h1 className="hero-section-title ">
              Join Us & Explore Thousands Of Jobs
            </h1>
            <h5 className="hero-section-tagline">
              Search Millions Of Job From Thousands Of Companies And Never Miss
              Any Opportunity
            </h5>
            <div className="intro-sec-icons">
              <GrLinkedinOption />
              <FaFacebookF />
              <FaTwitter />
              <GrReddit />
            </div>
            <div className="intro-sec-search-bar flex">
              <input type="text" name="" placeholder="Search for Jobs" />
              <div className="hero-sec-search-icon flex">
                <IoMdSearch />
              </div>
            </div>
          </div>
          <div className="intro-img-sec">
            <img
              className="intro-sec-img"
              src="/images/intro-img.svg"
              alt="into-img"
            />
          </div>
        </div>
      </div>
    );
  }
}
