import React, { useState } from "react";
import ModeSelector from "./components/ModeSelector";
import KaChatBox from "./components/KaChatBox";
import KaResponse from "./components/KaResponse";

function SoulMirror() {
  const [mode, setMode] = useState("🪞 Gita");
  const [reflection, setReflection] = useState("");

  const generateReflection = (input) => {
    const mockResponse = {
      "🪞 Gita": `The soul is neither born, nor does it die. You are not your pain, Devraj.`,
      "⚔️ Mahabharata": `Even Arjuna trembled in doubt. But courage is choosing truth despite confusion.`,
      "🔥 Shiv Puran": `Destruction is not the end, but the path to rebirth. Burn, then bloom.`,
      "📖 Bible": `Blessed are the broken-hearted, for they shall be comforted.`,
      "☪️ Quran": `Indeed, with hardship comes ease. Your tears are not unseen.`,
      "🌊 Tao": `The river does not resist the stone. Flow around your pain.`,
      "🕶 Shadow": `Stop lying to yourself. You knew the truth. You just didn’t want to accept it.`,
    };

    setReflection(mockResponse[mode] || "Ka is silent. Try again.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🪞 Ka – The Soul Mirror</h1>
      <ModeSelector selectedMode={mode} onSelect={setMode} />
      <KaChatBox onSend={generateReflection} />
      <KaResponse message={reflection} mode={mode} />
    </div>
  );
}

export default SoulMirror;
