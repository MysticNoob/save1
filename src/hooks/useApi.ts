import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { ApiConfig, PlatformType } from '../types/api';
import { useApiStore } from '../store/apiStore';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addApi } = useApiStore();

  const initializeApi = useCallback(async (config: ApiConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.initializeApi(config);
      if (!response.success) {
        throw new Error(response.error || 'Failed to initialize API');
      }
      addApi(config);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [addApi]);

  const getAuthUrl = useCallback((platform: PlatformType, clientId: string) => {
    const redirectUri = `${window.location.origin}/api-callback`;
    return apiService.getAuthUrl(platform, clientId, redirectUri);
  }, []);

  return {
    loading,
    error,
    initializeApi,
    getAuthUrl
  };
};