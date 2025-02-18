import { TableData } from "@/types/sku";
import { useState } from "react";
import { headersTXT } from "@/utils/csv";

type SKUTableProps = {
  tableData: TableData[];
  setTableData: (data: TableData[]) => void;
};

export default function SKUTable({ tableData, setTableData }: SKUTableProps) {
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    field: keyof TableData;
  } | null>(null);

  const removeRow = (index: number) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
  };

  const moveRow = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tableData.length) return;

    const newData = [...tableData];
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    setTableData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
  };

  const updateCell = (
    rowIndex: number,
    field: keyof TableData,
    value: string
  ) => {
    const newData = [...tableData];
    newData[rowIndex][field] = value;
    setTableData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
    setEditingCell(null);
  };

  if (tableData.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-24">
              Ações
            </th>
            {headersTXT.map((header) => (
              <th
                key={header}
                className="px-2 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, rowIndex) => (
            <tr key={row.variant_sku} className="hover:bg-gray-50">
              <td className="px-2 py-2 whitespace-nowrap">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveRow(rowIndex, "up")}
                    disabled={rowIndex === 0}
                    className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                    title="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveRow(rowIndex, "down")}
                    disabled={rowIndex === tableData.length - 1}
                    className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                    title="Mover para baixo"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="text-red-600 hover:text-red-900 ml-1"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              </td>
              {Object.entries(row).map(([field, value]) => (
                <td
                  key={field}
                  className="px-2 py-2 whitespace-nowrap text-gray-900 text-sm"
                  onClick={() =>
                    setEditingCell({
                      rowIndex,
                      field: field as keyof TableData,
                    })
                  }
                >
                  {editingCell?.rowIndex === rowIndex &&
                  editingCell?.field === field ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        updateCell(
                          rowIndex,
                          field as keyof TableData,
                          e.target.value
                        )
                      }
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                      className="w-full p-1 border rounded text-gray-900 text-sm"
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
