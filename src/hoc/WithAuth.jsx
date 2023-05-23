import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const [accountStatus, setAccountStatus] = useState(null);

    const apiKey = window.localStorage.getItem('apiKey');

    useEffect(() => {
      const checkStatus = async () => {
        try {
          if (!apiKey) {
            setLoading(false);
            return;
          }

          const response = await axios.get('https://v3.football.api-sports.io/status', {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          });

          console.log('data', response.data);

          if (!response) {
            console.log(response.data.response.account)
            // If account is missing, redirect to login
            return;
          }

          // Save account status in local storage
          localStorage.setItem('accountStatus', JSON.stringify(response.data.response));
          setAccountStatus(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      checkStatus();
    }, [apiKey]);

    useEffect(() => {
      // Retrieve account status from local storage
      const storedAccountStatus = localStorage.getItem('accountStatus');
      if (storedAccountStatus) {
        setAccountStatus(JSON.parse(storedAccountStatus));
      }
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!apiKey || !accountStatus) {
      return <Navigate to="/user/login" />;
    }

    return <WrappedComponent {...props} accountStatus={accountStatus} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
