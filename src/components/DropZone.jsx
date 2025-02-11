import { useState } from "react";

export default function DropZone({
  onDrop,
  children,
  className = "",
  acceptedTypes = [], // Array of accepted drop types
}) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));

      // Check if the dropped item type is accepted
      if (acceptedTypes.length > 0 && !acceptedTypes.includes(data.type)) {
        return;
      }

      onDrop(data);
    } catch (error) {
      console.error("Error parsing drop data:", error);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        transition-all duration-200
        ${
          isOver ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-200"
        } 
        border-2 border-dashed rounded-lg
        ${className}`}
    >
      {children}
    </div>
  );
}
