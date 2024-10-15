
import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-8 p-4"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce Shopping Cart</h1>
      <p className="text-xl">Find the best products at the best prices!</p>
    </motion.div>
  );
};

export default Home;