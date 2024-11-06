"use client";
import loadingGif from "../assets/loading.gif";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";

import auth from "../../firebase.config";
import GiftCard from "./GiftCard";
export default function Example({ open, setOpen, setGifts }) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(() => {
    if (open) {
      setLoading(true);
      const instance = axios.create({
        baseURL: import.meta.env.VITE_DATABASE_URL,
        headers: {
          Authorization: `Bearer ${auth.currentUser?.accessToken}`,
        },
      });

      instance
        .post("/api/giftTracking")
        .then((res) => {
          setItem(res.data);
          if (!res.data.message) setGifts((prev) => [...prev, res.data]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open]);
  if (!open) return null;
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (loading) return;
        setOpen(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop transition className="fixed backdrop-blur inset-0" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto h-full">
        <div className="flex min-h-full items-end justify-center p-4 text-center items-center p-0 h-96">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in my-8 w-full max-w-lg data-[closed]:translate-y-0 data-[closed]:scale-95"
          >
            {loading ? (
              <div className="bg-white px-4 pb-4 pt-5 p-6 pb-4 flex  content-center h-96">
                <div className="flex justify-center items-center w-full">
                  <div className="mt-3 text-center ml-4 mt-0 text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Getting your gift
                    </DialogTitle>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingBottom: "0px",
                        position: "relative",
                      }}
                    >
                      <img src={loadingGif} alt="loading..." />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-12 py-6">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {item.message
                    ? "Bad Luck, Please try again later."
                    : " Congrats! Enjoy your gift"}
                </DialogTitle>
                {item.message ? (
                  <></>
                ) : (
                  <div className="p-6 px-0 pb-0">
                    <GiftCard item={item} />
                  </div>
                )}

                <div className="bg-white px-4 py-3 pb-0 flex flex-row-reverse px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0     w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
