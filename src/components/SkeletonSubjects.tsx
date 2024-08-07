const SkeletonItem = () => {
   return (
      <div className="flex animate-pulse flex-col gap-4">
         <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-dark-600"></div>
         <div className="h-6 w-1/2 rounded bg-gray-300 dark:bg-dark-600"></div>
      </div>
   );
};

const SkeletonSubjects = () => {
   return (
      <div className="flex flex-col gap-7">
         <SkeletonItem />
         <SkeletonItem />
         <SkeletonItem />
      </div>
   );
};

export default SkeletonSubjects;
