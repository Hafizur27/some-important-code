import { useForm } from "react-hook-form";
import {
  commonFormTitle,
  dashboardBodyWraper,
  errorMessage,
} from "../../../../asset/commoncssConstant/CommonCssConstant";
import BackButton from "../../../../shared/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../BaseUrl";

const AddCsDagAndKhaytan = () => {
  const [ownerForm, setOwnerForm] = useState([{ recorded_person: "" }]);
  const [defaultData, setDefaultData] = useState(null);
  const mouzaInfoList = useLocation().state.mouzaInfoList;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //-------get mouza info by id select-------------
  const handleSelectById = (e) => {
    e.preventDefault();
    setDefaultData(
      mouzaInfoList.find((project) => project.mouza_name === e.target.value)
    );
  };
  //-------get mouza info by id select option end---------------

  //--------Add More ownerForm Form or delete functionality start---------
  const handleOwnerFormAdd = () => {
    setOwnerForm([...ownerForm, { recorded_person: "" }]);
  };
  const handleOwnerFormRemove = () => {
    setOwnerForm([...ownerForm].slice(0, -1));
  };
  //--------Add More ownerForm Form or delete functionality end---------

  //--------landInformationBank/csDagKhatiyan/store start---------
  const onSubmit = (data) => {
    // console.log(data)
    data.recorded_person = data?.recorded_person?.slice(0, ownerForm?.length);
    data.mouza_id = defaultData.id;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value == "object") {
        if (key === "recorded_person") {
          for (let i = 0; i < value.length; i++) {
            let names = Object.keys(value[i]);
            names.forEach((name) => {
              formData.append(`recorded_person[${i}][${name}]`, value[i][name]);
            });
          }
        }
        if (key !== "recorded_person") {
          if (value instanceof FileList) {
            for (let i = 0; i < value.length; i++) {
              formData.append(key, value.item([i]));
            }
          }
        }
      } else {
        formData.append(key, value);
      }
    });

    axios
      .post(baseUrl + `/landInformationBank/csDagKhatiyan/store`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          navigate(-1);
        }
      });
  };
  //--------landInformationBank/csDagKhatiyan/store end---------

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BackButton title={"Add CS  Information"} />
      <div className={`${dashboardBodyWraper} py-[4px] `}>
        <div>
          <p className={commonFormTitle}>cs dag & Khatiyan Information</p>

          <div className="grid gap-4 px-4 md:px-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="common_input_wraper">
              <label>Mouza Name *</label>
              <select onChange={(e) => handleSelectById(e)} required>
                <option value="">Select Your Mouza</option>
                {mouzaInfoList.map((mouza) => (
                  <option key={mouza.id} value={mouza.mouza_name}>
                    {mouza.mouza_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="common_input_wraper">
              <label>CS Dag No.</label>
              <input
                {...register("cs_dag_no", {
                  required: "Dag no is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please insert number",
                  },
                })}
                type="text"
                placeholder="CS Dag No."
              />
              {errors?.cs_dag_no && (
                <p className={errorMessage}>{errors?.cs_dag_no?.message}</p>
              )}
            </div>
            <div className="common_input_wraper">
              <label>CS Khatiyan No.</label>
              <input
                {...register("cs_khatiyan_no", {
                  required: "Khatiyan no. is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please insert number",
                  },
                })}
                type="text"
                placeholder="CS Khatiyan No."
              />
              {errors?.cs_khatiyan_no && (
                <p className={errorMessage}>
                  {errors?.cs_khatiyan_no?.message}
                </p>
              )}
            </div>
            <div className="common_input_wraper">
              <label>Total Cs Area</label>
              <input
                {...register("total_cs_area", {
                  required: "Cs area is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/,
                    message: "Please insert number",
                  },
                })}
                type="text"
                placeholder="Total Cs Area"
              />
              {errors?.total_cs_area && (
                <p className={errorMessage}>{errors?.total_cs_area?.message}</p>
              )}
            </div>
            <div className="common_input_wraper">
              <label>Total Cs Use Area</label>
              <input
                {...register("total_cs_use_area", {
                  required: "Use area is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/,
                    message: "Please insert number",
                  },
                })}
                type="text"
                placeholder="Total Cs Use Area"
              />
              {errors?.total_cs_use_area && (
                <p className={errorMessage}>
                  {errors?.total_cs_use_area?.message}
                </p>
              )}
            </div>

            <div className="common_input_wraper">
              <label>Add CS Porca Scan Copy</label>
              <input
                {...register("cs_porca_scan_copy", {
                  required: "Porca scan copy is required",
                })}
                type="file"
              />
              {errors?.cs_porca_scan_copy && (
                <p className={errorMessage}>
                  {errors?.cs_porca_scan_copy?.message}
                </p>
              )}
            </div>

            <div className="common_input_wraper">
              <label>CS Dag Map Scan Copy</label>
              <input
                {...register("cs_dag_map_scan_copy", {
                  required: "Map scan copy is required",
                })}
                type="file"
              />
              {errors?.cs_dag_map_scan_copy && (
                <p className={errorMessage}>
                  {errors?.cs_dag_map_scan_copy?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 border-[1px] border-[#d5d7d7]rounded-[5px] ">
            {ownerForm.map((item, i) => {
              return (
                <div key={i}>
                  <div className="grid gap-4 px-4 md:px-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-5">
                    {/* <div className="common_input_wraper hidden">
                      <label>CS Recorded Person Id</label>
                      <input
                        {...register(`recorded_person[${i}].id`)}
                        type="text"
                        placeholder="CS Recorded Person Id"
                      />
                    </div> */}
                    <div className="common_input_wraper">
                      <label>CS Recorded Person</label>
                      <input
                        {...register(
                          `recorded_person[${i}].cs_recorded_person`,
                          {
                            required: "Recorder name is required",
                            pattern: {
                              value: /^[A-Za-z]+[A-Za-z0-9\-_~\s]*[A-Za-z0-9]$/,
                              message:
                                "Insert valid name",
                            },
                          }
                        )}
                        type="text"
                        placeholder="CS Recorded Person"
                      />
                      {errors &&
                        errors.recorded_person &&
                        errors.recorded_person[i] && (
                          <p className={errorMessage}>
                            {
                              errors?.recorded_person[i]?.cs_recorded_person
                                ?.message
                            }
                          </p>
                        )}
                    </div>
                    <div className="common_input_wraper">
                      <label>CS Recorded Person’s Father Name</label>
                      <input
                        {...register(`recorded_person[${i}].father_name`, {
                          required: "Father name is required",
                          pattern: {
                            value: /^[A-Za-z]+[A-Za-z0-9\-_~\s]*[A-Za-z0-9]$/,
                            message: "Insert valid name",
                          },
                        })}
                        type="text"
                        placeholder="CS Recorded Person’s Father Name"
                      />
                      {errors &&
                        errors.recorded_person &&
                        errors.recorded_person[i] && (
                          <p className={errorMessage}>
                            {errors?.recorded_person[i]?.father_name?.message}
                          </p>
                        )}
                    </div>
                    <div className="common_input_wraper">
                      <label>Recorded Person Ownership Size</label>
                      <input
                        {...register(`recorded_person[${i}].ownership_size`, {
                          required: "Ownership size is required",
                          pattern: {
                            value: /^[0-9]+(\.[0-9]+)?$/,
                            message: "Please insert number",
                          },
                        })}
                        type="text"
                        placeholder="Recorded Person Ownership Size"
                      />
                      {errors &&
                        errors.recorded_person &&
                        errors.recorded_person[i] && (
                          <p className={errorMessage}>
                            {errors?.recorded_person[i]?.ownership_size?.message}
                          </p>
                        )}
                    </div>
                  </div>
                  {(ownerForm.length - 1 === i && ownerForm.length) > 1 && (
                    <button
                      className="delete_customer"
                      type="button"
                      onClick={handleOwnerFormRemove}
                    >
                      Delete{" "}
                    </button>
                  )}
                </div>
              );
            })}

            <div>
              <button
                type="button"
                className="add_customer"
                onClick={handleOwnerFormAdd}
              >
                Add More Owner <span className="plus">+</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center py-10">
          <button type="submit" className="submit_button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCsDagAndKhaytan;
