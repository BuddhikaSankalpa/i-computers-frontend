/**
 * Formats a timestamp into a readable date string
 * @param {string | Date | number} timestamp - The timestamp to format (ISO string, Date object, or milliseconds)
 * @returns {string} Formatted date string (e.g., "Dec 25, 2023 at 2:30 PM")
 */
export default function formatTimestamp(timestamp) {
    if (!timestamp) {
        return "N/A";
    }

    try {
        const date = new Date(timestamp);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        // Format: "Dec 25, 2023 at 2:30 PM"
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "Invalid Date";
    }
}
