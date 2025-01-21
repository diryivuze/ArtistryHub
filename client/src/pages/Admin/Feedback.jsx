import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  ChevronDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  Calendar,
  Loader2,
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminFeedback = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFeedbackId, setActiveFeedbackId] = useState(null);
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      username: 'pendovestine',
      message: 'I love the platform! Can you add more features?',
      date: '2024-11-20',
      email: 'pendovestine@gmail.com',
      progress: 'pending',
      replies: [
        {
          sender: 'Admin',
          content: 'Thank you for your feedback! We will add more soon.',
          time: '2024-11-21 10:00 AM',
        },
      ],
    },
    {
      id: 2,
      username: 'louechristian',
      message: 'The app is great, but I found a bug.',
      date: '2024-11-21',
      email: 'louechristianh@gmail.com',
      progress: 'in-progress',
      replies: [],
    },
  ]);
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressIcon = (progress) => {
    switch (progress) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const addReply = async (id) => {
    if (!newReply.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        userRole="admin"
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole="admin"
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            Manage Feedback
          </motion.h1>

          <div className="space-y-6">
            {feedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-200"
              >
                {/* Feedback Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-bold">{item.username}</h2>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-500 text-sm">{item.email}</p>
                  </div>
                </div>

                {/* Message and Date */}
                <div className="mb-4">
                  <p className="text-gray-700">{item.message}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-400 text-xs">{item.date}</p>
                  </div>
                </div>

                {/* Progress Badge */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Progress:
                  </label>
                  <div className="relative">
                    <select
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
                      className={`appearance-none ${getProgressColor(
                        item.progress
                      )} px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 pr-8 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer`}
                    >
                      <option value="pending">🕒 Pending</option>
                      <option value="in-progress">⚡ In Progress</option>
                      <option value="resolved">✅ Resolved</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Replies Section */}
                <div>
                  <button
                    onClick={() => setActiveFeedbackId(
                      activeFeedbackId === item.id ? null : item.id
                    )}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                  >
                    <motion.div
                      animate={{ rotate: activeFeedbackId === item.id ? 180 : 0 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                    Replies ({item.replies.length})
                  </button>

                  <AnimatePresence>
                    {activeFeedbackId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2">
                          {item.replies.length > 0 ? (
                            item.replies.map((reply, index) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="bg-gray-50 p-4 rounded-lg border text-sm"
                              >
                                <div className="flex items-start gap-2">
                                  <User className="w-4 h-4 mt-1 text-gray-400" />
                                  <div>
                                    <p>
                                      <strong>{reply.sender}:</strong>{" "}
                                      {reply.content}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                      {reply.time}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm italic">
                              No replies yet.
                            </p>
                          )}
                        </div>

                        {/* Reply Input */}
                        <div className="mt-4">
                          <div className="relative">
                            <textarea
                              rows="2"
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              className="w-full border rounded-lg p-3 pr-12 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              placeholder="Write your reply..."
                            />
                            <button
                              onClick={() => addReply(item.id)}
                              disabled={isSubmitting || !newReply.trim()}
                              className="absolute right-2 bottom-2 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-300 transition-colors"
                            >
                              {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Send className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;