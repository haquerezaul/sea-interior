'use client';
import Image from 'next/image';

const TestimonialCard = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 bg-gray-50 text-center md:text-left md:space-x-20 space-y-8 md:space-y-0">
      
      {/* 👤 Circular Image */}
      <div className="w-40 h-40
      md:w-52 md:h-52 lg:w-60 lg:h-60 relative rounded-full overflow-hidden shrink-0 md:ml-10 transition-all duration-300">
        <Image
          src="/customer profile/Founder.jpeg"
          alt="Martha Stewart"
          fill
          className="object-cover overflow-hidden"
        />
      </div>

      {/* 📝 Testimonial Content */}
      <div className="max-w-xl md:min-w-[60%]">
        <p className="text-md md:text-xl text-gray-700 leading-relaxed md-w-full">
          “At Sea Interior, my mission has always been to make stylish, functional, and personalized spaces a reality for everyone—no matter the budget. From traditional to modern to luxury interiors, we cater to every style preference with one goal in mind: bringing your vision to life with precision and heart. Whether you're renovating a 1BHK home or designing a full-scale office or gym, we make the process seamless, time-efficient, and fully transparent.
          Rooted in Kolkata, we've built a reputation for delivering trend-forward design with practical execution—on time, on budget, and beyond expectations.”
        </p>
        <p className="mt-6 text-xl md:text-3xl font-semibold text-black ">
          – Syed Md Shoib Ali, Founder.
        </p>
      </div>
    </section>
  );
};

export default TestimonialCard;