'use client';

const OPTIONS = ['All', 'Low', 'Medium', 'High', 'Critical'];

export default function PriorityFilter({ value, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">Priority</span>
      <select
        className="w-full rounded-xl border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}