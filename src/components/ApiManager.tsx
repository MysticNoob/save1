import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Twitter, ExternalLink } from 'lucide-react';
import { useApiStore } from '../store/apiStore';
import { PlatformType, ApiConfig } from '../types/api';
import { useThemeStore } from '../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiGuide } from './ApiGuide';

const platformIcons = {
  youtube: '🎥',
  instagram: '📸',
  tiktok: '🎵',
  snapchat: '👻',
  twitter: <Twitter className="w-6 h-6 text-blue-400" />
};

const platformFields = {
  twitter: ['apiKey', 'apiSecret', 'bearerToken', 'clientId', 'clientSecret'],
  youtube: ['apiKey', 'apiSecret', 'clientId', 'clientSecret'],
  instagram: ['apiKey', 'apiSecret', 'accessToken'],
  tiktok: ['apiKey', 'apiSecret'],
  snapchat: ['apiKey', 'apiSecret']
};

export const ApiManager = () => {
  const { theme } = useThemeStore();
  const { apis, addApi, removeApi, updateApi } = useApiStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(null);
  const [editingApi, setEditingApi] = useState<ApiConfig | null>(null);
  const [newApi, setNewApi] = useState({
    platform: 'youtube' as PlatformType,
    name: '',
    apiKey: '',
    apiSecret: '',
    bearerToken: '',
    clientId: '',
    clientSecret: '',
    accessToken: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const relevantFields = platformFields[newApi.platform];
    const apiConfig = {
      platform: newApi.platform,
      name: newApi.name,
      ...Object.fromEntries(
        Object.entries(newApi).filter(([key]) => 
          relevantFields.includes(key)
        )
      )
    };

    if (isEditing && editingApi) {
      updateApi(editingApi.id, apiConfig);
      setIsEditing(false);
      setEditingApi(null);
    } else {
      addApi(apiConfig);
      setIsAdding(false);
    }

    setSelectedPlatform(null);
    setNewApi({
      platform: 'youtube',
      name: '',
      apiKey: '',
      apiSecret: '',
      bearerToken: '',
      clientId: '',
      clientSecret: '',
      accessToken: ''
    });
  };

  const handleEdit = (api: ApiConfig) => {
    setEditingApi(api);
    setIsEditing(true);
    setSelectedPlatform(api.platform);
    setNewApi({
      platform: api.platform,
      name: api.name,
      apiKey: api.apiKey || '',
      apiSecret: (api as any).apiSecret || '',
      bearerToken: (api as any).bearerToken || '',
      clientId: (api as any).clientId || '',
      clientSecret: (api as any).clientSecret || '',
      accessToken: (api as any).accessToken || ''
    });
  };

  const renderPlatformSpecificFields = () => {
    if (!selectedPlatform) return null;
    const fields = platformFields[selectedPlatform];
    
    return fields.map(field => (
      <div key={field}>
        <label className="block text-sm font-medium mb-1 capitalize">
          {field.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type="password"
          className="w-full bg-gray-700 rounded-lg p-2"
          value={newApi[field]}
          onChange={(e) => setNewApi({ ...newApi, [field]: e.target.value })}
          placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
        />
      </div>
    ));
  };

  const renderForm = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Platform</label>
          <select
            className="w-full bg-gray-700 rounded-lg p-2"
            value={selectedPlatform || ''}
            onChange={(e) => {
              const platform = e.target.value as PlatformType;
              setSelectedPlatform(platform);
              setNewApi(prev => ({ ...prev, platform }));
            }}
            disabled={isEditing}
          >
            <option value="">Select a platform</option>
            {Object.keys(platformIcons).map((platform) => (
              <option key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {selectedPlatform && (
          <div>
            <label className="block text-sm font-medium mb-1">Account Name</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg p-2"
              value={newApi.name}
              onChange={(e) => setNewApi({ ...newApi, name: e.target.value })}
              placeholder="Account Name"
            />
          </div>
        )}
      </div>

      {selectedPlatform && <ApiGuide platform={selectedPlatform} />}

      {selectedPlatform && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderPlatformSpecificFields()}
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
                setEditingApi(null);
                setSelectedPlatform(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${theme.gradient} hover:opacity-90 transition-opacity`}
            >
              {isEditing ? 'Update API' : 'Add API'}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Management</h2>
        {!isAdding && !isEditing && (
          <button
            onClick={() => setIsAdding(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${theme.gradient} hover:opacity-90 transition-opacity`}
          >
            <Plus className="w-4 h-4" />
            <span>Add API</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {(isAdding || isEditing) && renderForm()}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apis.map((api) => (
          <motion.div
            key={api.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {typeof platformIcons[api.platform] === 'string' 
                    ? platformIcons[api.platform] 
                    : platformIcons[api.platform]}
                </span>
                <div>
                  <h3 className="font-semibold">{api.name}</h3>
                  <p className="text-sm text-gray-400">{api.platform}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(api)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => removeApi(api.id)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};