export const formatDateStr = (dateStr) => {
  if (!dateStr || dateStr.length == 0) {
    return "";
  }

  // Assuming dateStr has a format of YYYYMMDD
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  return `${year}年${month}月${day}日`;
};
