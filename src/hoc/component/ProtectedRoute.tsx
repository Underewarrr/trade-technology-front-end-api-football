import React from 'react';
import withAuth from '../WithAuth';

interface ProtectedRouteProps {
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  return <div>SOMETHING WENT WRONT GOING TO LOGIN</div>;
};

export default withAuth(ProtectedRoute);
