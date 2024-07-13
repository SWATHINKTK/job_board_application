import React, { useState } from "react";
import { useForm } from "react-hook-form";

import client from "@/graphql/client";
import { EDIT_JOB_MUTATION } from "@/graphql/mutation";
import InputField from "./Common/InputField";
import SelectField from "./Common/SelectField";
import { useJobContext } from "@/context/JobContext";
import toast from "react-hot-toast";

const EditForm = ({job, setIsOpen}) => {
    const { jobs, setJobs } = useJobContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: job});
    const onSubmit = async (data) => {
        const response = await client.request(EDIT_JOB_MUTATION, {
            id: job.id, 
            title: data.title,
            role: data.role,
            location: data.location,
            salary:data.salary
        });
        toast.success('Job Updated successfully!')
        setJobs([response.insert_jobs_one, ...jobs]);
        setJobs(jobs.map(j => (j.id === job.id ? data : j)));
        reset();
        setIsOpen(false);
    };

    return (
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
            <button className="w-full py-1 bg-[#8d2e43da] text-white rounded" onClick={() => setIsOpen(false)}>
                Cancel
            </button>
        </form>
    )
}

export default EditForm
