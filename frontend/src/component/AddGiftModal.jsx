"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";

import auth from "../../firebase.config";
const AddGiftModal = ({ open, setOpen, gifts }) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [quantities, setQuantities] = useState(
    gifts.reduce((acc, gift) => ({ ...acc, [gift._id]: 0 }), {})
  );

  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const handleClose = (e) => {
    setQuantities(gifts.reduce((acc, gift) => ({ ...acc, [gift._id]: 0 }), {}));
    setOpen(false);
  };
  const addGifts = () => {
    const payload = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([giftId, quantity]) => ({ giftId, quantity }));

    instance
      .put("/api/gift", payload)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setQuantities(
          gifts.reduce((acc, gift) => ({ ...acc, [gift._id]: 0 }), {})
        );
        setOpen(false);
        setLoading(false);
      });
  };
  const handleQuantityChange = (giftId, value) => {
    if (value >= 0) {
      setQuantities((prev) => ({ ...prev, [giftId]: value }));
    }
    console.log(quantities);
  };
  if (!open) return null;
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop transition className="fixed backdrop-blur inset-0" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto h-full">
        <div className="flex min-h-full items-end justify-center p-4 text-center items-center p-0 h-96">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in my-8 w-full max-w-lg data-[closed]:translate-y-0 data-[closed]:scale-95"
          >
            <div className="px-12 py-6">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                Add Gifts
              </DialogTitle>

              <div className="space-y-4 mt-4">
                {gifts?.map((gift) => (
                  <div
                    key={gift._id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {gift.type}
                    </span>
                    <input
                      type="number"
                      value={quantities[gift._id]}
                      onChange={(e) =>
                        handleQuantityChange(
                          gift._id,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      min="0"
                      className="w-20 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white px-4 py-3 pb-0 flex flex-row-reverse px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={handleClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0     w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={addGifts}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0     w-auto"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default AddGiftModal;
