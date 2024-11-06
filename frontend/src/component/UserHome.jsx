import { useEffect, useState } from "react";
import Modal from "./Modal";
import GiftCard from "./GiftCard";
import auth from "../../firebase.config";
import axios from "axios";
import Navbar from "./Navbar";
import GiftCardSkeleton from "./GiftCardSkeleton";

export default function Example() {
  const [gifts, setGifts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const instance = axios.create({
      baseURL: import.meta.env.VITE_DATABASE_URL,
      headers: {
        Authorization: `Bearer ${auth.currentUser?.accessToken}`,
      },
    });

    instance
      .get("/api/giftTracking")
      .then((res) => {
        setGifts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  return (
    <>
      <Navbar />

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Gifts
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Keep track of your gifts here. (You can get a maximum of 3 gifts)
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading ? (
              <>
                <GiftCardSkeleton />
                <GiftCardSkeleton />
                <GiftCardSkeleton />
              </>
            ) : (
              <>
                {" "}
                {gifts.length < 3 && (
                  <article
                    className="flex max-w-xl flex-col items-center justify-center border-dotted border-2 border-gray-400 p-6 rounded-lg text-center cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-100 hover:border-gray-500"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                      Click here to get your gift
                    </h3>
                  </article>
                )}
                {gifts.map((gift) => (
                  <GiftCard item={gift} />
                ))}
              </>
            )}
          </div>
        </div>
        <Modal open={isModalOpen} setOpen={setModalOpen} setGifts={setGifts} />
      </div>
    </>
  );
}
