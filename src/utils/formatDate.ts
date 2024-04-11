export const formatDate = (date: Date) => {
   const day = date.getDay();
   const year = date.getFullYear();
   const month = date.toLocaleDateString('en-US', { month: 'long' });

   return `${day} ${month} ${year}`;
};
