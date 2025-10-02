import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { mockGrades, mockCourses } from '../data/mockData';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

export default function Grades() {
  const averageGrade =
    mockGrades.reduce((sum, grade) => sum + (grade.grade / grade.maxGrade) * 100, 0) /
    mockGrades.length;

  const courseGrades = mockCourses.map((course) => {
    const grades = mockGrades.filter((g) => g.courseId === course.id);
    const avg = grades.length
      ? grades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / grades.length
      : 0;
    return {
      ...course,
      average: avg,
      gradesCount: grades.length,
    };
  });

  return (
    <PageContainer>
      <div className="space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card hover padding="lg">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">Оценки</h1>
            <p className="text-[15px] text-gray-600">Ваши академические результаты</p>
          </Card>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
          >
            <BarChart3 className="mb-3 opacity-90" size={28} strokeWidth={2} />
            <h3 className="text-4xl font-semibold mb-2">{averageGrade.toFixed(1)}%</h3>
            <p className="text-[13px] text-white/80 font-medium">Средний балл</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-apple-lg shadow-apple-lg p-6 text-white"
          >
            <TrendingUp className="mb-3 opacity-90" size={28} strokeWidth={2} />
            <h3 className="text-4xl font-semibold mb-2">{mockGrades.length}</h3>
            <p className="text-[13px] text-white/80 font-medium">Всего оценок</p>
          </motion.div>
        </div>

        {/* Course Grades */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card padding="md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Оценки по курсам</h2>
            <div className="space-y-6">
              {courseGrades.map((course) => (
                <div key={course.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: course.color }}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-[15px]">{course.name}</h3>
                        <p className="text-[13px] text-gray-600">{course.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-gray-900">
                        {course.average > 0 ? course.average.toFixed(1) : '-'}%
                      </p>
                      <p className="text-[13px] text-gray-600">
                        {course.gradesCount} {course.gradesCount === 1 ? 'оценка' : 'оценок'}
                      </p>
                    </div>
                  </div>
                  {course.average > 0 && (
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: course.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.average}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Grades */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card padding="md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Последние оценки</h2>
            <div className="space-y-3">
              {mockGrades.map((grade) => (
                <motion.div
                  key={grade.id}
                  variants={itemVariants}
                  className="flex items-center justify-between p-4 rounded-apple border border-gray-200 hover:border-primary-300 hover:shadow-apple transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-[15px]">{grade.assignmentName}</h3>
                    <p className="text-[13px] text-gray-600">{grade.courseName}</p>
                    <p className="text-[12px] text-gray-500 mt-1">
                      {new Date(grade.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold text-gray-900">
                      {grade.grade}
                      <span className="text-lg text-gray-500">/{grade.maxGrade}</span>
                    </div>
                    <div
                      className={`text-[13px] font-semibold ${
                        (grade.grade / grade.maxGrade) * 100 >= 90
                          ? 'text-green-600'
                          : (grade.grade / grade.maxGrade) * 100 >= 75
                          ? 'text-primary-600'
                          : (grade.grade / grade.maxGrade) * 100 >= 60
                          ? 'text-orange-600'
                          : 'text-red-600'
                      }`}
                    >
                      {((grade.grade / grade.maxGrade) * 100).toFixed(0)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </PageContainer>
  );
}
