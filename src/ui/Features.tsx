const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Megacity?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-black text-white p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m-4 8a9 9 0 100-18 9 9 0 000 18z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick & Reliable</h3>
            <p className="text-gray-600">
              Get to your destination on time, every time with our efficient
              service.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-black text-white p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.25c4.97 0 9 4.02 9 9 0 7.125-9 10.5-9 10.5S3 18.375 3 11.25c0-4.98 4.03-9 9-9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">City-wide Coverage</h3>
            <p className="text-gray-600">
              We're available across the entire city, ensuring you're never
              stranded.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-black text-white p-3 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15l3.75-3.75m6.75 2.25a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              Your safety is our top priority, with vetted drivers and secure
              rides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
