import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import './AddAnnouncement.css';
import ResponsiveMenu from '../../../layout/Responsive menu/ResponsiveMenu';
const AddAnnouncement = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const announcement = {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      department: data.department,
      summery: data.summery,
      description: data.description,
     
    };

    // console.log(announcement);

    fetch("https://hrm-server-side.onrender.com/announcement", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(announcement),
        })
          .then((response) => response.json())
          .then((announcementResult) => {
            toast.success('Announcement Added')
            // console.log(employeeResult);
            reset()
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  };
  return (
    <div>
    <ResponsiveMenu></ResponsiveMenu>
      <h2 className=" text-lg font-semibold text-gray-700">
        Add New Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 ">
        <div className=" grid grid-cols-2 justify-between gap-5">
          {/* Title */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered"
                {...register("title", {
                  required: true,
                })}
                aria-invalid={errors.title ? "true" : "false"}
              />
            </label>
            {errors.title?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Title is required
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                placeholder="start Date"
                className="input input-bordered"
                {...register("startDate", {
                  required: true,
                })}
                aria-invalid={errors.startDate ? "true" : "false"}
              />
            </label>
            {errors.startDate?.type === "required" && (
              <p className=" text-red-600" role="alert">
                First name is required
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                placeholder="End date"
                className="input input-bordered"
                {...register("endDate", {
                  required: true,
                })}
                aria-invalid={errors.endDate ? "true" : "false"}
              />
            </label>
            {errors.endDate?.type === "required" && (
              <p className=" text-red-600" role="alert">
                First name is required
              </p>
            )}
          </div>

          {/* Department */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <label className="input-group">
              <select
                {...register("department")}
                className="select select-bordered w-2/3 max-w-xs"
              >
                <option value="Engineering">Engineering</option>
                <option value="Training">Training</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </label>
          </div>

          {/* summery */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">Summery</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Summery"
                className="input input-bordered"
                {...register("summery", {
                  required: true,
                })}
                aria-invalid={errors.summery ? "true" : "false"}
              />
            </label>
            {errors.summery?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Summery is required
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-control announcement-input-card">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <label className="input-group">
              <textarea
                className="input input-bordered"
                name=""
                id=""
                cols="30"
                rows="10"
                {...register("description", {
                  required: true,
                })}
                aria-invalid={errors.description ? "true" : "false"}
              ></textarea>
            </label>
            {errors.description?.type === "required" && (
              <p className=" text-red-600" role="alert">
                Description is required
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button className="btn btn-sm text-center">
            <input type="submit" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncement;
