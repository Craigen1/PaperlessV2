import { GLAccountCode } from "./ArrayMJ";

export const RFPContentMJ = (p) => {
  const contents = [
    {
      label: "Description",
      name: "description",
      id: "description",
      type: "text",
      subArr: [],
    },
    {
      label: "Account Code",
      name: "glCode",
      id: "glCode",
      type: "text",
      subArr: GLAccountCode,
    },
    {
      label: "Account",
      name: "glName",
      id: "glName",
      type: null,
      subArr: GLAccountCode,
    },
    {
      label: "Cost Center",
      name: "costCenter",
      id: "costCenter",
      type: "text",
      subArr: p.dim_center || [],
    },
    {
      label: "Section",
      name: "section",
      id: "section",
      type: "text",
      subArr: p.dim_section || [],
    },
    {
      label: "Amount",
      name: "amount",
      id: "amount",
      type: "number",
      subArr: [],
    },
  ];
  return (
    <div className="px-6 py-4 bg-[#ffffff]">
      <h3 className="text-3xl font-semibold text-[#1f2937] mb-3">Contents</h3>
      <div className="overflow-x-auto rounded border border-[#e5e7eb]">
        <table className="table-auto w-full border-collapse text-sm text-[#111827]">
          <thead>
            <tr className="bg-[#f3f4f6]">
              {contents.map((item) => (
                <th
                  key={item.id}
                  className="px-4 py-3 text-left font-semibold text-[#374151] border-b border-[#d1d5db]"
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.dscription.map((itemData, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-[#f9fafb] transition-colors duration-150"
              >
                {contents.map((item) => {
                  let filteredSubArr = item.subArr || [];
                  if (item.id === "section") {
                    const selectedCostCenter = itemData.costCenter || "";
                    filteredSubArr = (p.dim_section || []).filter((sec) =>
                      sec.code.startsWith(selectedCostCenter)
                    );
                  }

                  return (
                    <td
                      key={item.id}
                      className="px-4 py-2 border-t border-[#e5e7eb]"
                    >
                      {filteredSubArr.length > 0 && item.id !== "glName" ? (
                        <>
                          <input
                            list={`list-${item.id}-${rowIndex}`}
                            onChange={(e) => p.handleChange(e, rowIndex)}
                            name={item.name}
                            required
                            id={`${item.id}-${rowIndex}`}
                            className="w-full px-2 py-1 rounded border border-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                            placeholder={`Search ${item.label}`}
                            value={itemData[item.name]}
                          />
                          <datalist id={`list-${item.id}-${rowIndex}`}>
                            {filteredSubArr.map((data) => (
                              <option key={data.id} value={data.code}>
                                {`${data.code} - ${data.id}`}
                              </option>
                            ))}
                          </datalist>
                        </>
                      ) : item.id === "glName" ? (
                        <span className="text-sm text-[#374151]">
                          {itemData.glName}
                        </span>
                      ) : (
                        <input
                          type={item.type}
                          name={item.name}
                          id={`${item.id}-${rowIndex}`}
                          required
                          onChange={(e) => p.handleChange(e, rowIndex)}
                          className="w-full px-2 py-1 rounded border border-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                          value={itemData[item.name]}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
