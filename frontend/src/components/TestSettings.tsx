import React, { useState } from "react";
import type { TestSettings as TestSettingsType } from "../types";

const defaultSettings: TestSettingsType = {
  packet_size: 512,
  frequency: 16,
  duration: 60,
  acceptable_delay: 100,
  wait_before_recording: false,
};

interface Props {
  onSubmit: (settings: TestSettingsType) => void;
  isRunning: boolean;
}

export const TestSettings: React.FC<Props> = ({ onSubmit, isRunning }) => {
  const [settings, setSettings] = useState<TestSettingsType>(defaultSettings);
  const [preset, setPreset] = useState<"custom" | "gaming" | "video_call">(
    "custom"
  );

  const handlePresetChange = (
    newPreset: "custom" | "gaming" | "video_call"
  ) => {
    setPreset(newPreset);
    if (newPreset === "gaming") {
      setSettings({
        ...settings,
        packet_size: 128,
        frequency: 60,
        duration: 30,
        acceptable_delay: 50,
        preset: "gaming",
      });
    } else if (newPreset === "video_call") {
      setSettings({
        ...settings,
        packet_size: 1024,
        frequency: 30,
        duration: 60,
        acceptable_delay: 150,
        preset: "video_call",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(settings);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Test Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => handlePresetChange("custom")}
            className={`px-4 py-2 rounded ${
              preset === "custom"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Custom
          </button>
          <button
            type="button"
            onClick={() => handlePresetChange("gaming")}
            className={`px-4 py-2 rounded ${
              preset === "gaming"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Gaming
          </button>
          <button
            type="button"
            onClick={() => handlePresetChange("video_call")}
            className={`px-4 py-2 rounded ${
              preset === "video_call"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Video Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Packet Size (bytes)
            </label>
            <input
              type="number"
              value={settings.packet_size}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  packet_size: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="64"
              max="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Frequency (packets/sec)
            </label>
            <input
              type="number"
              value={settings.frequency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  frequency: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={settings.duration}
              onChange={(e) =>
                setSettings({ ...settings, duration: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="10"
              max="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Acceptable Delay (ms)
            </label>
            <input
              type="number"
              value={settings.acceptable_delay}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  acceptable_delay: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="10"
              max="1000"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.wait_before_recording}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  wait_before_recording: e.target.checked,
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Wait before recording
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isRunning}
            className={`px-4 py-2 rounded-md text-white ${
              isRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isRunning ? "Test Running..." : "Start Test"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestSettings;
