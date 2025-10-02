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
      className="space-y-8"
    >
      {/* Profile Header */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-apple-lg shadow-apple overflow-hidden border border-gray-100"
      >
        <div className="h-28 bg-gradient-to-r from-primary-500 to-primary-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-14 mb-4">
            <div className="flex items-end space-x-4">
              <div className="w-28 h-28 bg-white rounded-apple-lg shadow-apple-lg flex items-center justify-center border-4 border-white">
                <User size={56} className="text-primary-500" strokeWidth={2} />
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">{mockStudent.name}</h1>
                <p className="text-[15px] text-gray-600 mt-0.5">{mockStudent.studentId}</p>
              </div>
            </div>
            <button className="mt-4 md:mt-0 md:mb-2 flex items-center space-x-2 px-4 py-2.5 bg-primary-500 text-white rounded-apple hover:bg-primary-600 transition-all shadow-apple active:scale-95 font-medium text-[15px]">
              <Edit size={17} />
              <span>Редактировать профиль</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <div className="flex items-center text-gray-600 mb-1.5">
                <Mail size={16} className="mr-2" />
                <span className="text-[13px] font-medium">Email</span>
              </div>
              <p className="font-semibold text-gray-900 text-[15px]">{mockStudent.email}</p>
            </div>
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <div className="flex items-center text-gray-600 mb-1.5">
                <BookOpen size={16} className="mr-2" />
                <span className="text-[13px] font-medium">Программа</span>
              </div>
              <p className="font-semibold text-gray-900 text-[15px]">{mockStudent.program}</p>
            </div>
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <div className="flex items-center text-gray-600 mb-1.5">
                <Calendar size={16} className="mr-2" />
                <span className="text-[13px] font-medium">Год обучения</span>
              </div>
              <p className="font-semibold text-gray-900 text-[15px]">{mockStudent.year} курс</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <Award className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{mockStudent.gpa}</h3>
          <p className="text-[13px] text-white/80 font-medium">GPA</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <BookOpen className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{mockCourses.length}</h3>
          <p className="text-[13px] text-white/80 font-medium">Всего курсов</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <BookOpen className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{completedCourses}</h3>
          <p className="text-[13px] text-white/80 font-medium">Завершено</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
        >
          <BookOpen className="mb-3 opacity-90" size={28} strokeWidth={2} />
          <h3 className="text-3xl font-semibold mb-1">{inProgressCourses}</h3>
          <p className="text-[13px] text-white/80 font-medium">В процессе</p>
        </motion.div>
      </div>

      {/* Academic Information */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Академическая информация</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-[17px]">Текущие курсы</h3>
            <div className="space-y-2">
              {mockCourses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3 rounded-apple border border-gray-200 hover:border-primary-300 transition-all hover:shadow-apple"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-[15px]">{course.name}</p>
                      <p className="text-[13px] text-gray-600">{course.code}</p>
                    </div>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-700">
                    {course.progress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-[17px]">Достижения</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-apple bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-yellow-600" size={22} strokeWidth={2} />
                  <div>
                    <p className="font-semibold text-gray-900 text-[15px]">Отличник</p>
                    <p className="text-[13px] text-gray-600">GPA выше 4.0</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-apple bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-blue-600" size={22} strokeWidth={2} />
                  <div>
                    <p className="font-semibold text-gray-900 text-[15px]">Активный студент</p>
                    <p className="text-[13px] text-gray-600">Все задания сданы вовремя</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-apple bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-green-600" size={22} strokeWidth={2} />
                  <div>
                    <p className="font-semibold text-gray-900 text-[15px]">Быстрый старт</p>
                    <p className="text-[13px] text-gray-600">Завершен первый курс</p>
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
        className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Настройки</h2>
        <div className="space-y-3">
          <button className="w-full md:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-apple transition-all font-medium text-[15px] active:scale-95">
            Изменить пароль
          </button>
          <button className="w-full md:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-apple transition-all font-medium text-[15px] ml-0 md:ml-3 active:scale-95">
            Уведомления
          </button>
          <button className="w-full md:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-apple transition-all font-medium text-[15px] ml-0 md:ml-3 active:scale-95">
            Конфиденциальность
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
