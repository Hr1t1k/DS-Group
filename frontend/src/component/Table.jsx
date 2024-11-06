const Table = ({ columns, rows, loading }) => {
  console.log(rows);
  return (
    <div className="">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="py-3 px-6">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {loading
              ? [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((item, idx) => (
                  <tr key={item._id || idx}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(item, idx) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
