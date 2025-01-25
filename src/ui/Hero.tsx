export default function Hero() {
  return (
    <div>
      <section className="pt-24 pb-12 px-4 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Urban Mobility,Redefined
            </h1>
            <p className="text-xl mb-6">
              Experience the future of urban transportation with MegaCity Cabs.
            </p>
            <button className="bg-white text-black py-2 px-6 rounded-full font-semibold flex items-center hover:bg-gray-200 transition duration-300">
              Book a Ride
            </button>
          </div>
          <div className="md:w-1/2"></div>
        </div>
      </section>
    </div>
  );
}
