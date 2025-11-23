
'use server';

import { initializeFirebase } from '@/firebase/server';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

// Initialize Firebase Admin SDK
const { app } = initializeFirebase();
const auth = getAuth(app);
const firestore = getFirestore(app);

// This is a simplified example. In a real app, you'd get the UID from the session.
// For now, we are assuming you have a way to get the current user's UID on the server.
// In a Next.js app with a proper auth setup, this would come from the request headers or cookies.
// NOTE: This is a placeholder for getting the user ID.
// In a real app, you would use a library like next-auth or manage sessions yourself.
async function getCurrentUserId(): Promise<string | null> {
    // This is a placeholder. You need a proper way to get the session/user on the server.
    // For now, we can't get the user so we can't secure this endpoint.
    // We are returning a hardcoded ID for demonstration purposes.
    // In a real app, you would replace this with actual session management.
    return "83GJSmGwomMfHuvdSwowvRiU10T2"; // This should be replaced with actual user session logic
}


export async function acceptTask(taskId: string): Promise<{ success: boolean, error?: string }> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return { success: false, error: 'User not authenticated.' };
  }

  const taskRef = firestore.collection('tasks').doc(taskId);

  try {
    const result = await firestore.runTransaction(async (transaction) => {
      const taskDoc = await transaction.get(taskRef);
      if (!taskDoc.exists) {
        throw new Error("Task does not exist.");
      }

      const taskData = taskDoc.data();
      if (!taskData) {
        throw new Error("Task data is empty.");
      }

      if (taskData.status !== 'Open') {
        throw new Error("Task is not open for acceptance.");
      }

      if (taskData.posterId === userId) {
        throw new Error("You cannot accept your own task.");
      }

      transaction.update(taskRef, {
        status: 'assigned',
        buddyId: userId,
      });

      // Create a notification for the task poster
      const notificationRef = firestore.collection(`users/${taskData.posterId}/notifications`).doc();
      transaction.set(notificationRef, {
        userId: taskData.posterId,
        title: "Task Accepted!",
        message: `A buddy has accepted your task: "${taskData.title}"`,
        type: 'TASK_ACCEPTED',
        taskId: taskId,
        isRead: false,
        timestamp: new Date(),
      });
      
      return { success: true };
    });
    
    // Revalidate the path to show the updated task status
    revalidatePath(`/tasks/${taskId}`);
    revalidatePath('/');
    
    return result;

  } catch (e: any) {
    console.error("Transaction failed: ", e);
    return { success: false, error: e.message };
  }
}
