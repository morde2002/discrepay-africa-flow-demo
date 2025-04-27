
import React from "react";

const MonitoringSummaryTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left font-medium p-2">Step</th>
            <th className="text-left font-medium p-2">User Action</th>
            <th className="text-left font-medium p-2">Value Delivered</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">Access Dashboard</td>
            <td className="p-2">Login and view overview</td>
            <td className="p-2">Instant operational visibility</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">Monitor Live</td>
            <td className="p-2">Track real-time transactions</td>
            <td className="p-2">Real-time payment tracking</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">Review Variances</td>
            <td className="p-2">Check alerts and issues</td>
            <td className="p-2">Early detection of problems</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2">Generate Reports</td>
            <td className="p-2">Download detailed reports</td>
            <td className="p-2">Audit and compliance ready</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonitoringSummaryTable;
