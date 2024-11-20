export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platforms: string[];
  scheduledDate: string;
  mediaUrls?: string[];
  status: 'scheduled' | 'posted' | 'failed';
}

export interface CalendarDay {
  date: Date;
  posts: ScheduledPost[];
}