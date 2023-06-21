//TABLE COMPONENT
import React, { useEffect } from 'react';

import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Table = ({ headers, rows, controls, config }) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    {headers.map((header, index) => (
                                        <th key={index} className="py-3 px-6 text-left">{header}</th>
                                    ))}
                                    <th className="py-3 px-6 text-center">Controls</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {rows.map((row, index) => (
                                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        {config.fields.map((field) => (
                                            <td key={field} className="py-3 px-6 text-left whitespace-nowrap">{row[field]}</td>
                                        ))}
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-around">
                                                {config.controls.map((control) => {
                                                    const ControlIcon = {
                                                        'viewUser': FaEye,
                                                        'editUser': FaEdit,
                                                        'deleteUser': FaTrash,
                                                        'editContact': FaEdit,
                                                        'deleteContact': FaTrash,
                                                    }[control];
                                                    const colorClass = {
                                                        'viewUser': 'text-blue-500',
                                                        'editUser': 'text-yellow-500',
                                                        'deleteUser': 'text-red-500',
                                                        'editContact': 'text-yellow-500',
                                                        'deleteContact': 'text-red-500',
                                                    }[control];
                                                    return <ControlIcon key={control} onClick={() => controls[control](row.id)} className={`cursor-pointer ${colorClass} text-2xl`} />;
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Table;
