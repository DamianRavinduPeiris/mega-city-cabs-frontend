  interface StepProps {
    image: string;
    title: string;
    description: string;
  }
  
  const Step = ({ image, title, description }: StepProps) => (
    <div className="flex items-start mb-8">
      <div className="mr-4 flex-shrink-0">
        <img src={image} alt={title} className="w-12 h-12 rounded-full" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
  
  const HowItWorks = () => {
    return (
      <footer className="bg-gray-100 py-8 px-4 mt-15">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              3 Easy Steps<br /> to Get Started
            </h1>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end flex-col">
          <Step
            image="https://static.vecteezy.com/system/resources/previews/003/731/316/non_2x/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg" // Replace with your image URL
            title="1. Sign Up or Log In."
            description="Create an account or log in with your existing credentials."
          />
          <Step
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwxNJYgvgZrokFOp5TkdD3eZ3CPTsLeC9Hw&s" 
            title="2. Set Your Destination."
            description="Enter your pickup location and destination in the web."
          />
          <Step
            image="https://static.vecteezy.com/system/resources/previews/000/623/239/non_2x/auto-car-logo-template-vector-icon.jpg"
            title="3. Enjoy Your Ride"
            description="A nearby driver will pick you up and take you to your destination."
          />
          </div>
        </div>
       
      </footer>
    )
  }
  
  export default HowItWorks