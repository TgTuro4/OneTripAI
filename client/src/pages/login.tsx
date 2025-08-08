import { motion } from "framer-motion";
import { Loginbox } from "../components/loginbox";
import type { FC, ReactNode } from 'react';

interface InspirationalSectionProps {
  imageUrl: string;
  title: string;
  children: ReactNode;
  imageLeft?: boolean;
}

const InspirationalSection: FC<InspirationalSectionProps> = ({ imageUrl, title, children, imageLeft = false }) => {
  const imageVariants = {
    hidden: { opacity: 0, x: imageLeft ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: imageLeft ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="py-20 px-4 md:px-8 lg:px-16 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`container mx-auto flex flex-col md:flex-row items-center gap-12 ${imageLeft ? 'md:flex-row-reverse' : ''}`}>
        <motion.div className="w-full md:w-1/2" variants={imageVariants}>
          <img src={imageUrl} alt={title} className="rounded-lg shadow-2xl w-full h-auto object-cover" style={{maxHeight: '500px'}} />
        </motion.div>
        <motion.div className="w-full md:w-1/2 text-center md:text-left" variants={textVariants}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">
            {children}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

function Login() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <header
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed relative bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')]"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
            <motion.h1 
                className="text-5xl md:text-7xl text-white font-extrabold text-center mb-8 drop-shadow-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Your Next Adventure Awaits
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <Loginbox />
            </motion.div>
        </div>
      </header>

      {/* Inspirational Sections */}
      <main>
        <InspirationalSection
          imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          title="Plan Your Dream Itinerary"
          imageLeft={false}
        >
          Effortlessly map out your journey from start to finish. Our AI-powered tools help you discover hidden gems, book the best spots, and create a personalized timeline so you don't miss a thing.
        </InspirationalSection>

        <InspirationalSection
          imageUrl="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop"
          title="Travel Smarter, Not Harder"
          imageLeft={true}
        >
          Get intelligent recommendations for flights, hotels, and activities based on your preferences and budget. We analyze thousands of options to find the perfect fit for your unique travel style.
        </InspirationalSection>

        <InspirationalSection
          imageUrl="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop"
          title="All Your Plans in One Place"
          imageLeft={false}
        >
          No more juggling between different apps and documents. Keep all your bookings, notes, and confirmations organized in one beautiful, accessible dashboard. Your entire trip, right at your fingertips.
        </InspirationalSection>
      </main>
    </div>
  );
}

export default Login;
