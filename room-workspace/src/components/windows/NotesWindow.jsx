export default function NotesWindow() {
  return (
    <div className="h-full flex flex-col">
      <textarea
        className="flex-1 bg-white text-gray-700 p-4 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none resize-none"
        placeholder="Start typing your notes here..."
      />
    </div>
  );
}
