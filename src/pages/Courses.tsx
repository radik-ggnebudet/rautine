import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User } from 'lucide-react';
import { mockCourses } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

export default function Courses() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Мои курсы</h1>
        <p className="text-gray-600 mt-2">
          Всего курсов: {mockCourses.length}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {mockCourses.map((course) => (
          <motion.div key={course.id} variants={itemVariants}>
            <Link
              to={`/courses/${course.id}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              <div
                className="h-32 p-6 flex items-center justify-center text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}dd 100%)`,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <BookOpen size={48} className="relative z-10" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {course.code}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <User size={16} className="mr-2" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    {course.schedule}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Прогресс</span>
                      <span className="font-medium text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: course.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
