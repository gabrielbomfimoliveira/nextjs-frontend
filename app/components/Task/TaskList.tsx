// components/TaskList.tsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    const statusColors = {
        'pending': 'bg-yellow-300',
        'in-progress': 'bg-blue-300',
        'completed': 'bg-green-300',
    };

    const priorityColors = {
        'low': 'bg-green-200',
        'medium': 'bg-yellow-200',
        'high': 'bg-red-200',
    };

    return (
        <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{task.title}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{task.description}</td>
                        <td className="py-4 px-6 text-sm text-gray-900 flex items-center">
                            <span className={`w-3 h-3 rounded-full ${statusColors[task.status]}`}></span>
                            <span className="ml-2 capitalize">{task.status}</span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900">
                            <div className="flex items-center">
                                <span className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}></span>
                                <span className="ml-2 capitalize">{task.priority}</span>
                            </div>
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                            <button onClick={() => onEdit(task)} className="text-blue-600 hover:text-blue-800">
                                <FaEdit />
                            </button>
                            <button onClick={() => onDelete(task)} className="ml-3 text-red-600 hover:text-red-800">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskList;
