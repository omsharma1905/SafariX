import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 bg-white min-h-screen">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-12 sm:mt-16 leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:{' '}
        </span>
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center max-w-3xl">
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interests and budget.
      </p>

      <Link to="/create-trip">
        <Button className="mt-2">
          Get Started, It&apos;s Free
        </Button>
      </Link>

      <img
        src="/Landing.png"
        alt="AI Trip Planner Preview"
        className="mt-6 sm:-mt-6 w-full max-w-5xl"
      />
    </section>
  )
}

export default Hero;