import React from 'react';

const Map = () => {
  return (
    <div className="bg-[#0c0a08] py-24">
      <section className="max-w-7xl mx-auto px-6">

        <div className="overflow-hidden rounded-2xl border border-[rgba(196,149,74,0.15)] shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3590707956655!2d7.387637574996722!3d6.847488019313579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044e934bbdc2cdb%3A0x2e9950e6d73b175c!2sCedar%20Court%20Nsukka!5e0!3m2!1sen!2sng!4v1786069641270!5m2!1sen!2sng"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

      </section>
    </div>
  );
};

export default Map;