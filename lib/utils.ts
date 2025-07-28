export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  
  // Use a consistent format that works the same on server and client
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC' // Ensures consistent formatting regardless of server/client timezone
  }
  
  return date.toLocaleDateString('en-US', options)
}

export function formatDateTime(dateString: string, timeString?: string): string {
  const baseDate = formatDate(dateString)
  return timeString ? `${baseDate} at ${timeString}` : baseDate
} 