"use client";
import { useJobContext } from "@/context/JobContext";
import client from "@/graphql/client";
import { FILTER_JOBS, GET_JOBS } from "@/graphql/queries";
import moment from "moment";
import Modal from 'react-modal';
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsFilterRight } from "react-icons/bs";
import { DELETE_JOB_MUTATION } from "@/graphql/mutation";
import EditForm from "./EditForm";

const RightSide = () => {
    const { jobs, setJobs } = useJobContext();
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [editData, setEditData] = useState({});
    const [filterData, setFilterData] = useState('')

    const jobRoles = ["All","internship",'entry_level',"associate","mid_senior_level","director","executive"]

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          width:'25rem',
          transform: 'translate(-50%, -50%)',
        },
      };

      const getData = useCallback(async () => {
        try {
            if (filterData) {
                const { jobs } = await client.request(FILTER_JOBS, { role: filterData });
                setJobs(jobs);
            } else {
                const { jobs } = await client.request(GET_JOBS);
                setJobs(jobs);
            }
        } catch (error) {
            console.error(error);
        }
    }, [filterData, setJobs]);

    useEffect(() => {
        getData();
    }, [getData,filterData]);

    const handleEdit = (jobData) => {
        setEditData(jobData)
        setIsOpen(true);
    }

    const handleDelete = async (id) => {
        await client.request(DELETE_JOB_MUTATION, { id });
        alert('Deleted')
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    }

    const handleFilter = (role) => {
        setFilterData(role === 'All' ? '' : role);
        setFilterOpen(false);
    }
    
    return (
        <div className="relative flex flex-col justify-center h-full">
            <div className="h-[10vh] flex flex-col md:justify-end">
                <div className="flex justify-between bg-[#ffffff] text-[#000] rounded-sm px-3 py-2">
                    <h1 className="text-2xl font-bold">Job Lists</h1>
                    <button onClick={() => setFilterOpen(!isFilterOpen)} className="bg-gray-200 px-2 rounded">
                        <BsFilterRight size={25} />
                    </button>
                    {/* Dropdown menu */}
                    {isFilterOpen && (
                        <div className="absolute top-16 right-0 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-48">
                            <p className="font-semibold mb-2">Filter Job Roles</p>
                            <ul className="space-y-2">
                                {jobRoles.map((role,index) => (
                                     <li key={index} className="capitalize">
                                        <input type="radio" name="role" className="mx-2" value={role} onClick={() => handleFilter(role)} checked={role == filterData}/>
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
            {/* Card Section */}
            <div className="md:h-[90vh] h-[50vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    {jobs.map((job, index) => (
                        <div key={index} className="m-3 font-mono">
                            <div className="md:max-w-xs w-full overflow-hidden bg-white border border-gray-200 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-30 blur-md" />
                                <div className="px-6 py-5 relative z-10">
                                    <p className="text-xl font-semibold text-gray-800 capitalize">
                                        {job.title}
                                    </p>
                                    <p className="leading-none text-[#787878ce] text-[0.9rem] font-semibold">{job.role}</p>
                                    <p className="font-semibold mt-3">{job.salary}</p>
                                    <p>{job.location}</p>
                                    <hr className="my-1" />
                                    <div className="flex justify-between items-center font-semibold text-xs text-gray-500">
                                        <p>{moment(job.createdAt).format('DD MMM YYYY')}</p>
                                        <div className="flex justify-end items-center text-xs">
                                            <button className="p-2 rounded-full bg-slate-300" onClick={() => handleEdit(job)}>
                                                <MdOutlineEdit size={15} className="text-[#13285c]" />
                                            </button>
                                            <span className="mx-1"></span>
                                            <button className="p-2 rounded-full bg-slate-300" onClick={() => handleDelete(job.id)}>
                                                <MdDelete size={15} className="text-[#c43131]" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <EditForm job={editData} setIsOpen={setIsOpen}/>
            </Modal>
        </div>
    );
};

export default RightSide;
