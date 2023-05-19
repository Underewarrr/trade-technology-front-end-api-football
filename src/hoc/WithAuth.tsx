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
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const apiKey = window.localStorage.getItem('apiKey');
      const checkStatus = async () => {
        try {
          const { data }: AxiosResponse<StatusResponse> = await axios.get('https://v3.football.api-sports.io/status', {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          });

          if (!data.account || !data.subscription || !data.subscription.active) {
            // If account or subscription is missing or not active, redirect to login
            return;
          }

          setUser(data.account);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      checkStatus();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/user/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;