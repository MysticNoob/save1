import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ApiConfig, PlatformType, TwitterConfig } from '../types/api';
import CryptoJS from 'crypto-js';

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, 'social-hub-secret').toString();
};

const decryptData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, 'social-hub-secret');
  return bytes.toString(CryptoJS.enc.Utf8);
};

interface ApiStore {
  apis: ApiConfig[];
  addApi: (config: Omit<ApiConfig, 'id'>) => void;
  removeApi: (id: string) => void;
  updateApi: (id: string, config: Partial<ApiConfig>) => void;
  getApisByPlatform: (platform: PlatformType) => ApiConfig[];
}

export const useApiStore = create<ApiStore>()(
  persist(
    (set, get) => ({
      apis: [],
      addApi: (config) => {
        const encryptedConfig = {
          ...config,
          id: crypto.randomUUID(),
          apiKey: encryptData(config.apiKey),
          apiSecret: config.apiSecret ? encryptData(config.apiSecret) : undefined,
          accessToken: config.accessToken ? encryptData(config.accessToken) : undefined,
          refreshToken: config.refreshToken ? encryptData(config.refreshToken) : undefined,
          ...(config as TwitterConfig).bearerToken && {
            bearerToken: encryptData((config as TwitterConfig).bearerToken!)
          }
        };
        set((state) => ({ apis: [...state.apis, encryptedConfig] }));
      },
      removeApi: (id) => {
        set((state) => ({
          apis: state.apis.filter((api) => api.id !== id)
        }));
      },
      updateApi: (id, config) => {
        set((state) => ({
          apis: state.apis.map((api) =>
            api.id === id ? { ...api, ...config } : api
          )
        }));
      },
      getApisByPlatform: (platform) => {
        return get().apis.filter((api) => api.platform === platform);
      }
    }),
    {
      name: 'social-hub-apis',
      partialize: (state) => ({
        apis: state.apis.map(api => ({
          ...api,
          apiKey: '**encrypted**',
          apiSecret: api.apiSecret ? '**encrypted**' : undefined,
          accessToken: api.accessToken ? '**encrypted**' : undefined,
          refreshToken: api.refreshToken ? '**encrypted**' : undefined,
          ...(api as TwitterConfig).bearerToken && {
            bearerToken: '**encrypted**'
          }
        }))
      })
    }
  )
);