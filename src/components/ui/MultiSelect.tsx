import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  id: string;
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  isMulti?: boolean;
};

export function MultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
  isMulti = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (!isMulti) {
      onChange([value]);
      setIsOpen(false);
      return;
    }

    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(newSelected.length ? newSelected : []);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-gray-700 mb-0.5 capitalize"
      >
        {label}
        {isMulti && (
          <span className="text-[10px] text-gray-500 ml-1">(múltiplos)</span>
        )}
      </label>

      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[36px] px-2 py-1 border border-gray-300 rounded-md bg-white cursor-pointer flex flex-wrap gap-1.5 items-center overflow-x-auto"
      >
        {selected.length > 0 && selected[0] !== "" ? (
          selected.map((value) => (
            <span
              key={value}
              className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors whitespace-nowrap"
            >
              {options.find((opt) => opt.value === value)?.label}
              {isMulti && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(value);
                  }}
                  className="ml-0.5 hover:text-blue-900 hover:bg-blue-300 rounded-full w-3.5 h-3.5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              )}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">Selecione...</span>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            id={`${id}-options`}
            role="listbox"
            className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={selected.includes(option.value)}
                onClick={() => toggleOption(option.value)}
                className={`px-3 py-1.5 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 ${
                  selected.includes(option.value)
                    ? "bg-blue-50 text-blue-800"
                    : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
