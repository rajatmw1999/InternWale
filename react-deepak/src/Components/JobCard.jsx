import React, { Component } from "react";
import { FaDollarSign, FaUserTie } from "react-icons/fa";
import { BsFillBagFill, BsDot } from "react-icons/bs";
import { ImClock } from "react-icons/im";
import { MdVerifiedUser } from "react-icons/md";

export default class JobCard extends Component {
  render() {
    return (
      <div className="job-card-sec">
        <div className="flex">
          <img
            className="job-card-img"
            src="https://ph-files.imgix.net/254e5fa4-4bc9-4a8e-a552-e541a34bbb3e?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2"
            alt="job-card-img"
          />
          <div className="job-card-text-content">
            <div className="org-name-and-time">
              <h3>Google</h3>
              <h4>Posted 5 Hrs Ago</h4>
            </div>
            <div>
              <h2 className="position-name-in-job-card">Product Designer</h2>
              <h3 className="location-in-job-card">Bangalore, India</h3>
            </div>
            <div className="salary-experience-and-timing flex">
              <div>
                <FaDollarSign className="job-card-icon dollar-icon" />
                <span>95k-105k</span>
              </div>
              <div>
                <BsFillBagFill className="job-card-icon  bag-icon" />
                <span>2-3 yrs</span>
              </div>
              <div>
                <ImClock className="job-card-icon  clock-icon" />
                <span>Full-Time</span>
              </div>
            </div>
            <div className="internwale-verifid-badge">
              <MdVerifiedUser />
              <span>Internwale Trusted</span>
            </div>
            <ul className="job-description">
              <div className="flex">
                <BsDot className="description-icon" />
                <p>
                  Execute all visual design stages from concept to final
                  hand-off to developers
                </p>
              </div>
              <div className="flex">
                <BsDot className="description-icon" />
                <p>
                  Conceptualize original ideas that bring simplicity and
                  user-friendliness to complex design roadblocks
                </p>
              </div>
            </ul>
          </div>
        </div>
        <div className="job-apply-and-save flex-between">
          <div className="flex">
            <FaUserTie className="user-tie-icon" />
            <span>54 Applicants</span>
          </div>
          <div className="flex">
            <button className="btn-in-job-card save-btn">Save</button>
            <button className="btn-in-job-card apply-btn">Apply Now</button>
          </div>
        </div>
      </div>
    );
  }
}
