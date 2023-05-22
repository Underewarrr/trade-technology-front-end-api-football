import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface StatusResponse {
  account?: User;
  subscription?: {
    active: boolean;
  };
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth = (props: P) => {
    const [loading, setLoading] = useState(true);

    const apiKey = window.localStorage.getItem('apiKey');
    useEffect(() => {
      const checkStatus = async () => {
        try {
          if (!apiKey) {
            setLoading(false);
            return;
          }

       /*    const { data }: AxiosResponse<StatusResponse> = await axios.get('https://v3.football.api-sports.io/status', {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          });

          console.log('data', data);

          if (!data.account) {
            // If account is missing, redirect to login
            return;
          } */
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      checkStatus();
    }, [apiKey]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!apiKey) {
      return <Navigate to="/user/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
