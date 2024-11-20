import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduledPost } from '../types/schedule';

interface ScheduleStore {
  posts: ScheduledPost[];
  addPost: (post: Omit<ScheduledPost, 'id' | 'status'>) => void;
  removePost: (id: string) => void;
  updatePost: (id: string, post: Partial<ScheduledPost>) => void;
  getPostsByDate: (date: Date) => ScheduledPost[];
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (post) => {
        const newPost: ScheduledPost = {
          ...post,
          id: crypto.randomUUID(),
          status: 'scheduled'
        };
        set((state) => ({ posts: [...state.posts, newPost] }));
      },
      removePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id)
        }));
      },
      updatePost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          )
        }));
      },
      getPostsByDate: (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return get().posts.filter(
          (post) => post.scheduledDate.split('T')[0] === dateStr
        );
      }
    }),
    {
      name: 'social-hub-schedule'
    }
  )
);