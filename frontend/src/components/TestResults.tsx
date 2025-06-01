import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TestResult } from "../types";

interface Props {
  results: TestResult[];
  isRunning: boolean;
}

export const TestResults: React.FC<Props> = ({ results, isRunning }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const getLatestStats = () => {
    if (results.length === 0) return null;
    const latest = results[results.length - 1];
    return {
      packetLoss: latest.loss_pct.toFixed(2),
      avgLatency: latest.avg_rtt_ms.toFixed(2),
      jitter: latest.jitter_ms.toFixed(2),
      sent: latest.sent,
      received: latest.received,
    };
  };

  const stats = getLatestStats();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Test Results
      </h2>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Packet Loss
            </h3>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {stats.packetLoss}%
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              Avg Latency
            </h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats.avgLatency} ms
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Jitter
            </h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {stats.jitter} ms
            </p>
          </div>
        </div>
      )}

      {/* Graph */}
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <LineChart data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTimestamp}
              interval="preserveStartEnd"
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              labelFormatter={formatTimestamp}
              contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="loss_pct"
              name="Packet Loss %"
              stroke="#3B82F6"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avg_rtt_ms"
              name="Latency (ms)"
              stroke="#10B981"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="jitter_ms"
              name="Jitter (ms)"
              stroke="#8B5CF6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Packets Sent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Packets Received
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Loss %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Avg RTT (ms)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Jitter (ms)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {formatTimestamp(result.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {result.sent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {result.received}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {result.loss_pct.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {result.avg_rtt_ms.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {result.jitter_ms.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRunning && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-300">
            Test in progress...
          </span>
        </div>
      )}
    </div>
  );
};

export default TestResults;
