import React from 'react';
import { BarChart3, Users, Video, TrendingUp } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const { theme } = useThemeStore();

  const stats = [
    { icon: Users, label: 'Total Followers', value: '2.4M' },
    { icon: Video, label: 'Active Posts', value: '342' },
    { icon: BarChart3, label: 'Engagement Rate', value: '8.7%' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+24%' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card-gradient-border p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-300 mb-1">{label}</p>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
                  {value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${theme.gradient} bg-opacity-50`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};