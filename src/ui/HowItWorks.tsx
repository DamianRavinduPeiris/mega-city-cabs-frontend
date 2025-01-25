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
    <section id="how-it-works" className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">3 Quick steps to get you set up!</h2>
        <div className="max-w-2xl mx-auto">
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
    </section>
  );
};

export default HowItWorks;
