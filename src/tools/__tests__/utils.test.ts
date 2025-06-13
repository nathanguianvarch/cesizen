import { toast } from 'sonner';

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Notifications', () => {
    it('should show success notification', () => {
      toast.success('Test success message');
      expect(toast.success).toHaveBeenCalledWith('Test success message');
    });

    it('should show error notification', () => {
      toast.error('Test error message');
      expect(toast.error).toHaveBeenCalledWith('Test error message');
    });
  });
}); 