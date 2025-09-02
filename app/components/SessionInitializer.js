"use client";
import { useEffect } from "react";

export function SessionInitializer() {
  function getOrCreateSessionId() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      userSessionId = crypto.randomUUID(); // або будь-який генератор UUID
      localStorage.setItem("sessionId", userSessionId);
    }
    return sessionId;
  }

  useEffect(() => {
    getOrCreateSessionId();
  }, []);

  return null; // нічого не рендерить
}
