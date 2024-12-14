// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePagination = () => {
    const pagination = [];

    // Always include the first page
    if (currentPage !== 1) {
      pagination.push(1);
      if (currentPage !== 2) {
        pagination.push(2);
      }
    }

    // Add ellipsis before current page
    if (currentPage > 3) {
      pagination.push("<<");
      pagination.push("...");
    }

    // Add the current page
    pagination.push(currentPage);

    // Add ellipsis after current page
    if (currentPage < totalPages - 1) {
      pagination.push("...");
      pagination.push(">>");
    }

    // Always include the last page
    if (currentPage !== totalPages) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  const pagination = generatePagination();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {pagination.map((item, index) => (
        <button
          key={index}
          className={`px-4 py-2 border rounded-3xl font-bold ${
            item === currentPage
              ? "bg-[#00ADB5] text-white shadow-lg shadow-[#00ADB5]"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          disabled={item === "..." || item === currentPage}
          onClick={() => {
            typeof item === "number" && onPageChange(item);
            if (item === "<<") onPageChange(currentPage - 1);
            if (item === ">>") onPageChange(currentPage + 1);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
