import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScheduleStore } from '../store/scheduleStore';
import { useThemeStore } from '../store/themeStore';
import { useApiStore } from '../store/apiStore';
import { ScheduledPost } from '../types/schedule';

export const Schedule = () => {
  const { theme } = useThemeStore();
  const { posts, addPost, removePost } = useScheduleStore();
  const { apis } = useApiStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    platforms: [] as string[],
    scheduledDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    mediaUrls: [] as string[]
  });

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(newPost);
    setIsAddingPost(false);
    setNewPost({
      title: '',
      content: '',
      platforms: [],
      scheduledDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      mediaUrls: []
    });
  };

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => {
      const postDate = parseISO(post.scheduledDate);
      return format(postDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Schedule</h2>
        <button
          onClick={() => setIsAddingPost(true)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${theme.gradient} hover:opacity-90 transition-opacity`}
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Post</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="w-6 h-6" />
            <h3 className="text-xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
          {daysInMonth.map((date) => {
            const dayPosts = getPostsForDay(date);
            return (
              <div
                key={date.toISOString()}
                className={`
                  min-h-[100px] p-2 border border-gray-700 rounded-lg
                  ${!isSameMonth(date, currentDate) ? 'opacity-50' : ''}
                  ${isToday(date) ? `${theme.gradient} bg-opacity-10` : ''}
                `}
              >
                <div className="text-sm mb-1">{format(date, 'd')}</div>
                <div className="space-y-1">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`text-xs p-1 rounded ${theme.gradient} cursor-pointer`}
                      title={post.title}
                    >
                      {post.title.length > 15
                        ? `${post.title.substring(0, 15)}...`
                        : post.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAddingPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Schedule New Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg p-2"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  className="w-full bg-gray-700 rounded-lg p-2 h-24"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Platforms</label>
                <div className="space-y-2">
                  {apis.map((api) => (
                    <label key={api.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newPost.platforms.includes(api.id)}
                        onChange={(e) => {
                          const platforms = e.target.checked
                            ? [...newPost.platforms, api.id]
                            : newPost.platforms.filter(id => id !== api.id);
                          setNewPost({ ...newPost, platforms });
                        }}
                        className="rounded border-gray-600"
                      />
                      <span>{api.name} ({api.platform})</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full bg-gray-700 rounded-lg p-2"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddingPost(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg ${theme.gradient} hover:opacity-90 transition-opacity`}
                >
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};