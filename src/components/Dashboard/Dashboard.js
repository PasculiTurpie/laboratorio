import React, { useEffect, useState } from "react";
import './Dashboard.css'
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [courseAttendance, setCourseAttendance] = useState([]);

  const getAttendance = () => {
    axios
      .get(`http://localhost:5000/api/v1/asistencia`)
      .then((response) => {
        const rawData = response.data.allAttendance;

        // Agrupar y contar la cantidad de asistencias por curso
        const attendanceCount = rawData.reduce((acc, entry) => {
          const curso = entry.cursoNivel;
          acc[curso] = (acc[curso] || 0) + 1;
          return acc;
        }, {});

        // Calcular el total de asistencias para el cálculo de porcentajes
        const totalAttendance = Object.values(attendanceCount).reduce(
          (sum, count) => sum + count,
          0
        );

        // Convertir el resultado a un arreglo de objetos para Recharts, incluir el porcentaje y ordenar por curso
        const sortedData = Object.keys(attendanceCount)
          .map((curso) => ({
            curso,
            asistencias: attendanceCount[curso],
            porcentaje: (
              (attendanceCount[curso] / totalAttendance) *
              100
            ).toFixed(2), // Calcular porcentaje
          }))
          .sort((a, b) => a.curso.localeCompare(b.curso)); // Ordenar alfabéticamente por curso

        setCourseAttendance(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <>
      <h1>Asistencia por curso a laboratorio de computación</h1>
      <ResponsiveContainer width="100%" height={600} aspect={1}>
        <BarChart
          data={courseAttendance}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="curso" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === "asistencias") return [`${value}`, "Asistencias"];
              return value;
            }}
          />
          <Bar dataKey="asistencias" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>
      <div className="container"></div>
    </>
  );
};

export default Dashboard;
