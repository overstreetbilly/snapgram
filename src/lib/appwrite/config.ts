import {Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPRWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPRWRITE_COLLECTION_USERS_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_POSTS_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID
}


export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);