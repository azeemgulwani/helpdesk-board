'use client';

export default function MyQueueSummary({ tickets, count, onRemove, onClear }) {
  return (
    <aside className="rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">My Queue</h2>
        <span className="text-sm">{count} selected</span>
      </div>

      {count === 0 ? (
        <p className="text-sm text-gray-600 mt-2">No tickets in your queue.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {tickets.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3">
              <span className="text-sm line-clamp-1">{t.title}</span>
              <button
                className="text-xs rounded-lg border px-2 py-1"
                onClick={() => onRemove(t.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex justify-end">
        <button
          className="text-sm rounded-xl border px-3 py-2 disabled:opacity-50"
          onClick={onClear}
          disabled={count === 0}
        >
          Clear Queue
        </button>
      </div>
    </aside>
  );
}