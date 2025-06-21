'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, Users2, Paintbrush2 } from 'lucide-react';

const features = [
  {
    icon: <Building2 className="h-8 w-8 text-teal-700" />,
    title: '10+ Years of Expertise',
    desc: 'Designing homes that reflect dreams & functionality since 2013.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-teal-700" />,
    title: '500+ Spaces Transformed',
    desc: 'From cozy 1BHKs to lavish villas and offices — we’ve done it all.',
  },
  {
    icon: <Paintbrush2 className="h-8 w-8 text-teal-700" />,
    title: 'Creative & Personalized',
    desc: 'Every design is unique — just like your personality and lifestyle.',
  },
  {
    icon: <Users2 className="h-8 w-8 text-teal-700" />,
    title: 'Client-Centric Team',
    desc: 'From consultation to final polish, we make it smooth and stress-free.',
  },
];

const AboutUs = () => {
  return (
    <section id='about' className="bg-white py-14 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-teal-700 font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Sea Interior
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg md:text-xl mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Where design meets soul — bringing elegance, comfort, and creativity into every corner of your space.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start space-x-4 text-left"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div>{item.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;