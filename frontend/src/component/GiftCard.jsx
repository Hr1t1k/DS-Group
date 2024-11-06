const GiftCard = ({ item }) => {
  return (
    <article
      key={item?._id}
      className="flex max-w-xl flex-col items-start justify-between border p-3 rounded-lg"
    >
      <div className="group relative w-full">
        <div className="flex flex-row lg:flex-col justify-between">
          <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            {item?.gift?.type}
          </h3>
          <time
            dateTime={item?.datetime}
            className="text-gray-500 text-md mt-2 lg:mt-0"
          >
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <p className="mt-5 line-clamp-3 text-lg text-gray-600">
          {`Tracking Number:${item.trackingNumber}`}
        </p>
      </div>
    </article>
  );
};
export default GiftCard;
