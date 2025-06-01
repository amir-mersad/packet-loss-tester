export interface TestSettings {
  packet_size: number;
  frequency: number;
  duration: number;
  acceptable_delay: number;
  preset?: "gaming" | "video_call";
  wait_before_recording: boolean;
}

export interface TestResult {
  timestamp: string;
  target: string;
  sent: number;
  received: number;
  loss_pct: number;
  avg_rtt_ms: number;
  jitter_ms: number;
}

export interface TestSession {
  id: string;
  settings: TestSettings;
  results: TestResult[];
  status: "idle" | "running" | "completed" | "error";
}
