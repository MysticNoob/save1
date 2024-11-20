import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PlatformType } from '../types/api';

interface Guide {
  title: string;
  steps: {
    title: string;
    details: string[];
  }[];
  requirements: string[];
  links: {
    text: string;
    url: string;
  }[];
}

const platformGuides: Record<PlatformType, Guide> = {
  youtube: {
    title: 'YouTube Data API Setup Guide',
    steps: [
      {
        title: '1. Create Google Cloud Project',
        details: [
          'Visit Google Cloud Console (https://console.cloud.google.com)',
          'Create a new project or select existing one',
          'Enable the YouTube Data API v3'
        ]
      },
      {
        title: '2. Configure OAuth Consent',
        details: [
          'Set up OAuth consent screen',
          'Add required scopes',
          'Add test users if in testing mode'
        ]
      },
      {
        title: '3. Create Credentials',
        details: [
          'Create OAuth 2.0 Client ID',
          'Configure authorized redirect URIs',
          'Download client configuration'
        ]
      }
    ],
    requirements: [
      'Google Cloud account',
      'Verified OAuth consent screen',
      'YouTube channel ownership',
      'Valid redirect URIs'
    ],
    links: [
      {
        text: 'Google Cloud Console',
        url: 'https://console.cloud.google.com'
      },
      {
        text: 'YouTube Data API Documentation',
        url: 'https://developers.google.com/youtube/v3'
      },
      {
        text: 'OAuth 2.0 Setup Guide',
        url: 'https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps'
      }
    ]
  },
  instagram: {
    title: 'Instagram Graph API Setup Guide',
    steps: [
      {
        title: '1. Create Facebook App',
        details: [
          'Go to Facebook Developers (https://developers.facebook.com)',
          'Create a new app or use existing one',
          'Add Instagram Graph API product'
        ]
      },
      {
        title: '2. Configure Instagram Account',
        details: [
          'Convert to Professional/Business account',
          'Link to Facebook Page',
          'Configure Basic Display API'
        ]
      },
      {
        title: '3. Generate Access Token',
        details: [
          'Set up OAuth authentication',
          'Request required permissions',
          'Generate long-lived access token'
        ]
      }
    ],
    requirements: [
      'Facebook Developer account',
      'Instagram Professional account',
      'Facebook Page',
      'Valid OAuth redirect URIs'
    ],
    links: [
      {
        text: 'Facebook Developers',
        url: 'https://developers.facebook.com'
      },
      {
        text: 'Instagram Graph API Documentation',
        url: 'https://developers.facebook.com/docs/instagram-api'
      },
      {
        text: 'Instagram Basic Display API',
        url: 'https://developers.facebook.com/docs/instagram-basic-display-api'
      }
    ]
  },
  twitter: {
    title: 'Twitter API v2 Setup Guide',
    steps: [
      {
        title: '1. Apply for Developer Account',
        details: [
          'Go to Twitter Developer Portal (https://developer.twitter.com)',
          'Sign up for a Developer account',
          'Complete the application form:',
          '- Describe your intended API usage',
          '- Explain how you will use Twitter data',
          '- Provide detailed use cases'
        ]
      },
      {
        title: '2. Create Project and App',
        details: [
          'Create a new project',
          'Add an app to the project',
          'Configure app permissions',
          'Generate API keys and tokens'
        ]
      },
      {
        title: '3. Set Up Authentication',
        details: [
          'Configure OAuth 2.0',
          'Add callback URLs',
          'Generate access tokens'
        ]
      }
    ],
    requirements: [
      'Twitter Developer account',
      'Approved developer application',
      'Valid callback URLs',
      'Detailed project description',
      'Privacy Policy URL'
    ],
    links: [
      {
        text: 'Twitter Developer Portal',
        url: 'https://developer.twitter.com/en/portal/dashboard'
      },
      {
        text: 'API v2 Documentation',
        url: 'https://developer.twitter.com/en/docs/twitter-api'
      },
      {
        text: 'OAuth 2.0 Guide',
        url: 'https://developer.twitter.com/en/docs/authentication/oauth-2-0'
      }
    ]
  },
  tiktok: {
    title: 'TikTok API Setup Guide',
    steps: [
      {
        title: '1. Join TikTok for Developers',
        details: [
          'Visit TikTok for Developers (https://developers.tiktok.com)',
          'Create developer account',
          'Verify account information'
        ]
      },
      {
        title: '2. Create App',
        details: [
          'Register new application',
          'Configure app settings',
          'Add required permissions'
        ]
      },
      {
        title: '3. Configure Authentication',
        details: [
          'Set up OAuth flow',
          'Add redirect URIs',
          'Generate app credentials'
        ]
      }
    ],
    requirements: [
      'TikTok Developer account',
      'Verified business account',
      'Valid callback URLs',
      'App privacy policy'
    ],
    links: [
      {
        text: 'TikTok for Developers',
        url: 'https://developers.tiktok.com'
      },
      {
        text: 'API Documentation',
        url: 'https://developers.tiktok.com/doc'
      },
      {
        text: 'Authentication Guide',
        url: 'https://developers.tiktok.com/doc/login-kit-web'
      }
    ]
  },
  snapchat: {
    title: 'Snapchat API Setup Guide',
    steps: [
      {
        title: '1. Register as Snap Developer',
        details: [
          'Go to Snap Kit Developer Portal',
          'Create developer account',
          'Verify account details'
        ]
      },
      {
        title: '2. Create Development App',
        details: [
          'Register new application',
          'Configure app settings',
          'Add required Snap Kit capabilities'
        ]
      },
      {
        title: '3. Set Up Authentication',
        details: [
          'Configure OAuth settings',
          'Add redirect URIs',
          'Generate client credentials'
        ]
      }
    ],
    requirements: [
      'Snap Developer account',
      'Business account verification',
      'Valid redirect URIs',
      'Privacy policy URL'
    ],
    links: [
      {
        text: 'Snap Kit Developer Portal',
        url: 'https://kit.snapchat.com/portal'
      },
      {
        text: 'API Documentation',
        url: 'https://kit.snapchat.com/docs'
      },
      {
        text: 'Authentication Guide',
        url: 'https://kit.snapchat.com/docs/login-kit'
      }
    ]
  }
};

interface ApiGuideProps {
  platform: PlatformType;
}

export const ApiGuide: React.FC<ApiGuideProps> = ({ platform }) => {
  const guide = platformGuides[platform];

  return (
    <div className="space-y-6 text-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{guide.title}</h3>
        
        {guide.steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">{step.title}</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {step.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-2">
          <h4 className="font-medium">Requirements</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {guide.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Useful Links</h4>
          <ul className="space-y-2">
            {guide.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{link.text}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};