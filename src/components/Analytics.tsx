import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Activity, Calendar } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useApiStore } from '../store/apiStore';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const engagementData = [
  { date: '2024-01', followers: 1200, engagement: 4500, posts: 45 },
  { date: '2024-02', followers: 1800, engagement: 5200, posts: 52 },
  { date: '2024-03', followers: 2400, engagement: 6800, posts: 68 },
  { date: '2024-04', followers: 2900, engagement: 7500, posts: 75 },
  { date: '2024-05', followers: 3500, engagement: 8900, posts: 89 },
];

const contentData = [
  { name: 'Images', value: 45 },
  { name: 'Videos', value: 30 },
  { name: 'Stories', value: 15 },
  { name: 'Reels', value: 10 },
];

const platformData = [
  { platform: 'Instagram', followers: 850000, engagement: 75000 },
  { platform: 'TikTok', followers: 650000, engagement: 85000 },
  { platform: 'YouTube', followers: 450000, engagement: 35000 },
  { platform: 'Twitter', followers: 350000, engagement: 25000 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'];

export const Analytics = () => {
  const { theme } = useThemeStore();
  const { apis } = useApiStore();
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    { icon: Users, label: 'Total Followers', value: '2.4M', change: '+12%' },
    { icon: Activity, label: 'Engagement Rate', value: '8.7%', change: '+3.2%' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+24%', change: '+5%' },
    { icon: Calendar, label: 'Posts This Month', value: '142', change: '+15%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value, change }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card-gradient-border p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-300 text-sm">{label}</p>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400 mt-1">
                  {value}
                </p>
                <p className={`text-sm mt-2 ${
                  change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-lg ${theme.gradient} bg-opacity-50`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="card-gradient-border p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Engagement Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={engagementData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="followers"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorFollowers)"
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="card-gradient-border p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Content Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {contentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="card-gradient-border p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={platformData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="platform" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="followers" fill="#3B82F6" name="Followers" />
                <Bar dataKey="engagement" fill="#8B5CF6" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};