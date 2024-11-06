import react, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Table from "./Table";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import auth from "../../firebase.config.js";
import MobileSidebar from "./MobileSidebar.jsx";
import AddGiftModal from "./AddGiftModal.jsx";
import AddStateModal from "./AddStateModal.jsx";

const getColumns = (pathname, setTitle) => {
  let columns = [];
  if (pathname == "/dashboard/gifttracking") {
    setTitle("Gift Tracking Details");
    columns = [
      { header: "Sl No.", key: "index", render: (item, idx) => idx + 1 },
      {
        header: "Gift Type",
        key: "giftType",
        render: (item) => item.gift.type,
      },
      { header: "Tracking Number", key: "trackingNumber" },
      {
        header: "Recipient",
        key: "recipientEmail",
        render: (item) => item.recipient.email,
      },
      {
        header: "State",
        key: "recipientState",
        render: (item) => item.recipient.state.name,
      },
      {
        header: "Received Date",
        key: "receivedDate",
        render: (item) =>
          new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
      },
    ];
  } else if (pathname == "/dashboard/states") {
    setTitle("State Details");
    columns = [
      { header: "Sl No.", key: "index", render: (item, idx) => idx + 1 },
      {
        header: "Name",
        key: "name",
      },

      {
        header: "Distribution Limit (%)",
        key: "distributionLimit",
        render: (item) => item.distributionLimit,
      },
    ];
  } else {
    setTitle("Gift Items Details");
    columns = [
      { header: "Sl No.", key: "index", render: (item, idx) => idx + 1 },
      {
        header: "Type",
        key: "type",
      },
      { header: "Total Quantity", key: "totalQuantity" },
      { header: "Remaining Quantity", key: "remainingQuantity" },
    ];
  }
  return columns;
};

const AdminDashboard = () => {
  const [tableItems, setTableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [columns, setColumns] = useState([]);
  const [title, setTitle] = useState("");
  const [addGiftModal, setAddGiftModal] = useState(false);
  const [addStateModal, setAddStateModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    const instance = axios.create({
      baseURL: import.meta.env.VITE_DATABASE_URL,
      headers: {
        Authorization: `Bearer ${auth.currentUser.accessToken}`,
      },
    });
    setColumns(getColumns(location.pathname, setTitle));

    let url = "";
    if (location.pathname == "/dashboard/gift-items") url = "/api/gift";
    else if (location.pathname == "/dashboard/states") url = "/api/state";
    else url = "/api/giftTracking/all";
    instance
      .get(url)
      .then((res) => {
        setTableItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [location.pathname]);

  return (
    <div className="md:flex">
      <div className="w-[260px] min-w-[206px]">
        <Sidebar />
        <MobileSidebar />
      </div>
      <div className="flex-1 px-4 max-w-screen-xl mx-auto px-4 md:px-8 mt-8 ">
        {" "}
        <div className="w-full flex justify-between">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {title}
          </h3>
          {location.pathname == "/dashboard/states" && (
            <button
              onClick={() => {
                setAddStateModal(true);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add State
            </button>
          )}
          {location.pathname == "/dashboard/gift-items" && (
            <button
              onClick={() => {
                setAddGiftModal(true);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Gifts
            </button>
          )}
        </div>
        <Table columns={columns} rows={tableItems} loading={loading} />
      </div>
      <AddStateModal
        open={addStateModal}
        setOpen={setAddStateModal}
        setState={setTableItems}
      />
      {addGiftModal && (
        <AddGiftModal
          open={addGiftModal}
          setOpen={setAddGiftModal}
          gifts={tableItems}
        />
      )}
    </div>
  );
};
export default AdminDashboard;
