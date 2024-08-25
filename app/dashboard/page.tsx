'use client';

// pages/dashboard.js
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import Modal from '../components/Task/Modal/Modal';
import ConfirmDeleteModal from '../components/Task/Modal/ConfirmDeleteModal';
import axios from 'axios';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../authContext';
import ReactPaginate from 'react-paginate';
import TaskIndicators from '../components/Task/TaskIndicators';
import UserInfoForm from '../components/Task/User/UserInfoForm';
import Link from 'next/link';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('titleAsc');
  const [currentPage, setCurrentPage] = useState(0);
  const [tasksPerPage, setTasksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setTasks(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      toast({
        title: 'Error fetching tasks',
        description: 'An error occurred while fetching tasks.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const applyFilters = (tasks) => {
    let filtered = tasks;
    if (statusFilter !== 'all') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    if (sortOption === 'titleAsc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'titleDesc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'priorityAsc') {
      filtered.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (sortOption === 'priorityDesc') {
      filtered.sort((a, b) => b.priority.localeCompare(a.priority));
    }
    setFilteredTasks(filtered);
  };

  const handleFormSubmit = async (task) => {
    setIsLoading(true);
    try {
      let updatedTasks;

      if (isEditing) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${currentTask.id}`,
          task,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        updatedTasks = tasks.map((t) => (t.id === currentTask.id ? response.data : t));
        toast({
          title: 'Task updated',
          description: 'The task has been successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        updatedTasks = [...tasks, response.data];
        toast({
          title: 'Task added',
          description: 'The task has been successfully added.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      setTasks(updatedTasks);
      applyFilters(updatedTasks);
      closeModal();
    } catch (error) {
      console.error('Failed to save task', error);
      toast({
        title: 'Error saving task',
        description: 'An error occurred while saving the task.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentTask(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id);
      setTasks(updatedTasks);
      applyFilters(updatedTasks);
      toast({
        title: 'Task deleted',
        description: 'The task has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete task', error);
      toast({
        title: 'Error deleting task',
        description: 'An error occurred while deleting the task.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, sortOption]);

  // Pagination logic
  const indexOfLastTask = (currentPage + 1) * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-black text-xl font-bold text-center">Task Manager</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user?.username}</span>
            <Link legacyBehavior href="/profile">
              <a className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Edit Profile
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Indicators Component */}
        <TaskIndicators tasks={tasks} />

        <div className="flex justify-between items-center mt-10 mb-4">
          <button
            onClick={handleAddClick}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Task
          </button>
          <div className="flex space-x-4">
          <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-black border border-gray-300 rounded-md py-2 px-4"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-black border border-gray-300 rounded-md py-2 px-4"
            >
              <option value="titleAsc">Title (A-Z)</option>
              <option value="titleDesc">Title (Z-A)</option>
              <option value="priorityAsc">Priority (Low to High)</option>
              <option value="priorityDesc">Priority (High to Low)</option>
            </select>
          </div>
        </div>

        <TaskList tasks={currentTasks} onEdit={handleEditClick} onDelete={handleDeleteClick} />

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-2"
            pageClassName="cursor-pointer"
            pageLinkClassName="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 no-underline"
            previousClassName="cursor-pointer"
            previousLinkClassName="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 no-underline"
            nextClassName="cursor-pointer"
            nextLinkClassName="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 no-underline"
            breakClassName="cursor-pointer"
            breakLinkClassName="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 no-underline"
            activeClassName="bg-indigo-600 text-white"
            activeLinkClassName="no-underline"
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
        <TaskForm 
          onSubmit={handleFormSubmit} 
          initialTask={currentTask} 
          buttonLabel={isEditing ? 'Update Task' : 'Add Task'}
          isLoading={isLoading} // Pass the loading state to the form
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isLoading={isDeleting} // Pass the deleting state to the modal
      />
    </div>
  );
};

export default withAuth(Dashboard);

              
