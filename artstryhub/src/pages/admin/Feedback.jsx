// src/pages/Admin/Feedback.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminFeedback = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      username: 'john_doe',
      message: 'I love the platform! Can you add more features?',
      date: '2024-11-20',
      email: 'john_doe@example.com',
      progress: 'pending',
      replies: [
        {
          sender: 'Admin',
          content: 'Thank you for your feedback!',
          time: '2024-11-21 10:00 AM',
        },
      ],
    },
    {
      id: 2,
      username: 'jane_smith',
      message: 'The app is great, but I found a bug.',
      date: '2024-11-18',
      email: 'jane_smith@example.com',
      progress: 'in-progress',
      replies: [],
    },
  ]);
  const [newReply, setNewReply] = useState('');

  const addReply = (id) => {
    if (!newReply.trim()) return;

    const updatedFeedback = feedback.map((item) => {
      if (item.id === id) {
        const now = new Date();
        const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
        return {
          ...item,
          replies: [
            ...item.replies,
            { sender: 'Admin', content: newReply, time: formattedTime },
          ],
        };
      }
      return item;
    });

    setFeedback(updatedFeedback);
    setNewReply('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        userRole="admin"
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Dashboard Navigation */}
      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole="admin"
          openSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Main Content */}
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Feedback</h1>

          {/* Feedback List */}
          <div className="space-y-6">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Feedback Info */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold">{item.username}</h2>
                  <p className="text-gray-500 text-sm">{item.email}</p>
                  <p className="mt-2 text-gray-700">{item.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.date}</p>
                </div>

                {/* Progress Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor={`progress-${item.id}`}
                    className="text-sm font-medium text-gray-600"
                  >
                    Progress:
                  </label>
                  <select
                    id={`progress-${item.id}`}
                    value={item.progress}
                    onChange={(e) =>
                      setFeedback((prev) =>
                        prev.map((f) =>
                          f.id === item.id
                            ? { ...f, progress: e.target.value }
                            : f
                        )
                      )
                    }
                    className="block w-full mt-1 border rounded-md py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {/* Reply Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Replies:
                  </h3>
                  <div className="space-y-2">
                    {item.replies.length > 0 ? (
                      item.replies.map((reply, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-3 rounded-md border text-sm"
                        >
                          <p>
                            <strong>{reply.sender}:</strong> {reply.content}
                          </p>
                          <p className="text-gray-400 text-xs">{reply.time}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No replies yet.</p>
                    )}
                  </div>

                  {/* Add Reply */}
                  <div className="mt-4">
                    <textarea
                      rows="2"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your reply..."
                    ></textarea>
                    <button
                      onClick={() => addReply(item.id)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
