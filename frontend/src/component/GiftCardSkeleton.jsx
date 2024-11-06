const GiftCardSkeleton = () => {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between border p-3 rounded-lg animate-pulse bg-gray-100">
      <div className="w-full">
        <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-4"></div>
        <div className="h-5 bg-gray-300 rounded-md w-1/2 mb-6"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-3"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded-md w-full"></div>
    </article>
  );
};

export default GiftCardSkeleton;
