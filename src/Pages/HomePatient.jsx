import DashboardFilter from "../Components/dashboard/DashboardFilter";
import DashboardLayout from "../Components/dashboard/DashboardLayout";
import Heading from "../Components/Heading";
const HomePatient = () => {
  return (
    <div className="p-10 ">
      <div className="flex justify-between items-center">
        <Heading as="h2">Asosiy Sahifa</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
};

export default HomePatient;
