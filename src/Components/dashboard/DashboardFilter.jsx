import Filter from "../Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Ohirgi 7 kunlik" },
        { value: "30", label: "Ohirgi 30 kunlik" },
        { value: "90", label: "Ohirgi 90 kunlik" },
      ]}
    />
  );
}

export default DashboardFilter;
