import React from "react";

function Manifesto({ onComplete }) {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide">
        🧿 Welcome to iSocial
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300 leading-relaxed">
        You’ve entered a space where silence speaks louder than trends.
        Where emotions are sacred.  
        And truth isn’t algorithmic — it’s alive.
      </p>
      <p className="text-indigo-400 font-semibold mb-10">
        This isn’t social media.  
        It’s your soul’s mirror.
      </p>
      <button
        onClick={onComplete}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Begin Journey →
      </button>
    </div>
  );
}

export default Manifesto;
