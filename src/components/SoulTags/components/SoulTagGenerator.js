function SoulTagGenerator(data = []) {
  const counts = {
    light: 0,
    shadow: 0,
    truth: 0,
  };

  data.forEach((entry) => {
    const tone = entry.emotion || entry.tone || "truth";

    if (tone.includes("Light")) counts.light++;
    else if (tone.includes("Shadow")) counts.shadow++;
    else counts.truth++;
  });

  const tags = [];

  if (counts.light > counts.shadow && counts.light > counts.truth) {
    tags.push("🕊 Peace Whisperer");
  }
  if (counts.shadow > counts.light && counts.shadow > counts.truth) {
    tags.push("🔥 Shadow Tender");
  }
  if (counts.truth > 5) {
    tags.push("⚔ Truth Disruptor");
  }
  if (counts.shadow >= 3 && counts.light >= 3) {
    tags.push("🌘 Night Soul");
  }

  if (tags.length === 0) {
    tags.push("🌱 Emerging Soul");
  }

  return tags;
}

export default SoulTagGenerator;
