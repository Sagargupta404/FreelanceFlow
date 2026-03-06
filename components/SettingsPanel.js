"use client";

import { useSettings } from "@/context/SettingsContext";

export default function SettingsPanel() {
  const { setPrimary, setFontSize } = useSettings();

  return (
    <div
      className="p-6 rounded-xl mt-8"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Global Settings</h2>

      {/* Color Buttons */}
      <div className="mb-4">
        <p className="mb-2">Primary Color</p>
        <div className="flex gap-3">
          <button
            className="w-6 h-6 rounded-full bg-blue-500"
            onClick={() => setPrimary("#3b82f6")}
          />
          <button
            className="w-6 h-6 rounded-full bg-green-500"
            onClick={() => setPrimary("#22c55e")}
          />
          <button
            className="w-6 h-6 rounded-full bg-purple-500"
            onClick={() => setPrimary("#a855f7")}
          />
        </div>
      </div>

      {/* Font Size Toggle */}
      <div>
        <p className="mb-2">Font Size</p>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setFontSize("14px")}
          >
            Small
          </button>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setFontSize("16px")}
          >
            Medium
          </button>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setFontSize("18px")}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
}