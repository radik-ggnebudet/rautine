import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Calendar, Award, Edit } from 'lucide-react';
import { mockStudent, mockCourses } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { PageContainer } from '../components/layout/PageContainer';

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
    <PageContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="card overflow-hidden"
        >
          <div className="h-28 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-14 mb-4">
              <div className="flex items-end space-x-4">
                <div className="w-28 h-28 bg-white rounded-apple-lg shadow-apple-lg flex items-center justify-center border-4 border-white">
                  <User size={56} className="text-primary-500" strokeWidth={2} />
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-medium text-gray-900 tracking-tight">{mockStudent.name}</h1>
                  <p className="text-[15px] text-gray-600 mt-0.5">{mockStudent.studentId}</p>
                </div>
              </div>
              <button className="mt-4 md:mt-0 md:mb-2 flex items-center space-x-2 px-4 py-2.5 bg-primary-500 text-white rounded-apple hover:bg-primary-600 transition-all shadow-apple active:scale-95 font-normal text-[15px]">
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
                <p className="font-medium text-gray-900 text-[15px]">{mockStudent.email}</p>
              </div>
              <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
                <div className="flex items-center text-gray-600 mb-1.5">
                  <BookOpen size={16} className="mr-2" />
                  <span className="text-[13px] font-medium">Программа</span>
                </div>
                <p className="font-medium text-gray-900 text-[15px]">{mockStudent.program}</p>
              </div>
              <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
                <div className="flex items-center text-gray-600 mb-1.5">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-[13px] font-medium">Год обучения</span>
                </div>
                <p className="font-medium text-gray-900 text-[15px]">{mockStudent.year} курс</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div
            variants={itemVariants}
          >
            <StatCard gradient="blue" icon={<Award className="opacity-90" size={28} strokeWidth={2} />} value={mockStudent.gpa} label="GPA" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard gradient="green" icon={<BookOpen className="opacity-90" size={28} strokeWidth={2} />} value={mockCourses.length} label="Всего курсов" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard gradient="purple" icon={<BookOpen className="opacity-90" size={28} strokeWidth={2} />} value={completedCourses} label="Завершено" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard gradient="orange" icon={<BookOpen className="opacity-90" size={28} strokeWidth={2} />} value={inProgressCourses} label="В процессе" />
          </motion.div>
        </div>

        {/* Academic Information */}
        <motion.div
          variants={itemVariants}
          className="card p-6"
        >
          <h2 className="text-2xl font-medium text-gray-900 mb-6 tracking-tight">Академическая информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 text-[17px]">Текущие курсы</h3>
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
                        <p className="font-medium text-gray-900 text-[15px]">{course.name}</p>
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
              <h3 className="font-medium text-gray-900 mb-3 text-[17px]">Достижения</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-apple bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <Award className="text-yellow-600" size={22} strokeWidth={2} />
                    <div>
                      <p className="font-medium text-gray-900 text-[15px]">Отличник</p>
                      <p className="text-[13px] text-gray-600">GPA выше 4.0</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-apple bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Award className="text-blue-600" size={22} strokeWidth={2} />
                    <div>
                      <p className="font-medium text-gray-900 text-[15px]">Активный студент</p>
                      <p className="text-[13px] text-gray-600">Все задания сданы вовремя</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-apple bg-gradient-to-r from-green-100 to-green-50 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Award className="text-green-600" size={22} strokeWidth={2} />
                    <div>
                      <p className="font-medium text-gray-900 text-[15px]">Быстрый старт</p>
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
          className="card p-6"
        >
          <h2 className="text-2xl font-medium text-gray-900 mb-6 tracking-tight">Настройки</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Изменить пароль</Button>
            <Button variant="secondary">Уведомления</Button>
              <Button variant="secondary">Конфиденциальность</Button>
          </div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
