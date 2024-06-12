import styled from "styled-components";
import Stats from "./Stats";

import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 28rem auto;
  gap: 2rem;
  margin-top: 2rem;
`;

const bookings = [
  {
    id: 1,
    created_at: "2024-01-16 11:27:28.526909+00",
    startDate: "2024-01-19 16:24:42",
    endDate: "2024-01-22 16:25:04",
    numNights: 3,
    numGuest: 2,
    cabinPrice: 1200,
    extrasPrice: 120,
    totalPrice: 420,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "I will arrive at 10pm",
    cabinId: 1,
    guestId: 1,
  },
  {
    id: 2,
    created_at: "2024-01-16 11:27:28.526909+00",
    startDate: "2024-01-19 16:24:42",
    endDate: "2024-01-22 16:25:04",
    numNights: 5,
    numGuest: 2,
    cabinPrice: 1200,
    extrasPrice: 120,
    totalPrice: 420,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "I will arrive at 10pm",
    cabinId: 1,
    guestId: 1,
  },
];

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <span className="w-full flex gap-6 ">
        <Stats />
        <DurationChart />
      </span>
      <SalesChart bookings={bookings} numDays={7} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
