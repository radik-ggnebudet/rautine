import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { mockGrades, mockCourses } from '../data/mockData';

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
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Оценки</h1>
        <p className="text-gray-600">Ваши академические результаты</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <BarChart3 className="mb-3" size={32} />
          <h3 className="text-4xl font-bold mb-2">{averageGrade.toFixed(1)}%</h3>
          <p className="text-green-100">Средний балл</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <TrendingUp className="mb-3" size={32} />
          <h3 className="text-4xl font-bold mb-2">{mockGrades.length}</h3>
          <p className="text-blue-100">Всего оценок</p>
        </motion.div>
      </div>

      {/* Course Grades */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Оценки по курсам</h2>
        <div className="space-y-6">
          {courseGrades.map((course) => (
            <div key={course.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">
                    {course.average > 0 ? course.average.toFixed(1) : '-'}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {course.gradesCount} {course.gradesCount === 1 ? 'оценка' : 'оценок'}
                  </p>
                </div>
              </div>
              {course.average > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
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
      </motion.div>

      {/* Recent Grades */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Последние оценки</h2>
        <div className="space-y-4">
          {mockGrades.map((grade) => (
            <motion.div
              key={grade.id}
              variants={itemVariants}
              className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{grade.assignmentName}</h3>
                <p className="text-sm text-gray-600">{grade.courseName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(grade.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">
                  {grade.grade}
                  <span className="text-lg text-gray-500">/{grade.maxGrade}</span>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    (grade.grade / grade.maxGrade) * 100 >= 90
                      ? 'text-green-600'
                      : (grade.grade / grade.maxGrade) * 100 >= 75
                      ? 'text-blue-600'
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
      </motion.div>
    </div>
  );
}
