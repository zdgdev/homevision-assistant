import { Camera, Recording } from '@/types';

export const mockCameras: Camera[] = [
  {
    id: 1,
    name: 'Front Door',
    location: 'Entrance',
    isOnline: true,
    feedUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
    lastActivity: Date.now() - 300000,
    hasMotion: false,
  },
  {
    id: 2,
    name: 'Backyard',
    location: 'Exterior',
    isOnline: true,
    feedUrl: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg',
    lastActivity: Date.now() - 900000,
    hasMotion: true,
  },
  {
    id: 3,
    name: 'Garage',
    location: 'Exterior',
    isOnline: false,
    feedUrl: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
    lastActivity: Date.now() - 3600000,
    hasMotion: false,
  },
  {
    id: 4,
    name: 'Living Room',
    location: 'Interior',
    isOnline: true,
    feedUrl: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
    lastActivity: Date.now() - 120000,
    hasMotion: false,
  },
  {
    id: 5,
    name: 'Hallway',
    location: 'Interior',
    isOnline: true,
    feedUrl: 'https://images.pexels.com/photos/931887/pexels-photo-931887.jpeg',
    lastActivity: Date.now() - 600000,
    hasMotion: false,
  },
  {
    id: 6,
    name: 'Kitchen',
    location: 'Interior',
    isOnline: true,
    feedUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    lastActivity: Date.now() - 450000,
    hasMotion: false,
  },
];

export const mockRecordings: Recording[] = [
  {
    id: 1,
    title: 'Motion Detected - Front Door',
    cameraId: 1,
    cameraName: 'Front Door',
    timestamp: Date.now() - 3600000,
    duration: 30000, // 30 seconds
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    location: 'Entrance',
  },
  {
    id: 2,
    title: 'Motion Detected - Backyard',
    cameraId: 2,
    cameraName: 'Backyard',
    timestamp: Date.now() - 7200000,
    duration: 45000, // 45 seconds
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    location: 'Exterior',
  },
  {
    id: 3,
    title: 'Motion Detected - Living Room',
    cameraId: 4,
    cameraName: 'Living Room',
    timestamp: Date.now() - 10800000,
    duration: 60000, // 60 seconds
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    location: 'Interior',
  },
  {
    id: 4,
    title: 'Scheduled Recording - Kitchen',
    cameraId: 6,
    cameraName: 'Kitchen',
    timestamp: Date.now() - 14400000,
    duration: 300000, // 5 minutes
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    location: 'Interior',
  },
];