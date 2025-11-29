export default function AIWindow() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white rounded-lg p-4 mb-4 overflow-y-auto border border-gray-200">
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 Suggestion: Consider breaking down Task 4 into smaller subtasks for better tracking.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 Suggestion: Member B has been idle for a while. You might want to check in.
            </p>
          </div>
        </div>
      </div>
      <textarea
        className="bg-white text-gray-700 p-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none resize-none"
        rows="3"
        placeholder="Ask AI assistant..."
      />
    </div>
  );
}
