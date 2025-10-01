import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Calendar, Award, Edit } from 'lucide-react';
import { mockStudent, mockCourses } from '../data/mockData';

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

export default function Profile() {
  const completedCourses = mockCourses.filter((c) => c.progress === 100).length;
  const inProgressCourses = mockCourses.filter(
    (c) => c.progress > 0 && c.progress < 100
  ).length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-4">
            <div className="flex items-end space-x-4">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                <User size={64} className="text-primary-600" />
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-800">{mockStudent.name}</h1>
                <p className="text-gray-600">{mockStudent.studentId}</p>
              </div>
            </div>
            <button className="mt-4 md:mt-0 md:mb-2 flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md">
              <Edit size={18} />
              <span>Редактировать профиль</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <Mail size={18} className="mr-2" />
                <span className="text-sm">Email</span>
              </div>
              <p className="font-semibold text-gray-800">{mockStudent.email}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <BookOpen size={18} className="mr-2" />
                <span className="text-sm">Программа</span>
              </div>
              <p className="font-semibold text-gray-800">{mockStudent.program}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar size={18} className="mr-2" />
                <span className="text-sm">Год обучения</span>
              </div>
              <p className="font-semibold text-gray-800">{mockStudent.year} курс</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <Award className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">{mockStudent.gpa}</h3>
          <p className="text-blue-100">GPA</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BookOpen className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">{mockCourses.length}</h3>
          <p className="text-green-100">Всего курсов</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BookOpen className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">{completedCourses}</h3>
          <p className="text-purple-100">Завершено</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BookOpen className="mb-3" size={32} />
          <h3 className="text-3xl font-bold mb-1">{inProgressCourses}</h3>
          <p className="text-orange-100">В процессе</p>
        </motion.div>
      </div>

      {/* Academic Information */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Академическая информация</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Текущие курсы</h3>
            <div className="space-y-2">
              {mockCourses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{course.name}</p>
                      <p className="text-sm text-gray-600">{course.code}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {course.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Достижения</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-yellow-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Отличник</p>
                    <p className="text-sm text-gray-600">GPA выше 4.0</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Активный студент</p>
                    <p className="text-sm text-gray-600">Все задания сданы вовремя</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Быстрый старт</p>
                    <p className="text-sm text-gray-600">Завершен первый курс</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Настройки</h2>
        <div className="space-y-4">
          <button className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium">
            Изменить пароль
          </button>
          <button className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium ml-0 md:ml-3">
            Уведомления
          </button>
          <button className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium ml-0 md:ml-3">
            Конфиденциальность
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
