/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import "./StadiumDataBar.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
function StadiumDataBar({ stadiumData }) {
  // Destructuring the properties from the useSortable hook
  const {
    attributes, // The attributes to apply to the sortable element
    listeners, // The event listeners for the sortable element
    setNodeRef, // A ref that needs to be set on the sortable element
    transform, // The transform to apply to the sortable element
    transition, // The transition object for animating the sortable element
    isDragging, // A flag indicating whether the element is currently being dragged
  } = useSortable({
    id: stadiumData?.Order, // The ID of the sortable element (if stadiumData is defined)
    transition: {
      duration: 150, // The duration of the transition animation in milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)", // The easing function for the transition animation
    },
  });

  // An empty object for drag content (not used in this code)
  const dragContent = {};

  // Styling object for the sortable element
  const style = {
    transition, // Applying the transition object to the style
    transform: CSS.Transform.toString(transform), // Converting the transform to a string and applying it to the style
  };

  // The JSX component to render
  return (
    <div
      ref={setNodeRef} // Setting the ref on the sortable element
      style={style} // Applying the style to the sortable element
      {...attributes} // Applying the attributes to the sortable element
      {...listeners} // Applying the event listeners to the sortable element
      className="stadium-data-bar" // Applying the CSS class to the sortable element
    >
      <div className="stadium-data-vs-name">
        <div className="home-team-name">
          {/* Rendering the HomeTeamName or "" if it's undefined */}
          {stadiumData?.HomeTeamName ?? ""}
        </div>
        <div className="vs">
          <span className="vs-text">VS</span>
        </div>
        <div className="visitor-team-name">
          {/* Rendering the VisitorTeamName or "" if it's undefined */}
          {stadiumData?.VisitorTeamName ?? ""}
        </div>
      </div>
      <div className="stadium-name">
        {/* Rendering the StadiumName or "" if it's undefined */}
        {stadiumData?.StadiumName ?? ""}
      </div>
    </div>
  );
}
export default StadiumDataBar;
