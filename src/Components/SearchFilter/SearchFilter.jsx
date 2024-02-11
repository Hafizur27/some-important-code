/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import ActionBtn from "../../asset/images/clientlist/action.png";
import ViewBtn from "../../asset/images/clientlist/view.png";
import Pagination from "../../shared/pagination/Pagination";
import CommonPrintPdfBtn from "../../shared/CommonPrintPdfBtn";
import {
  addCustomerCss,
  commonAction,
  commonAddButton,
  commonCaption,
  commonSearchInput,
  commonTableHeadingTwo,
  commonTableRow,
  commonTitle,
  dashboardBodyWraper,
} from "../../asset/commoncssConstant/CommonCssConstant";
import { Link } from "react-router-dom";
import AddUserImg from "../../asset/images/clientlist/add-user.png";
import axios from "axios";
import { baseUrl } from "../../BaseUrl";
import { LuArrowDownUp } from "react-icons/lu";

const ClientList = () => {
  const token = localStorage.getItem("token");
  const [customers, setCustomers] = useState([]);
  const [plotList, setPlotList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //--------get customer list, plot list, agent List data start-------------
  useEffect(() => {
    axios
      .get(baseUrl + `/customer/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCustomers(res.data.data);
      });
    axios
      .get(baseUrl + `/plotBank/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPlotList(res.data.data); 
      });
    axios
      .get(baseUrl + `/customer/allAgent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAgentList(res.data.data);
      });
  }, [token]);
  //--------get customer list, plot list, agent List  data end-------------


  return (
    <div>
      <h1 className={commonTitle}>Client Information</h1>
      <div className={dashboardBodyWraper}>
        <div className={commonAddButton}>
          <Link
            to={`/dashboard/client-list/add-client`}
            state={{
              plotList: plotList,
              agentList: agentList,
            }}
          >
            <button className={addCustomerCss}>
              <span>Add Customer</span>
              <img className="ml-[15px]" src={AddUserImg} alt="" />
            </button>
          </Link>
        </div>
        <div className={commonCaption}>
          <CommonPrintPdfBtn />
          <input
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search"
            className={commonSearchInput}
          />
        </div>

        <div className="table_responsive mt-[40px]">
          <table>
            <thead className="uppercase">
              <tr className={commonTableRow}>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>File/Plot No</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>Booking Date</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>Customer’s Name</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>
                      Customer’s <br />
                      mobile no
                    </span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>Land Size (Katha)</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>
                      Land Size <br /> (Ojutangsho)
                    </span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>
                      Land Price <br />
                      per decimal (Tk)
                    </span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>Total Price (Tk)</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>

                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>Agent Name</span>{" "}
                    <span>
                      <LuArrowDownUp />
                    </span>
                  </div>
                </th>
                <th>
                  <div className={commonTableHeadingTwo}>
                    <span>
                      Action <br /> Update / View
                    </span>{" "}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers
                .filter((info) => {
                  return searchValue.toLowerCase() !== ""
                    ? info?.plot_info?.file_no
                        .toLowerCase()
                        .includes(searchValue) ||
                        info?.booking_date
                          ?.toLowerCase()
                          .includes(searchValue) ||
                        info?.customer_info
                          ?.map((c) => {
                            return c.name;
                          })
                          .join(" ")
                          .toLowerCase()
                          .includes(searchValue) ||
                        info?.customer_info
                          .map((c) => {
                            return [
                              ...c?.mobile_number_1,
                              ...c?.mobile_number_2,
                            ];
                          })
                          .join("")
                          .split(",")
                          .join("")
                          .toLowerCase()
                          .includes(searchValue) ||
                        info.plot_info?.plot_size_katha
                          .toLowerCase()
                          .includes(searchValue) ||
                        info?.agent?.name.toLowerCase().includes(searchValue) ||
                        info?.plot_info?.plot_size_ojutangsho
                          .toLowerCase()
                          .includes(searchValue) ||
                        info?.customer_land_price?.land_price_per_decimal
                          .toLowerCase()
                          .includes(searchValue) ||
                        info?.customer_land_price?.total_amount
                          .toLowerCase()
                          .includes(searchValue)
                    : info;
                })
                .map((item) => {
                  return (
                    <tr key={item.id} className="text-center">
                      <td>
                        <span className="font-bold">
                          {item?.plot_info?.file_no}
                        </span>
                      </td>
                      <td>{item?.booking_date}</td>
                      <td>
                        {item?.customer_info?.map((cus) => (
                          <p key={cus?.id}>
                            {cus?.name}{" "}
                            {cus !==
                              item.customer_info[
                                item.customer_info.length - 1
                              ] && ", "}
                          </p>
                        ))}
                      </td>
                      <td>
                        {item?.customer_info?.map((cus) => (
                          <div key={cus?.id}>
                            <div>
                              {cus?.mobile_number_1} & {cus?.mobile_number_2}
                            </div>
                          </div>
                        ))}
                      </td>
                      <td>{item?.plot_info?.plot_size_katha}</td>
                      <td>{item?.plot_info?.plot_size_ojutangsho}</td>
                      <td>
                        {item?.customer_land_price?.land_price_per_decimal}
                      </td>
                      <td>
                        <span className="font-bold">
                          {item?.customer_land_price?.total_amount}
                        </span>
                      </td>
                      <td>{item?.agent?.name}</td>
                      <td>
                        <span className="flex gap-3 justify-center">
                          <Link
                            to={`/dashboard/client-list/edit`}
                            state={{
                              clientData: item,
                              plotList: plotList,
                              agentList: agentList,
                            }}
                          >
                            <img
                              className={commonAction}
                              src={ActionBtn}
                              alt=""
                            />
                          </Link>
                          <Link
                            to="/dashboard/client-list/view"
                            state={{
                              clientData: item,
                            }}
                          >
                            <img
                              className={commonAction}
                              src={ViewBtn}
                              alt=""
                            />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default ClientList;
