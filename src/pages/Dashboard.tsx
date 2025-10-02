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
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-apple-lg shadow-apple p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
          Добро пожаловать, {mockStudent.name}!
        </h1>
        <p className="text-[15px] text-gray-600">
          {mockStudent.program} · Курс {mockStudent.year} · GPA: {mockStudent.gpa}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <BookOpen className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{mockCourses.length}</h3>
          <p className="text-[13px] text-white/80 font-medium">Активных курсов</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <FileText className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">
            {mockAssignments.filter((a) => a.status === 'pending').length}
          </h3>
          <p className="text-[13px] text-white/80 font-medium">Текущих заданий</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <BarChart3 className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{averageProgress.toFixed(0)}%</h3>
          <p className="text-[13px] text-white/80 font-medium">Средний прогресс</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <Clock className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{upcomingAssignments.length}</h3>
          <p className="text-[13px] text-white/80 font-medium">Предстоящие дедлайны</p>
        </motion.div>
      </div>

      {/* Courses and Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <motion.div variants={itemVariants} className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Мои курсы</h2>
            <Link
              to="/courses"
              className="text-primary-500 hover:text-primary-600 font-medium text-[15px] transition-colors active:scale-95"
            >
              Все курсы →
            </Link>
          </div>
          <div className="space-y-3">
            {mockCourses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block p-4 rounded-apple border border-gray-200 hover:border-primary-300 hover:shadow-apple transition-all active:scale-[0.98]"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <h3 className="font-semibold text-gray-900 text-[15px]">{course.name}</h3>
                </div>
                <p className="text-[13px] text-gray-600 mb-3">{course.code}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-primary-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-[12px] text-gray-500 mt-1.5 font-medium">{course.progress}% завершено</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Assignments */}
        <motion.div variants={itemVariants} className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Предстоящие задания</h2>
            <Link
              to="/assignments"
              className="text-primary-500 hover:text-primary-600 font-medium text-[15px] transition-colors active:scale-95"
            >
              Все задания →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-apple border border-gray-200 hover:border-orange-400 hover:shadow-apple transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1 text-[15px]">{assignment.title}</h3>
                <p className="text-[13px] text-gray-600 mb-2.5">{assignment.courseName}</p>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-gray-500">Срок сдачи:</span>
                  <span className="text-orange-600 font-semibold">
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
