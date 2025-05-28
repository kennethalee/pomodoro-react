import React from "react";

export default function SessionCounterDisplay({ workSessionCount }) {
  return (
    <p className="text-base-content/50 text-4xl font-bold sm:text-5xl">
      Session {workSessionCount}
    </p>
  );
}
