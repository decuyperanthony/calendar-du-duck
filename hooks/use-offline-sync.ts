"use client";

import { useCallback, useEffect, useState } from "react";
import {
  cacheGet,
  cacheSet,
  addPendingAction,
  getPendingActions,
  removePendingAction,
  hasPendingActions,
} from "@/lib/offline-db";

type ConnectionStatus = "online" | "offline" | "syncing";

type UseOfflineSyncOptions<T> = {
  cacheKey: string;
  fetchFn?: () => Promise<T>;
  syncFn?: (actions: Array<{ type: string; payload: unknown }>) => Promise<void>;
};

type UseOfflineSyncResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  status: ConnectionStatus;
  hasPending: boolean;
  queueAction: (type: string, payload: unknown) => Promise<void>;
  sync: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const useOfflineSync = <T>({
  cacheKey,
  fetchFn,
  syncFn,
}: UseOfflineSyncOptions<T>): UseOfflineSyncResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<ConnectionStatus>("online");
  const [hasPending, setHasPending] = useState(false);

  // Check for pending actions
  const checkPending = useCallback(async () => {
    const pending = await hasPendingActions();
    setHasPending(pending);
  }, []);

  // Load cached data on mount
  useEffect(() => {
    const loadCache = async () => {
      const cached = await cacheGet<T>(cacheKey);
      if (cached) {
        setData(cached);
      }
      setIsLoading(false);
    };

    loadCache();
    checkPending();
  }, [cacheKey, checkPending]);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setStatus("online");
    const handleOffline = () => setStatus("offline");

    setStatus(navigator.onLine ? "online" : "offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Queue an action for later sync
  const queueAction = useCallback(
    async (type: string, payload: unknown) => {
      await addPendingAction(type, payload);
      await checkPending();
    },
    [checkPending]
  );

  // Sync pending actions when online
  const sync = useCallback(async () => {
    if (!syncFn || status === "offline") return;

    setStatus("syncing");

    try {
      const actions = await getPendingActions();

      if (actions.length > 0) {
        await syncFn(
          actions.map((a) => ({
            type: a.type,
            payload: a.payload,
          }))
        );

        // Remove synced actions
        for (const action of actions) {
          await removePendingAction(action.id);
        }
      }

      await checkPending();
      setStatus("online");
    } catch {
      setStatus("online");
    }
  }, [syncFn, status, checkPending]);

  // Refresh data from server
  const refresh = useCallback(async () => {
    if (!fetchFn || status === "offline") return;

    setIsLoading(true);

    try {
      const freshData = await fetchFn();
      setData(freshData);
      await cacheSet(cacheKey, freshData);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, cacheKey, status]);

  // Auto-sync when coming online
  useEffect(() => {
    if (status === "online" && hasPending) {
      sync();
    }
  }, [status, hasPending, sync]);

  return {
    data,
    isLoading,
    status,
    hasPending,
    queueAction,
    sync,
    refresh,
  };
};
