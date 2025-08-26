export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatTimeToHHMM(time?: string): string {
  if (!time) return 'Unknown Time';
  return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

