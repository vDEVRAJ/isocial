import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MoodFilter from "./components/MoodFilter";
import WhisperPrompt from "./components/WhisperPrompt";

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 28.6139,
  lng: 77.2090,
};

const allMarkers = [
  { id: 1, lat: 28.614, lng: 77.209, mood: "🧘 Calm" },
  { id: 2, lat: 28.620, lng: 77.200, mood: "🔥 Angry" },
  { id: 3, lat: 28.618, lng: 77.215, mood: "💧 Sad" },
];

function Nearby() {
  const [filteredMood, setFilteredMood] = useState("All");

  const markersToShow =
    filteredMood === "All"
      ? allMarkers
      : allMarkers.filter((pin) => pin.mood === filteredMood);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🌍 Nearby Souls</h1>
      <MoodFilter onFilter={setFilteredMood} />
      <WhisperPrompt />

      <LoadScript googleMapsApiKey="AIzaSyBnsQmU-QBq3b00ySK2ANyd5-tQFdViMEY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {markersToShow.map((pin) => (
            <Marker
              key={pin.id}
              position={{ lat: pin.lat, lng: pin.lng }}
              label={pin.mood}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Nearby;
