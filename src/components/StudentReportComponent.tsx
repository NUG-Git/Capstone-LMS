import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getReports } from "../services/AdminService";

const StudentReportComponent = () => {
  const [reportData, setReportData] = useState<any[]>([]);
  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    console.log("Inside use effect");
    getReports()
      .then((response) => {
        handleReports(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleReports = async (event: any) => {
    await delay(4000);
    setReportData(event);
    console.log("Inside async funct");
    console.log(reportData);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h2> Student Enrollment Report</h2>
      <BarChart
        width={1000}
        height={300}
        data={reportData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="courseName"
          scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="studentCount"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
};

export default StudentReportComponent;
