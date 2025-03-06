export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
