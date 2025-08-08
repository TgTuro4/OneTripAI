import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const cards = [
    {
      title: "Plan a New Trip",
      description: "Create your next adventure!",
      imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
      link: "/plan"
    },
    {
      title: "My Trips",
      description: "View and manage your saved trips",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop",
      link: "/trips"
    },
    {
      title: "Profile",
      description: "Update your personal information",
      imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      link: "/profile"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-bold text-indigo-600 animate-pulse-glow">OneTrip</h1>
            </div>
            <div className="flex items-center">
              <Link
                to="/logout" // Placeholder for logout functionality
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {cards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Link to={card.link} className="block group">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 w-80">
                      <img src={card.imageUrl} alt={card.title} className="w-full h-56 object-cover" />
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
                        <p className="text-gray-600 mt-2">{card.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
