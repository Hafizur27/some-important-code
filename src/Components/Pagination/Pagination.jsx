/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

/* step-1: pagination state
  const [paginationData, setPaginationData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  
  // step-2: next & previous button functionality
  const handleNext = () => {
    if (page === pageCount) {
      return page;
    } else {
      return setPage(page + 1);
    }
  };
  
  const handlePrevious = () => {
    if (page === 1) {
      return page;
    } else {
      return setPage(page - 1);
    }
  };

  // step-3: showing pagination data

  step-4: props drilling data
   <Pagination
          data={customers}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
*/

// step-4: pagination component

const Pagination = ({
  data,
  paginationData,
  setPaginationData,
  page,
  setPage,
  pageCount,
  setPageCount,
  handleNext,
  handlePrevious,
}) => {
  useEffect(() => {
    const totalCount = Math.ceil(data.length / 9);
    setPageCount(totalCount);

    if (page) {
      const limit = 9;
      const skip = limit * page;
      const updateData = data?.slice(page === 1 ? 0 : skip - limit, skip);
      setPaginationData(updateData);
    }
  }, [data]);

  return (
    <div className="flex flex-wrap justify-end lg:justify-between lg:items-center mt-[20px] lg:mt-[60px]">
      <p className="text-[16px] text-[#47484A] flex-1 text-center lg:text-start order-2 lg:order-1 font-[400]">
        Showing {paginationData.length === 0 ? 0 : 9 * page - 9 + 1} to{" "}
        {9 * page - 9 + paginationData.length} of {data.length} entries
      </p>
      <div className="flex  pagination lg:order-2 gap-[5px] bg-[#F9F5FF] py-[8px] px-[20px] rounded-full">
        <button
          onClick={() => handlePrevious()}
          disabled={page === 1}
          className={page === 1 ? "text-[#47484A]" : "text-[#37a6d2]"}
        >
          <MdArrowBackIosNew />
        </button>
        {Array(pageCount)
          ?.fill(null)
          ?.map((ele, index) => (
            <span
              onClick={() => setPage(index + 1)}
              className={
                page === index + 1
                  ? "bg-[#37a6d2] text-[#FFFF] "
                  : "text-[#47484A]"
              }
            >
              {index + 1}
            </span>
          ))}
        <button
          onClick={() => handleNext()}
          disabled={page === pageCount}
          className={page === pageCount ? "text-[#47484A]" : "text-[#37a6d2]"}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
