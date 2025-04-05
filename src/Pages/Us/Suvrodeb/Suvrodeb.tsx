import { useState, useEffect } from "react";

interface IpInfo {
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface LocationData {
  [key: string]: string;
}

const Suvrodeb = () => {
  const [ip, setIp] = useState<string>("");
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  // Fetch user's IP Address
  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("Error fetching IP:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch IP details when IP is available
  useEffect(() => {
    if (ip) {
      setIsLoading(true);
      fetch(`https://ipinfo.io/${ip}?token=683553b28715a9`)
        .then((res) => res.json())
        .then((data) => setIpInfo(data))
        .catch((err) => console.error("Error fetching IP info:", err))
        .finally(() => setIsLoading(false));
    }
  }, [ip]);

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });
        setAccuracy(accuracy);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.table(data?.address);
            setLocationData(data.address as LocationData);
          })
          .catch((err) => {
            console.error("Error fetching location details:", err);
            alert("Failed to fetch location details");
          })
          .finally(() => setIsLoading(false));
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert(`Error: ${error.message}`);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Convert location data to array for grid display
  const locationEntries = locationData ? Object.entries(locationData) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Geo Location Finder
          </h1>
          <p className="text-purple-200 text-sm md:text-base">
            Discover your digital footprint with precision
          </p>
        </header>

        {/* IP Address Card */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-2xl border border-gray-700">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-cyan-300 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            Your IP Information
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2 md:space-y-3">
                <InfoRow
                  label="IP Address"
                  value={ip || "Not available"}
                  mono
                />
                {ipInfo?.city && <InfoRow label="City" value={ipInfo.city} />}
                {ipInfo?.region && (
                  <InfoRow label="Region" value={ipInfo.region} />
                )}
                {ipInfo?.country && (
                  <InfoRow label="Country" value={ipInfo.country} />
                )}
              </div>
              <div className="space-y-2 md:space-y-3">
                {ipInfo?.loc && (
                  <InfoRow label="Coordinates" value={ipInfo.loc} />
                )}
                {ipInfo?.org && (
                  <InfoRow label="ISP" value={ipInfo.org} truncate />
                )}
                {ipInfo?.postal && (
                  <InfoRow label="Postal Code" value={ipInfo.postal} />
                )}
                {ipInfo?.timezone && (
                  <InfoRow label="Timezone" value={ipInfo.timezone} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Location Button */}
        <div className="text-center mb-6 md:mb-8">
          <button
            onClick={handleLocation}
            disabled={isLoading}
            className={`px-6 py-2 md:px-8 md:py-3 rounded-full font-medium text-base md:text-lg transition-all duration-300 flex items-center mx-auto ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/30"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Locating...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Get Precise Location
              </>
            )}
          </button>
        </div>

        {/* Location Data Section */}
        {(locationData || coordinates) && (
          <div className="space-y-6">
            {/* Coordinates Card */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-2xl border border-gray-700">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-cyan-300 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a8 8 0 018 8v7a1 1 0 01-1 1h-1a1 1 0 01-1-1v-7a6 6 0 00-6-6 1 1 0 010-2zm0 9a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1v-3a1 1 0 011-1h1z" />
                </svg>
                Precise Coordinates
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {coordinates && (
                  <>
                    <InfoCard
                      label="Latitude"
                      value={coordinates.lat.toFixed(6)}
                      mono
                    />
                    <InfoCard
                      label="Longitude"
                      value={coordinates.lon.toFixed(6)}
                      mono
                    />
                    {accuracy && (
                      <InfoCard
                        label="Accuracy"
                        value={`${accuracy.toFixed(2)} meters`}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Location Details Card */}
            {locationData && (
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-2xl border border-gray-700">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-cyan-300 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Location Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {locationEntries.map(([key, value]) => (
                    <InfoCard
                      key={key}
                      label={key.replace(/_/g, " ")}
                      value={value}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Map Preview */}
        {coordinates && (
          <div className="mt-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-2xl border border-gray-700 overflow-hidden">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-cyan-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                  clipRule="evenodd"
                />
              </svg>
              Map Preview
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                className="min-h-[300px]"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  coordinates.lon - 0.01
                }%2C${coordinates.lat - 0.01}%2C${coordinates.lon + 0.01}%2C${
                  coordinates.lat + 0.01
                }&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lon}`}
              />
            </div>
            <div className="mt-3 text-center">
              <a
                href={`https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lon}#map=16/${coordinates.lat}/${coordinates.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center"
              >
                View Larger Map
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-400 text-xs md:text-sm">
          <p>
            © {new Date().getFullYear()} Geo Location Finder | Precision
            Location Services
          </p>
        </footer>
      </div>
    </div>
  );
};

// Helper component for info row
const InfoRow = ({
  label,
  value,
  mono = false,
  truncate = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
}) => (
  <div className="flex items-start">
    <span className="w-24 md:w-32 text-gray-400 text-sm md:text-base">
      {label}:
    </span>
    <span
      className={`flex-1 ${mono ? "font-mono" : ""} ${
        truncate ? "truncate" : ""
      } bg-gray-700 px-2 py-1 rounded-md text-sm md:text-base`}
    >
      {value}
    </span>
  </div>
);

// Helper component for grid cards
const InfoCard = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="bg-gray-700/50 rounded-lg p-3 md:p-4 border border-gray-600 hover:border-cyan-400 transition-colors">
    <div className="text-xs md:text-sm text-cyan-300 mb-1 capitalize">
      {label}
    </div>
    <div className={`text-sm md:text-base ${mono ? "font-mono" : ""}`}>
      {value}
    </div>
  </div>
);

export default Suvrodeb;
