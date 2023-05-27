import React from 'react';
import withAuth from '../WithAuth';

interface ProtectedRouteProps {
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  return <></>;
};

export default withAuth(ProtectedRoute);
