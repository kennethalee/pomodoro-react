import React from "react";

export default function TimerDisplay({ timeLeft, phase }) {
  function formatTime() {
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="text-xl font-bold sm:text-5xl">{phase}</div>
      <div className="font-mono text-3xl sm:text-5xl">{formatTime()}</div>
    </>
  );
}
