// components/Table.js
import React, { useEffect } from 'react';

const Table = ({ headers, rows, controls }) => {

    useEffect(() => {
    }, []);

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
                                    <th className="py-3 px-6 text-center">Controles</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {rows.map((row, index) => (
                                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{row.name}</td>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{row.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            {controls}
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
