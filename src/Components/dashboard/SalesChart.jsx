import React from "react";
import styled from "styled-components";
import DashboardBox from "./DashboardBox"; // Assuming this is your custom component
import Heading from "../Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addDays, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  /* grid-column: 1 / -1; */
  height: fit-content;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const chartData = [];
const today = new Date();

// Loop through the last 7 days
for (let i = 0; i < 7; i++) {
  const date = subDays(today, i); // Get date for the current loop iteration
  const label = format(date, "MMM dd"); // Format the date as "May 11"

  chartData.push({
    label,
    totalSales: Math.floor(Math.random() * 50), // Replace with your sales calculation
    extrasSales: Math.floor(Math.random() * 40), // Replace with your extra sales calculation
  });
}

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

const SalesChart = () => {
  const tickFormatter = (value) => {
    // Assuming 'label' property in chartData holds formatted dates
    return value;
  };

  return (
    <StyledSalesChart>
      <Heading as="h2">So'nggi 7 kunlik bemorlar soni</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={chartData}>
          <XAxis
            dataKey="label"
            tickFormatter={tickFormatter}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            ticks={[0, 20, 40, 60, 80, 100]}
            unit=""
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Yangi bemorlar"
            unit=""
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Eski bemorlar"
            unit=""
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
