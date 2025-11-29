import { Resizable } from 're-resizable';

export default function SplitPanel({ direction = 'horizontal', children }) {
  const [first, second] = children;
  
  return (
    <div className="flex h-full w-full" style={{ flexDirection: direction === 'horizontal' ? 'row' : 'column' }}>
      <Resizable
        defaultSize={{
          width: direction === 'horizontal' ? '60%' : '100%',
          height: direction === 'vertical' ? '50%' : '100%',
        }}
        enable={{
          right: direction === 'horizontal',
          bottom: direction === 'vertical',
        }}
        minWidth={direction === 'horizontal' ? 200 : undefined}
        minHeight={direction === 'vertical' ? 150 : undefined}
        handleStyles={{
          right: { width: '4px', right: 0, cursor: 'col-resize' },
          bottom: { height: '4px', bottom: 0, cursor: 'row-resize' },
        }}
        handleClasses={{
          right: 'bg-gray-700 hover:bg-blue-500 transition-colors',
          bottom: 'bg-gray-700 hover:bg-blue-500 transition-colors',
        }}
      >
        {first}
      </Resizable>
      <div className="flex-1">
        {second}
      </div>
    </div>
  );
}
