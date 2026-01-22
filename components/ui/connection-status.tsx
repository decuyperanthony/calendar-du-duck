"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/icon";

type ConnectionState = "online" | "offline" | "syncing";

type ConnectionStatusProps = {
  status?: ConnectionState;
  hasPending?: boolean;
  className?: string;
};

export const ConnectionStatus = ({
  status: externalStatus,
  hasPending = false,
  className,
}: ConnectionStatusProps) => {
  const [internalStatus, setInternalStatus] = useState<ConnectionState>("online");
  const [isVisible, setIsVisible] = useState(false);

  const status = externalStatus ?? internalStatus;

  // Track online/offline if no external status provided
  useEffect(() => {
    if (externalStatus) return;

    const handleOnline = () => setInternalStatus("online");
    const handleOffline = () => setInternalStatus("offline");

    setInternalStatus(navigator.onLine ? "online" : "offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [externalStatus]);

  // Show indicator when offline or syncing
  useEffect(() => {
    if (status === "offline" || status === "syncing" || hasPending) {
      setIsVisible(true);
    } else {
      // Hide after a short delay when back online
      const timeout = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [status, hasPending]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        status === "offline" && "bg-destructive/90 text-white",
        status === "syncing" && "bg-primary/90 text-primary-foreground",
        status === "online" && hasPending && "bg-accent/90 text-white",
        status === "online" && !hasPending && "bg-primary/90 text-primary-foreground",
        className
      )}
    >
      {status === "offline" && (
        <>
          <Icon name="wifi-x" size="sm" />
          <span>Hors ligne</span>
        </>
      )}
      {status === "syncing" && (
        <>
          <Icon name="arrows-clockwise" size="sm" className="animate-spin" />
          <span>Synchronisation...</span>
        </>
      )}
      {status === "online" && hasPending && (
        <>
          <Icon name="cloud-arrow-up" size="sm" />
          <span>En attente de sync</span>
        </>
      )}
      {status === "online" && !hasPending && (
        <>
          <Icon name="check-circle" size="sm" />
          <span>Connecte</span>
        </>
      )}
    </div>
  );
};
