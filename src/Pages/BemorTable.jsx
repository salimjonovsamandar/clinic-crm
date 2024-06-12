import { useState, useEffect } from "react";
import DeleteBtn from "../assets/delete-btn.svg";
import DeleteModal from "../Components/OutlineDeleteModal/OutlineDeleteModal";
import { Dialog } from "@mui/material";

function BemorTable() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [size, setSize] = useState(null);



  useEffect(() => {
    fetch("https://clinic-srm.uz.custom.uz/patient-lists/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteUser = (id) => {
    fetch(`https://clinic-srm.uz.custom.uz/users/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setData(data.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      });
  };

  const openDeleteModal = (id) => {
    setUserId(id);
    setSize("xs");
  };

  const closeDeleteModal = () => {
    setUserId(null);
    setSize(null);
  };

  const handleDeleteConfirmed = () => {
    if (userId !== null) {
      deleteUser(userId);
      closeDeleteModal();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-xl bg-clip-border">
        <table className="w-full text-center border-l-2 table-auto min-w-max">
          <thead className="bg-blue-400">
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-bold font-sans text-2xl antialiased leading-none text-white">
                  №
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans w-36 text-left text-2xl antialiased font-bold leading-none text-white">
                  Ism
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans w-36 text-left text-2xl antialiased font-bold leading-none text-white">
                  Familya
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block w-36 text-left font-sans text-2xl antialiased font-bold leading-none text-white">
                  Sana
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-2xl antialiased font-bold leading-none text-white">
                  Telefon raqam
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-2xl antialiased font-bold leading-none text-white">
                  O'chirish
                </p>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((user, index) => (
              <tr className={index % 2 == 0 ? "bg-gray-100" : ""} key={index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-2xl antialiased font-normal leading-normal text-black">
                    {index + 1}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block w-36 text-left font-sans text-2xl antialiased font-normal leading-normal text-blue-gray-900">
                    {user.first_name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block w-36 text-left font-sans text-2xl antialiased font-normal leading-normal text-blue-gray-900">
                    {user.last_name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block w-36 text-left font-sans text-2xl antialiased font-normal leading-normal text-blue-gray-900">
                    {formatDate(user.created_at)}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-gray-900">
                    {user.phone_number}
                  </p>
                </td>
                <td className="p-4 border-b ">
                  <span className="flex justify-center items-center gap-5">
                    <button onClick={() => openDeleteModal(user.id)}>
                      <img src={DeleteBtn} alt="delete btn" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={size === "xs"}
        size={size || "md"}
        onClose={closeDeleteModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DeleteModal
          handleClose={closeDeleteModal}
          deleteUser={handleDeleteConfirmed}
        />
      </Dialog>
    </div>
  );
}

export default BemorTable;
