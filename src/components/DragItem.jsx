import { useState } from "react";

export default function DragItem({ children, data, className = "" }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);

    // Create a ghost image that follows cursor
    const dragGhost = e.target.cloneNode(true);
    dragGhost.style.position = "absolute";
    dragGhost.style.top = "-1000px";
    dragGhost.style.width = "fit-content";
    document.body.appendChild(dragGhost);
    e.dataTransfer.setDragImage(dragGhost, 0, 0);

    // Set the drag data
    e.dataTransfer.setData("application/json", JSON.stringify(data));

    // Add cursor styling
    const cursor = document.createElement("div");
    cursor.classList.add("drag-cursor");
    document.body.appendChild(cursor);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Clean up ghost elements
    const cursor = document.querySelector(".drag-cursor");
    if (cursor) cursor.remove();

    const dragGhost = document.querySelector(".drag-ghost");
    if (dragGhost) dragGhost.remove();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing select-none 
        ${isDragging ? "opacity-50" : ""} 
        ${className}`}
    >
      {children}
    </div>
  );
}
