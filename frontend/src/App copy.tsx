import { TestResults } from "./components/TestResults";
import { TestSettings } from "./components/TestSettings";
import { usePacketTest } from "./hooks/usePacketTest";

function App() {
  const { session, error, isRunning, startTest, stopTest } = usePacketTest();

  return (
    <div className="">
      <div className="">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Packet Loss Analyzer
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Test network performance with real-time packet loss and latency
            monitoring
          </p>
        </header>

        {error && (
          <div className="mb-8 bg-red-50 dark:bg-red-900 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <TestSettings onSubmit={startTest} isRunning={isRunning} />

          {session && (
            <div className="relative">
              <TestResults results={session.results} isRunning={isRunning} />

              {isRunning && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={stopTest}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Stop Test
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
