import styled from "styled-components";
import Heading from "../Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  width: 500px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  height: 400px;
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const fakeDiseaseData = [
  {
    disease: "Endokrin",
    value: 20,
    color: "#ef4444",
  },
  {
    disease: "Yurak qon tomiri kasalliklari",
    color: "#f97316",
    value: 15,
  },
  {
    disease: "Asab kasalliklari",
    color: "#eab308",
    value: 10,
  },
  {
    disease: "Nafas yo’llari kasalliklari",
    color: "#84cc16",
    value: 8,
  },
  {
    disease: "Boshqalar",
    color: "#22c55e",
    value: 7,
  },
];

function DuratioChart() {
  return (
    <ChartBox>
      <Heading as="h2">Kasalliklar statistikasi</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={fakeDiseaseData}
            nameKey="disease"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {fakeDiseaseData.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.disease}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DuratioChart;
