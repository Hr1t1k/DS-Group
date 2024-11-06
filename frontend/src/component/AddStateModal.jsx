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
const AddStateModal = ({ open, setOpen, setState }) => {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [distributionLimit, setDistributionLimit] = useState(0);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const handleClose = (e) => {
    setName("");
    setDistributionLimit(0);
    setOpen(false);
  };
  const addState = () => {
    instance
      .post("/api/state", { name: name, distributionLimit: distributionLimit })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setState((prev) => [...prev, data]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setName("");
        setDistributionLimit(0);
        setOpen(false);
        setLoading(false);
      });
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
                Add New State
              </DialogTitle>

              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter state name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Distribution Limit (0-100)
                  </label>
                  <input
                    type="number"
                    value={distributionLimit}
                    onChange={(e) =>
                      setDistributionLimit(
                        Math.max(
                          0,
                          Math.min(100, parseInt(e.target.value) || 0)
                        )
                      )
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    min="0"
                    max="100"
                    placeholder="Enter distribution limit"
                  />
                </div>
              </div>

              <div className="bg-white px-4 py-3 pb-0 flex flex-row px-6 gap-5">
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
                  onClick={addState}
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
export default AddStateModal;
