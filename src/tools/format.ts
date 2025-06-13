export const formatDate = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return 'Date invalide';
  }
  return date.toLocaleDateString('fr-FR');
};

export const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '0s';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}s`;

  return result.trim();
}; 