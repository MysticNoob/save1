import { ApiConfig, PlatformType } from '../types/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Platform-specific API configurations
const API_ENDPOINTS = {
  youtube: {
    base: 'https://www.googleapis.com/youtube/v3',
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.force-ssl'
    ],
    auth: 'https://accounts.google.com/o/oauth2/v2/auth'
  },
  instagram: {
    base: 'https://graph.instagram.com/v12.0',
    scopes: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_insights'],
    auth: 'https://api.instagram.com/oauth/authorize'
  },
  tiktok: {
    base: 'https://open-api.tiktok.com/v2',
    scopes: ['user.info.basic', 'video.list', 'video.upload'],
    auth: 'https://www.tiktok.com/auth/authorize/'
  },
  twitter: {
    base: 'https://api.twitter.com/2',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    auth: 'https://twitter.com/i/oauth2/authorize'
  },
  snapchat: {
    base: 'https://kit.snapchat.com/v1',
    scopes: ['https://auth.snapchat.com/oauth2/api/user.display_name', 'https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar'],
    auth: 'https://accounts.snapchat.com/accounts/oauth2/auth'
  }
};

class ApiService {
  private static instance: ApiService;
  private apis: Map<string, ApiConfig> = new Map();

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async initializeApi(config: ApiConfig): Promise<ApiResponse<boolean>> {
    try {
      // Validate API configuration
      const platformConfig = API_ENDPOINTS[config.platform];
      if (!platformConfig) {
        throw new Error(`Unsupported platform: ${config.platform}`);
      }

      // Store API configuration
      this.apis.set(config.id, config);

      // Test API connection
      const isValid = await this.validateApiCredentials(config);
      if (!isValid) {
        throw new Error('Invalid API credentials');
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async validateApiCredentials(config: ApiConfig): Promise<boolean> {
    try {
      switch (config.platform) {
        case 'youtube':
          return await this.validateYouTubeApi(config);
        case 'instagram':
          return await this.validateInstagramApi(config);
        case 'tiktok':
          return await this.validateTikTokApi(config);
        case 'twitter':
          return await this.validateTwitterApi(config);
        case 'snapchat':
          return await this.validateSnapchatApi(config);
        default:
          return false;
      }
    } catch {
      return false;
    }
  }

  private async validateYouTubeApi(config: ApiConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.youtube.base}/channels?part=id&mine=true`, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Accept': 'application/json'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateInstagramApi(config: ApiConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.instagram.base}/me?fields=id,username`, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateTikTokApi(config: ApiConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.tiktok.base}/user/info/`, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateTwitterApi(config: ApiConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.twitter.base}/users/me`, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateSnapchatApi(config: ApiConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.snapchat.base}/me`, {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  getApiScopes(platform: PlatformType): string[] {
    return API_ENDPOINTS[platform]?.scopes || [];
  }

  getAuthUrl(platform: PlatformType, clientId: string, redirectUri: string): string {
    const config = API_ENDPOINTS[platform];
    if (!config) return '';

    const scopes = this.getApiScopes(platform).join(' ');
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes
    });

    return `${config.auth}?${params.toString()}`;
  }
}

export const apiService = ApiService.getInstance();