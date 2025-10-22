import React, { useEffect, useState } from 'react';

interface AttendanceRecord {
  student_id: string;
  status: 'present' | 'absent';
}

interface StudentSummary {
  student_id: string;
  present: number;
  absent: number;
  total: number;
  percentage: number;
}

const AttendanceSummary: React.FC = () => {
  const [summaries, setSummaries] = useState<StudentSummary[]>([]);

  useEffect(() => {
    fetch('/api/attendance')
      .then(res => res.json())
      .then((data: AttendanceRecord[]) => {
        const summary: { [key: string]: StudentSummary } = {};
        data.forEach(rec => {
          if (!summary[rec.student_id]) {
            summary[rec.student_id] = {
              student_id: rec.student_id,
              present: 0,
              absent: 0,
              total: 0,
              percentage: 0
            };
          }
          if (rec.status === 'present') summary[rec.student_id].present += 1;
          if (rec.status === 'absent') summary[rec.student_id].absent += 1;
          summary[rec.student_id].total += 1;
        });
        Object.values(summary).forEach(s => {
          s.percentage = s.total > 0 ? Math.round((s.present / s.total) * 100) : 0;
        });
        setSummaries(Object.values(summary));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Summary</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border">Student ID</th>
            <th className="px-2 py-1 border">Present</th>
            <th className="px-2 py-1 border">Absent</th>
            <th className="px-2 py-1 border">Total</th>
            <th className="px-2 py-1 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s) => (
            <tr key={s.student_id}>
              <td className="px-2 py-1 border">{s.student_id}</td>
              <td className="px-2 py-1 border">{s.present}</td>
              <td className="px-2 py-1 border">{s.absent}</td>
              <td className="px-2 py-1 border">{s.total}</td>
              <td className="px-2 py-1 border">{s.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceSummary;
