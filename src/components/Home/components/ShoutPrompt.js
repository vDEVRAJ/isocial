import React from "react";

function ShoutPrompt() {
  return (
    <div className="bg-indigo-100 border border-indigo-300 rounded-md p-4 mb-4 text-center">
      <p className="text-lg text-indigo-700 font-medium">
        What’s your truth right now?
      </p>
      <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Shout It Out →
      </button>
    </div>
  );
}

export default ShoutPrompt;
