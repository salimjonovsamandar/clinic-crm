import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { FaUserDoctor, FaHospital, FaScissors } from "react-icons/fa6";
import { BsBrowserChrome } from "react-icons/bs";
import Stat from "./Stat";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

function Stats() {
  // 1.
  const numBookings = 30;

  // 2.
  const sales = 20;

  // 3.
  const checkins = 3;

  // 4.
  const occupation = 0.5;
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <div className="flex items-start gap-4">
      <span className="flex flex-col gap-4">
        <Stat
          title="Tibbiy ko’riklar"
          color="blue"
          icon={<FaUserDoctor />}
          value={numBookings}
          trendIcon
        />
        <Stat
          title="Operatsiyalar"
          color="green"
          icon={<FaScissors />}
          // value={formatCurrency(sales)}
          value={sales}
        />
      </span>
      <span className="flex flex-col gap-4">
        <Stat
          title="Online navbat"
          color="indigo"
          icon={<BsBrowserChrome />}
          value={checkins}
        />
        <Stat
          title="Bemorlar statistikasi"
          color="yellow"
          icon={<HiOutlineChartBar />}
          trendIcon
          value={Math.round(occupation * 100) + "%"}
        />
      </span>
    </div>
  );
}

export default Stats;
