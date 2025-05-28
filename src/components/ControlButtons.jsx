import React from "react";

export default function ControlButtons({ onStart, onStop, onSkip }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-4">
      <button
        className="btn btn-soft btn-success h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onStart}
      >
        Start
      </button>
      <button
        className="btn btn-soft btn-error h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onStop}
      >
        Stop
      </button>
      <button
        className="btn btn-soft btn-warning h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onSkip}
      >
        Skip
      </button>
    </div>
  );
}
