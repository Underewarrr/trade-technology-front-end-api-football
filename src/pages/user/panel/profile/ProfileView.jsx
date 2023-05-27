import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../../hoc/component/ProtectedRoute';

const ProfileView = ({ accountStatus }) => {
  const { account, subscription, requests } = JSON.parse(accountStatus);

  return (
    <><ProtectedRoute /><div className="container mt-5">
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Profile Information</h5>
                  <div>
                      <strong>First Name:</strong> {account.firstname}
                  </div>
                  <div>
                      <strong>Last Name:</strong> {account.lastname}
                  </div>
                  <div>
                      <strong>Email:</strong> {account.email}
                  </div>
                  <div>
                      <strong>Subscription Plan:</strong> {subscription.plan}
                  </div>
                  <div>
                      <strong>Subscription End Date:</strong> {subscription.end}
                  </div>
                  <div>
                      <strong>Subscription Active:</strong> {subscription.active ? 'Yes' : 'No'}
                  </div>
                  <div>
                      <strong>Requests:</strong>
                      <br />
                      <div>
                          <strong>Current:</strong> {requests.current}
                      </div>
                      <div>
                          <strong>Limit per Day:</strong> {requests.limit_day}
                      </div>
                  </div>
              </div>
          </div>
      </div></>
  );
};

const ProfileUserView = () => {
  // Retrieve the accountStatus from local storage
  const accountStatus = localStorage.getItem('accountStatus');

  return (
    <div>
      <Header />
      {accountStatus ? (
        <ProfileView accountStatus={accountStatus} />
      ) : (
        <div>No account status found.</div>
      )}
    </div>
  );
};

export default ProfileUserView;
