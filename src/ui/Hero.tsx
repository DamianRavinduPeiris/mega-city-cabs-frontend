import Features from "./Features";
import Header from "./Header";
import HowItWorks from "./HowItWorks";


export default function Hero() {
  return (
    <div>
      <Header />
      <section className="pt-24 pb-12 px-4 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Urban Mobility, <br /> Redefined
            </h1>
            <p className="text-xl mb-6">
              Experience the future of urban transportation with MegaCity Cabs.
            </p>
            <button className="bg-white text-black py-3 px-8 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
              Book a Ride
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1730197725/assets/0f/48c7ba-da13-4fdc-b54c-42878042f513/original/Airport-Fall.png"
              alt="Urban Mobility"
              className="w-full max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </section>
      <Features />
      <HowItWorks />
      
    </div>
  );
}
