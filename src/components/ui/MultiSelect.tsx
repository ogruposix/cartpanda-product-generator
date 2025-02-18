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

    onChange(newSelected.length ? newSelected : [options[0].value]);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {isMulti && (
          <span className="text-xs text-gray-500 ml-1">
            (Selecione múltiplos)
          </span>
        )}
      </label>

      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[42px] p-2 border border-gray-300 rounded-md bg-white cursor-pointer flex flex-wrap gap-2 items-center"
      >
        {selected.length > 0 ? (
          selected.map((value) => (
            <span
              key={value}
              className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              {options.find((opt) => opt.value === value)?.label}
              {isMulti && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(value);
                  }}
                  className="ml-1 hover:text-blue-900 hover:bg-blue-300 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              )}
            </span>
          ))
        ) : (
          <span className="text-gray-400">Selecione...</span>
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
            className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={selected.includes(option.value)}
                onClick={() => toggleOption(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
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
