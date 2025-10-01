import { motion } from 'framer-motion';
import { BookOpen, FileText, BarChart3, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCourses, mockAssignments, mockStudent } from '../data/mockData';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

export default function Dashboard() {
  const upcomingAssignments = mockAssignments
    .filter((a) => a.status === 'pending')
    .slice(0, 3);

  const averageProgress =
    mockCourses.reduce((sum, course) => sum + course.progress, 0) /
    mockCourses.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Добро пожаловать, {mockStudent.name}!
        </h1>
        <p className="text-gray-600">
          {mockStudent.program} · Курс {mockStudent.year} · GPA: {mockStudent.gpa}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BookOpen className="mb-3" size={32} />
          <h3 className="text-2xl font-bold">{mockCourses.length}</h3>
          <p className="text-blue-100">Активных курсов</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <FileText className="mb-3" size={32} />
          <h3 className="text-2xl font-bold">
            {mockAssignments.filter((a) => a.status === 'pending').length}
          </h3>
          <p className="text-purple-100">Текущих заданий</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BarChart3 className="mb-3" size={32} />
          <h3 className="text-2xl font-bold">{averageProgress.toFixed(0)}%</h3>
          <p className="text-green-100">Средний прогресс</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <Clock className="mb-3" size={32} />
          <h3 className="text-2xl font-bold">{upcomingAssignments.length}</h3>
          <p className="text-orange-100">Предстоящие дедлайны</p>
        </motion.div>
      </div>

      {/* Courses and Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Мои курсы</h2>
            <Link
              to="/courses"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Все курсы →
            </Link>
          </div>
          <div className="space-y-4">
            {mockCourses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block p-4 rounded-xl border-2 border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <h3 className="font-semibold text-gray-800">{course.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{course.code}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{course.progress}% завершено</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Assignments */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Предстоящие задания</h2>
            <Link
              to="/assignments"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Все задания →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{assignment.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{assignment.courseName}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Срок сдачи:</span>
                  <span className="text-orange-600 font-medium">
                    {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
