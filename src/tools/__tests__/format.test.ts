import { formatDate, formatDuration } from '@/tools/format';

describe('Format Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-03-20T10:30:00');
      expect(formatDate(date)).toBe('20/03/2024');
    });

    it('should handle invalid date', () => {
      expect(formatDate(new Date('invalid'))).toBe('Date invalide');
    });
  });

  describe('formatDuration', () => {
    it('should format duration in seconds', () => {
      expect(formatDuration(30)).toBe('30s');
    });

    it('should format duration in minutes and seconds', () => {
      expect(formatDuration(90)).toBe('1m 30s');
    });

    it('should format duration in hours, minutes and seconds', () => {
      expect(formatDuration(3665)).toBe('1h 1m 5s');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0s');
    });
  });
}); 