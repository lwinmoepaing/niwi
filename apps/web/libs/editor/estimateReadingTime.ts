export function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200; // Average words per minute for reading
  const words = text.trim().split(/\s+/).length; // Split the text by spaces to count words
  const readingTimeMinutes = Math.ceil(words / wordsPerMinute); // Calculate time in minutes
  return readingTimeMinutes <= 1 ? "1 minute" : `${readingTimeMinutes} minutes`;
}
