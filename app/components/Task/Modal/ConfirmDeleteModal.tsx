// ConfirmDeleteModal.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="text-black bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <button
          onClick={onClose}
          className="text-black absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-black text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="text-black mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
