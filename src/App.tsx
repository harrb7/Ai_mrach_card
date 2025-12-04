import { useState, useEffect } from 'react';
import LicenseScreen from './components/LicenseScreen';

function App() {
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const licenseVerified = localStorage.getItem('license_verified');
    setIsLicenseValid(licenseVerified === 'true');
    setIsChecking(false);
  }, []);

  const handleLicenseVerified = () => {
    setIsLicenseValid(true);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLicenseValid) {
    return <LicenseScreen onLicenseVerified={handleLicenseVerified} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MatchGen!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your license has been verified successfully.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">License Active</p>
          <p className="text-green-700 text-sm mt-1">You have full access to all features.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('license_verified');
            setIsLicenseValid(false);
          }}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
