/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import "./StadiumDataBar.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

function StadiumDataBar({ stadiumData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: stadiumData.Order,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const dragContent = {};

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="stadium-data-bar"
    >
      <div className="stadium-data-vs-name">
        <div className="home-team-name">
          {stadiumData?.TeamName_H ?? "ホームチーム"}
        </div>
        <div className="vs-text">VS</div>
        <div className="visitor-team-name">
          {stadiumData?.TeamName_V ?? "ビジターチーム"}
        </div>
      </div>
      <div className="stadium-name">
        {stadiumData?.Stadium ?? "スタジアム名"}
      </div>
    </div>
  );
}

export default StadiumDataBar;
