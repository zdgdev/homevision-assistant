// Define Camera type
export interface Camera {
  id: number;
  name: string;
  location: string;
  isOnline: boolean;
  feedUrl: string;
  lastActivity: number;
  hasMotion: boolean;
}

// Define Recording type
export interface Recording {
  id: number;
  title: string;
  cameraId: number;
  cameraName: string;
  timestamp: number;
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
  location: string;
}

// Define User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
}

// Define Alert type
export interface Alert {
  id: number;
  title: string;
  message: string;
  timestamp: number;
  cameraId: number;
  cameraName: string;
  isRead: boolean;
  type: 'motion' | 'offline' | 'system';
}