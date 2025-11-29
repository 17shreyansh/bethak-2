export default function SettingsWindow() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Appearance</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-600">Dark Mode</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-600">Compact View</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-600">Desktop Notifications</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-600">Sound Alerts</span>
          </label>
        </div>
      </div>
    </div>
  );
}
