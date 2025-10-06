import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';

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
    <PageContainer>
      <div className="space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card hover padding="lg">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 tracking-tight">Мои курсы</h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-300 mt-2">
              Всего курсов: {mockCourses.length}
            </p>
          </Card>
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
                className="block card card-hover overflow-hidden group active:scale-[0.98] transition-transform"
              >
                <div
                  className="h-28 p-6 flex items-center justify-center text-white relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}dd 100%)`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <BookOpen size={40} className="relative z-10 opacity-95" strokeWidth={1.8} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{course.name}</h2>
                    <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                      {course.code}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                  <div className="space-y-2.5">
                    <div className="flex items-center text-[13px] text-gray-600 dark:text-gray-400">
                      <User size={15} className="mr-2" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center text-[13px] text-gray-600 dark:text-gray-400">
                      <Clock size={15} className="mr-2" />
                      {course.schedule}
                    </div>
                    <div>
                      <div className="flex justify-between text-[13px] mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">Прогресс</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                        <motion.div
                          className="h-1.5 rounded-full"
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
    </PageContainer>
  );
}
