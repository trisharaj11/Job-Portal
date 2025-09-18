import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendURL, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);

  // fetch company job applications
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/company/applicants",
        { headers: { token: companyToken } }
      );
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // status update
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Applications Available or posted</p>
  </div>
    ) : (
      <div className="container mx-auto p-6">
        <div>
          <table className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  #
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  Company
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  Job Title
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  Location
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  Resume
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId && item.companyId)
                .map((applicant, index) => {
                  const status = applicant.status?.toLowerCase();
                  return (
                    <tr
                      key={applicant._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6 border-b text-gray-700">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 border-b flex items-center gap-3 text-gray-700">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={applicant.companyId.logo}
                          alt={applicant.companyId.name}
                        />
                        <span>{applicant.companyId.name}</span>
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        {applicant.jobId.title}
                      </td>
                      <td className="py-3 px-6 border-b text-gray-700">
                        {applicant.jobId.location}
                      </td>
                      <td className="py-3 px-6 border-b">
                        <a
                          href={applicant.userId.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-medium hover:bg-blue-200"
                        >
                          Resume
                        </a>
                      </td>
                      <td className="py-3 px-6 border-b">
                        {status === "accepted" && (
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md font-medium">
                            Accepted
                          </span>
                        )}
                        {status === "rejected" && (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md font-medium">
                            Rejected
                          </span>
                        )}
                        {status === "pending" && (
                          <div className="relative inline-block text-left group">
                            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-medium">
                              Pending
                            </button>
                            <div className="z-10 hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md group-hover:block">
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Accepted"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Rejected"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;
