import { openDB, type DBSchema, type IDBPDatabase } from "idb";

// Database schema
type OfflineDBSchema = DBSchema & {
  cache: {
    key: string;
    value: {
      id: string;
      data: unknown;
      timestamp: number;
    };
  };
  pendingActions: {
    key: string;
    value: {
      id: string;
      type: string;
      payload: unknown;
      timestamp: number;
    };
  };
};

const DB_NAME = "calendar-du-duck-offline";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<OfflineDBSchema>> | null = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<OfflineDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Cache store for offline data
        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache", { keyPath: "id" });
        }

        // Pending actions store for sync queue
        if (!db.objectStoreNames.contains("pendingActions")) {
          db.createObjectStore("pendingActions", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
};

// Cache operations
export const cacheGet = async <T>(key: string): Promise<T | undefined> => {
  const db = await getDB();
  const item = await db.get("cache", key);
  return item?.data as T | undefined;
};

export const cacheSet = async <T>(key: string, data: T): Promise<void> => {
  const db = await getDB();
  await db.put("cache", {
    id: key,
    data,
    timestamp: Date.now(),
  });
};

export const cacheDelete = async (key: string): Promise<void> => {
  const db = await getDB();
  await db.delete("cache", key);
};

export const cacheClear = async (): Promise<void> => {
  const db = await getDB();
  await db.clear("cache");
};

// Pending actions operations
type PendingAction<T = unknown> = {
  id: string;
  type: string;
  payload: T;
  timestamp: number;
};

export const addPendingAction = async <T>(
  type: string,
  payload: T
): Promise<string> => {
  const db = await getDB();
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  await db.put("pendingActions", {
    id,
    type,
    payload,
    timestamp: Date.now(),
  });

  return id;
};

export const getPendingActions = async <T>(): Promise<PendingAction<T>[]> => {
  const db = await getDB();
  const actions = await db.getAll("pendingActions");
  return actions as PendingAction<T>[];
};

export const removePendingAction = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.delete("pendingActions", id);
};

export const clearPendingActions = async (): Promise<void> => {
  const db = await getDB();
  await db.clear("pendingActions");
};

// Check if there are pending actions
export const hasPendingActions = async (): Promise<boolean> => {
  const db = await getDB();
  const count = await db.count("pendingActions");
  return count > 0;
};
