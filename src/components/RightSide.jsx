"use client"; // Ensure that this component runs on the client side

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import InputField from "./InputField";
import client from "@/graphql/client";
import { CRETE_JOB_MUTATION } from "@/graphql/mutation";
import { useJobContext } from "@/context/JobContext";
import SelectField from "./SelectField";
import toast from "react-hot-toast";

const RightSide = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { jobs, setJobs } = useJobContext();

  const onSubmit = async (data) => {
    const response = await client.request(CRETE_JOB_MUTATION, data);
    toast.success('Job added successfully!')
    setJobs([response.insert_jobs_one, ...jobs]);
    reset();
  };

  return (
    <div className="p-4 flex md:justify-end justify-center w-full">
      <div className="md:w-[80%] w-full border px-5 pb-12 rounded-lg bg-white">
        <h1 className="text-center font-bold tracking-wider py-14 text-2xl">
          Add New Jobs
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Job Title"
            name="title"
            register={register}
            validation={{ required: "Job Title is required" }}
            error={errors.title}
          />
          <SelectField
            label="Job Role"
            name="role"
            register={register}
            validation={{ required: "Job role is required" }}
            error={errors.role}
          />
          <InputField
            label="Location"
            name="location"
            register={register}
            validation={{ required: "Job location is required" }}
            error={errors.location}
          />
          <InputField
            label="Salary"
            name="salary"
            register={register}
            validation={{ required: "Job salary is required" }}
            error={errors.salary}
          />
          <button type="submit" className="w-full py-1 bg-[#000000da] text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RightSide;
