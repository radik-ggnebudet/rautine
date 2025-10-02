import { motion } from 'framer-motion';
import { BookOpen, FileText, BarChart3, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCourses, mockAssignments, mockStudent } from '../data/mockData';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';

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
    <PageContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card hover padding="lg" className="relative overflow-hidden">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
              Добро пожаловать, {mockStudent.name}!
            </h1>
            <p className="text-[15px] text-gray-600 dark:text-gray-300">
              {mockStudent.program} · Курс {mockStudent.year} · GPA: {mockStudent.gpa}
            </p>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div variants={itemVariants}>
            <StatCard icon={<BookOpen size={28} strokeWidth={2} />} value={mockCourses.length} label="Активных курсов" gradient="blue" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<FileText size={28} strokeWidth={2} />} value={mockAssignments.filter(a=>a.status==='pending').length} label="Текущих заданий" gradient="purple" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<BarChart3 size={28} strokeWidth={2} />} value={`${averageProgress.toFixed(0)}%`} label="Средний прогресс" gradient="green" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<Clock size={28} strokeWidth={2} />} value={upcomingAssignments.length} label="Предстоящие дедлайны" gradient="orange" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card hover padding="lg">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Мои курсы</h2>
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
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-[15px]">{course.name}</h3>
                    </div>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-3">{course.code}</p>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1.5 font-medium">{course.progress}% завершено</p>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card hover padding="lg">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Предстоящие задания</h2>
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
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-[15px]">{assignment.title}</h3>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-2.5">{assignment.courseName}</p>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-500">Срок сдачи:</span>
                      <span className="text-orange-600 font-semibold">
                        {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  );
}
