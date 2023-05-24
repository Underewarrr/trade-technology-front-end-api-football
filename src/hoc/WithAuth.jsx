import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const [accountStatus, setAccountStatus] = useState(null);

    useEffect(() => {
      const checkStatus = async () => {
        try {
          const apiKey = localStorage.getItem('apiKey');

          if (!apiKey) {
            setLoading(false);
            return;
          }

          // Check if account status is already stored in local storage
          const storedAccountStatus = localStorage.getItem('accountStatus');
          if (storedAccountStatus) {
            setAccountStatus(JSON.parse(storedAccountStatus));
            setLoading(false);
            console.log("Request Saved on High Order Componenet")
            return;
          }

          const response = await axios.get('https://v3.football.api-sports.io/status', {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          });
          if (!response.data) {
            console.log('Failed to fetch account status from API. Redirecting to login.');
            return;
          }

          // Save account status in local storage
          localStorage.setItem('accountStatus', JSON.stringify(response.data.response));
          setAccountStatus(response.data.response);
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

    if (!accountStatus) {
      return <Navigate to="/user/login" />;
    }

    return <WrappedComponent {...props} accountStatus={accountStatus} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
