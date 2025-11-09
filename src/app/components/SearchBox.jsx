'use client';

export default function SearchBox({ value, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">Search</span>
      <input
        className="w-full rounded-xl border px-3 py-2"
        type="text"
        placeholder="Find by title or description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}