export const convertText = (text, to) => {
  if (!text || !to) return text;
  if (to === "name") {
    // Convert URL-friendly text (e.g., "my-module-key") to a human-readable name (e.g., "My Module Key")
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join with space
  } else if (to === "url") {
    // Convert name (e.g., "My Module Key!") to a URL-friendly key (e.g., "my-module-key")
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim() // Trim whitespace from start and end
      .replace(/\s+/g, "-"); // Replace spaces with dashes
  } else if (to === "key") {
    // Convert name (e.g., "My Module Key!") to a URL-friendly key (e.g., "my-module-key")
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .trim() // Trim whitespace from start and end
      .split(/\s+/) // Split by whitespace
      .map(
        (word, index) =>
          index === 0
            ? word // First word remains lowercase
            : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize first letter of subsequent words
      )
      .join("");
  }

  return text;
};
