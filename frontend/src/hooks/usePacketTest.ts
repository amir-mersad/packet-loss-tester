import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { TestResult, TestSession, TestSettings } from "../types";

const API_BASE_URL = "http://localhost:8000";

export const usePacketTest = () => {
  const [session, setSession] = useState<TestSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const startTest = async (settings: TestSettings) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/start_test`, settings);
      const { session_id } = response.data;

      setSession({
        id: session_id,
        settings,
        results: [],
        status: "running",
      });

      // Connect to WebSocket
      const wsConnection = new WebSocket(
        `ws://${API_BASE_URL.replace("http://", "")}/live/${session_id}`
      );
      setWs(wsConnection);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start test");
      setSession(null);
    }
  };

  const stopTest = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
    }
    if (session) {
      setSession({ ...session, status: "completed" });
    }
  }, [ws, session]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      try {
        const result: TestResult = JSON.parse(event.data);
        setSession((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            results: [...prev.results, result],
          };
        });
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket connection error");
    };

    ws.onclose = () => {
      setWs(null);
      setSession((prev) => (prev ? { ...prev, status: "completed" } : null));
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  return {
    session,
    error,
    isRunning: session?.status === "running",
    startTest,
    stopTest,
  };
};

export default usePacketTest;
