'use client';
import Image from 'next/image';

const TestimonialCard = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 bg-gray-50 text-center md:text-left md:space-x-20 space-y-8 md:space-y-0">
      
      {/* 👤 Circular Image */}
      <div className="w-40 h-40 relative rounded-full overflow-hidden shrink-0 md:ml-10">
        <Image
          src="/customer profile/ritika.jpg"
          alt="Martha Stewart"
          fill
          className="object-cover"
        />
      </div>

      {/* 📝 Testimonial Content */}
      <div className="max-w-xl md:min-w-[60%]">
        <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
          “We recommend Sea Interior as the best online interior design service due to its comprehensive full-service offerings.”
        </p>
        <p className="mt-6 text-xl md:text-3xl font-semibold text-black font-serif">
          – martha stewart
        </p>
      </div>
    </section>
  );
};

export default TestimonialCard;