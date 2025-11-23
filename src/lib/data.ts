import { CheckCircle2, Award, Star, FastForward, ShieldCheck, ThumbsUp } from "lucide-react";

export const currentUser = {
  id: "user1",
  name: "Sarah Williams",
  avatarId: "user1",
  walletBalance: 1250.50,
  escrowBalance: 300.00,
  level: "Pro",
  xp: 750,
  joinDate: "May 2023",
  stats: {
    totalEarnings: 15200,
    tasksCompleted: 42,
    rating: 4.9,
  }
};

export const stories = [
  { id: 1, imageId: "story1", label: "Urgent Tasks" },
  { id: 2, imageId: "user2", label: "Mike R." },
  { id: 3, imageId: "story2", label: "Top Buddies" },
  { id: 4, imageId: "user3", label: "Jenny K." },
  { id: 5, imageId: "story3", label: "Safety Tips" },
  { id: 6, imageId: "user4", label: "David L." },
  { id: 7, imageId: "user5", label: "New User" },
];

export const categories = [
  "All", "Household", "Tech", "Delivery", "Tutor", "Cleaning", "Assembly", "Gardening"
];

export const tasks = [
  {
    id: 1,
    title: "Fix my leaky kitchen sink",
    price: 500,
    location: "2.5 km away",
    deadline: "in 2 hours",
    category: "Household",
    poster: { name: "Mike R.", level: "Rookie", avatarId: "user2" },
  },
  {
    id: 2,
    title: "Need help setting up my new PC",
    price: 800,
    location: "5.1 km away",
    deadline: "Today, 6 PM",
    category: "Tech",
    poster: { name: "Jenny K.", level: "Pro", avatarId: "user3" },
  },
  {
    id: 3,
    title: "Deliver a small package across town",
    price: 250,
    location: "1.2 km away",
    deadline: "ASAP",
    category: "Delivery",
    poster: { name: "David L.", level: "Local Hero", avatarId: "user4" },
  },
];

export const chats = [
    {
      id: "chat1",
      taskId: "task123",
      participants: [currentUser, { id: "user2", name: "Mike R.", avatarId: "user2" }],
      lastMessage: {
        content: "I'm on my way, should be there in 10 minutes!",
        timestamp: "5m ago"
      }
    },
    {
        id: "chat2",
        taskId: "task124",
        participants: [currentUser, { id: "user3", name: "Jenny K.", avatarId: "user3" }],
        lastMessage: {
            content: "Great, thanks! See you soon.",
            timestamp: "1h ago"
        }
    },
    {
        id: "chat3",
        taskId: "task125",
        participants: [currentUser, { id: "user4", name: "David L.", avatarId: "user4" }],
        lastMessage: {
            content: "The package has been delivered. Thank you!",
            timestamp: "1d ago"
        }
    }
];

export const transactions = [
    {
      id: "tx1",
      taskName: "Fix leaky kitchen sink",
      date: "2024-07-28",
      amount: 500,
      type: "release",
      status: "Success"
    },
    {
      id: "tx2",
      taskName: "Deposit from Bank",
      date: "2024-07-27",
      amount: 2000,
      type: "deposit",
      status: "Success"
    },
    {
      id: "tx3",
      taskName: "Post task: 'PC Setup Help'",
      date: "2024-07-26",
      amount: 800,
      type: "lock",
      status: "Locked"
    },
    {
        id: "tx4",
        taskName: "Deliver small package",
        date: "2024-07-25",
        amount: 250,
        type: "release",
        status: "Success"
      },
  ];

  export const badges = [
    { id: 'b1', name: 'Verified User', icon: ShieldCheck },
    { id: 'b2', name: 'Fast Worker', icon: FastForward },
    { id: 'b3', name: '5-Star Hero', icon: Star },
    { id: 'b4', name: 'Pro Buddy', icon: Award },
    { id: 'b5', name: 'Community Pick', icon: ThumbsUp },
    { id: 'b6', name: 'Identity Verified', icon: CheckCircle2 },
  ];
