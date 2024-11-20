export type PlatformType = 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'snapchat';

export interface BaseApiConfig {
  id: string;
  platform: PlatformType;
  name: string;
}

export interface YouTubeConfig extends BaseApiConfig {
  clientId: string;
  clientSecret: string;
  apiKey: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface InstagramConfig extends BaseApiConfig {
  accessToken: string;
  userId: string;
}

export interface TikTokConfig extends BaseApiConfig {
  clientKey: string;
  clientSecret: string;
  accessToken?: string;
}

export interface TwitterConfig extends BaseApiConfig {
  apiKey: string;
  apiSecret: string;
  bearerToken: string;
  accessToken?: string;
  accessSecret?: string;
}

export interface SnapchatConfig extends BaseApiConfig {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
}

export type ApiConfig = YouTubeConfig | InstagramConfig | TikTokConfig | TwitterConfig | SnapchatConfig;

export interface ApiEndpoint {
  name: string;
  description: string;
  requiredFields: string[];
  scopes: string[];
  baseUrl: string;
}</content></file>

<boltAction type="file" filePath="src/config/apiEndpoints.ts">import { ApiEndpoint } from '../types/api';

export const API_ENDPOINTS: Record<string, ApiEndpoint> = {
  youtube: {
    name: 'YouTube Data API v3',
    description: 'Manage YouTube content, analytics, and channel data',
    requiredFields: ['clientId', 'clientSecret', 'apiKey'],
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.analytics.readonly'
    ],
    baseUrl: 'https://www.googleapis.com/youtube/v3'
  },
  instagram: {
    name: 'Instagram Graph API',
    description: 'Access Instagram business account features and insights',
    requiredFields: ['accessToken', 'userId'],
    scopes: [
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_insights'
    ],
    baseUrl: 'https://graph.instagram.com/v12.0'
  },
  tiktok: {
    name: 'TikTok API v2',
    description: 'Manage TikTok content and access analytics',
    requiredFields: ['clientKey', 'clientSecret'],
    scopes: [
      'user.info.basic',
      'video.list',
      'video.upload',
      'video.analytics'
    ],
    baseUrl: 'https://open-api.tiktok.com/v2'
  },
  twitter: {
    name: 'Twitter API v2',
    description: 'Post tweets and access Twitter analytics',
    requiredFields: ['apiKey', 'apiSecret', 'bearerToken'],
    scopes: [
      'tweet.read',
      'tweet.write',
      'users.read',
      'offline.access'
    ],
    baseUrl: 'https://api.twitter.com/2'
  },
  snapchat: {
    name: 'Snap Kit API',
    description: 'Integrate with Snapchat features',
    requiredFields: ['clientId', 'clientSecret'],
    scopes: [
      'https://auth.snapchat.com/oauth2/api/user.display_name',
      'https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar'
    ],
    baseUrl: 'https://kit.snapchat.com/v1'
  }
};</content></file>

<boltAction type="file" filePath="src/services/platformServices.ts">import { ApiConfig } from '../types/api';
import { API_ENDPOINTS } from '../config/apiEndpoints';

class PlatformService {
  private static instance: PlatformService;
  private constructor() {}

  static getInstance(): PlatformService {
    if (!PlatformService.instance) {
      PlatformService.instance = new PlatformService();
    }
    return PlatformService.instance;
  }

  async uploadContent(config: ApiConfig, file: File, metadata: any) {
    switch (config.platform) {
      case 'youtube':
        return this.uploadToYouTube(config, file, metadata);
      case 'instagram':
        return this.uploadToInstagram(config, file, metadata);
      case 'tiktok':
        return this.uploadToTikTok(config, file, metadata);
      case 'twitter':
        return this.uploadToTwitter(config, file, metadata);
      case 'snapchat':
        return this.uploadToSnapchat(config, file, metadata);
      default:
        throw new Error(`Unsupported platform: ${config.platform}`);
    }
  }

  async getAnalytics(config: ApiConfig, metrics: string[], timeRange: { start: Date; end: Date }) {
    switch (config.platform) {
      case 'youtube':
        return this.getYouTubeAnalytics(config, metrics, timeRange);
      case 'instagram':
        return this.getInstagramAnalytics(config, metrics, timeRange);
      case 'tiktok':
        return this.getTikTokAnalytics(config, metrics, timeRange);
      case 'twitter':
        return this.getTwitterAnalytics(config, metrics, timeRange);
      case 'snapchat':
        return this.getSnapchatAnalytics(config, metrics, timeRange);
      default:
        throw new Error(`Unsupported platform: ${config.platform}`);
    }
  }

  async schedulePost(config: ApiConfig, content: any, scheduledTime: Date) {
    switch (config.platform) {
      case 'youtube':
        return this.scheduleYouTubePost(config, content, scheduledTime);
      case 'instagram':
        return this.scheduleInstagramPost(config, content, scheduledTime);
      case 'tiktok':
        return this.scheduleTikTokPost(config, content, scheduledTime);
      case 'twitter':
        return this.scheduleTwitterPost(config, content, scheduledTime);
      case 'snapchat':
        return this.scheduleSnapchatPost(config, content, scheduledTime);
      default:
        throw new Error(`Unsupported platform: ${config.platform}`);
    }
  }

  // Platform-specific implementations
  private async uploadToYouTube(config: ApiConfig, file: File, metadata: any) {
    const endpoint = API_ENDPOINTS.youtube.baseUrl;
    // Implementation for YouTube upload
  }

  private async uploadToInstagram(config: ApiConfig, file: File, metadata: any) {
    const endpoint = API_ENDPOINTS.instagram.baseUrl;
    // Implementation for Instagram upload
  }

  private async uploadToTikTok(config: ApiConfig, file: File, metadata: any) {
    const endpoint = API_ENDPOINTS.tiktok.baseUrl;
    // Implementation for TikTok upload
  }

  private async uploadToTwitter(config: ApiConfig, file: File, metadata: any) {
    const endpoint = API_ENDPOINTS.twitter.baseUrl;
    // Implementation for Twitter upload
  }

  private async uploadToSnapchat(config: ApiConfig, file: File, metadata: any) {
    const endpoint = API_ENDPOINTS.snapchat.baseUrl;
    // Implementation for Snapchat upload
  }

  // Analytics implementations
  private async getYouTubeAnalytics(config: ApiConfig, metrics: string[], timeRange: any) {
    const endpoint = `${API_ENDPOINTS.youtube.baseUrl}/analytics`;
    // Implementation for YouTube analytics
  }

  private async getInstagramAnalytics(config: ApiConfig, metrics: string[], timeRange: any) {
    const endpoint = `${API_ENDPOINTS.instagram.baseUrl}/insights`;
    // Implementation for Instagram analytics
  }

  private async getTikTokAnalytics(config: ApiConfig, metrics: string[], timeRange: any) {
    const endpoint = `${API_ENDPOINTS.tiktok.baseUrl}/analytics`;
    // Implementation for TikTok analytics
  }

  private async getTwitterAnalytics(config: ApiConfig, metrics: string[], timeRange: any) {
    const endpoint = `${API_ENDPOINTS.twitter.baseUrl}/analytics`;
    // Implementation for Twitter analytics
  }

  private async getSnapchatAnalytics(config: ApiConfig, metrics: string[], timeRange: any) {
    const endpoint = `${API_ENDPOINTS.snapchat.baseUrl}/insights`;
    // Implementation for Snapchat analytics
  }

  // Scheduling implementations
  private async scheduleYouTubePost(config: ApiConfig, content: any, scheduledTime: Date) {
    const endpoint = `${API_ENDPOINTS.youtube.baseUrl}/videos`;
    // Implementation for YouTube scheduling
  }

  private async scheduleInstagramPost(config: ApiConfig, content: any, scheduledTime: Date) {
    const endpoint = `${API_ENDPOINTS.instagram.baseUrl}/media`;
    // Implementation for Instagram scheduling
  }

  private async scheduleTikTokPost(config: ApiConfig, content: any, scheduledTime: Date) {
    const endpoint = `${API_ENDPOINTS.tiktok.baseUrl}/videos`;
    // Implementation for TikTok scheduling
  }

  private async scheduleTwitterPost(config: ApiConfig, content: any, scheduledTime: Date) {
    const endpoint = `${API_ENDPOINTS.twitter.baseUrl}/tweets`;
    // Implementation for Twitter scheduling
  }

  private async scheduleSnapchatPost(config: ApiConfig, content: any, scheduledTime: Date) {
    const endpoint = `${API_ENDPOINTS.snapchat.baseUrl}/content`;
    // Implementation for Snapchat scheduling
  }
}

export const platformService = PlatformService.getInstance();</content></file>

<boltAction type="file" filePath="src/hooks/usePlatform.ts">import { useState } from 'react';
import { platformService } from '../services/platformServices';
import { ApiConfig } from '../types/api';

export const usePlatform = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadContent = async (config: ApiConfig, file: File, metadata: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await platformService.uploadContent(config, file, metadata);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAnalytics = async (
    config: ApiConfig,
    metrics: string[],
    timeRange: { start: Date; end: Date }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await platformService.getAnalytics(config, metrics, timeRange);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const schedulePost = async (config: ApiConfig, content: any, scheduledTime: Date) => {
    setLoading(true);
    setError(null);
    try {
      const result = await platformService.schedulePost(config, content, scheduledTime);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadContent,
    getAnalytics,
    schedulePost
  };
};</content></file>

<boltAction type="start">
<command>npm run dev</command>