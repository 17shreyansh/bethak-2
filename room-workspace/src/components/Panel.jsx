import PanelHeader from './PanelHeader';

export default function Panel({ title, onClose, children }) {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <PanelHeader title={title} onClose={onClose} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
