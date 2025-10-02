import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Video, Download } from 'lucide-react';
import { mockCourses, mockAssignments } from '../data/mockData';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';

export default function CourseDetail() {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id);
  const courseAssignments = mockAssignments.filter((a) => a.courseId === id);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Курс не найден</h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700">
            Вернуться к курсам
          </Link>
        </div>
      </div>
    );
  }

  const modules = [
    {
      id: 1,
      title: 'Введение',
      lessons: [
        { id: 1, title: 'Обзор курса', type: 'video', duration: '15 мин' },
        { id: 2, title: 'Установка инструментов', type: 'video', duration: '20 мин' },
      ],
    },
    {
      id: 2,
      title: 'Основы',
      lessons: [
        { id: 3, title: 'Основные концепции', type: 'video', duration: '30 мин' },
        { id: 4, title: 'Практические примеры', type: 'video', duration: '25 мин' },
        { id: 5, title: 'Материалы для чтения', type: 'document', duration: '10 мин' },
      ],
    },
    {
      id: 3,
      title: 'Продвинутые темы',
      lessons: [
        { id: 6, title: 'Сложные сценарии', type: 'video', duration: '40 мин' },
        { id: 7, title: 'Лучшие практики', type: 'video', duration: '30 мин' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-apple-lg shadow-apple overflow-hidden border border-gray-100"
      >
        <div
          className="h-36 p-6 flex flex-col justify-between text-white"
          style={{
            background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}dd 100%)`,
          }}
        >
          <Link
            to="/courses"
            className="inline-flex items-center text-white hover:text-gray-100 transition-all w-fit active:scale-95 font-medium text-[15px]"
          >
            <ArrowLeft size={18} className="mr-2" strokeWidth={2.5} />
            Назад к курсам
          </Link>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{course.name}</h1>
            <p className="text-white/90 mt-1 text-[15px]">{course.code}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4 text-[15px]">{course.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <p className="text-[13px] text-gray-600 mb-1.5 font-medium">Преподаватель</p>
              <p className="font-semibold text-gray-900 text-[15px]">{course.instructor}</p>
            </div>
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <p className="text-[13px] text-gray-600 mb-1.5 font-medium">Расписание</p>
              <p className="font-semibold text-gray-900 text-[15px]">{course.schedule}</p>
            </div>
            <div className="bg-gray-50 rounded-apple p-4 border border-gray-100">
              <p className="text-[13px] text-gray-600 mb-1.5 font-medium">Прогресс</p>
              <p className="font-semibold text-gray-900 text-[15px]">{course.progress}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <PageContainer width="default" className="!space-y-0">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Materials */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 card p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Материалы курса</h2>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-apple overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-[15px]">
                      Модуль {module.id}: {module.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-all text-left active:scale-[0.99]"
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.type === 'video' ? (
                            <Video size={18} className="text-primary-500" strokeWidth={2} />
                          ) : (
                            <FileText size={18} className="text-primary-500" strokeWidth={2} />
                          )}
                          <span className="text-gray-900 text-[15px]">{lesson.title}</span>
                        </div>
                        <span className="text-[13px] text-gray-500 font-medium">{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card padding="md">
              {/* Progress */}
              <div className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 text-[17px]">Ваш прогресс</h3>
                <div className="mb-4">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.color,
                      }}
                    />
                  </div>
                  <p className="text-center text-2xl font-semibold text-gray-900 mt-3">
                    {course.progress}%
                  </p>
                </div>
                <p className="text-[14px] text-gray-600 text-center">
                  {course.progress === 100 ? 'Курс завершен!' : 'Продолжайте в том же духе!'}
                </p>
              </div>
            </Card>
            <Card padding="md">
              {/* Assignments */}
              <div className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 text-[17px]">Задания</h3>
                {courseAssignments.length > 0 ? (
                  <div className="space-y-3">
                    {courseAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="p-3 rounded-apple border border-gray-200 hover:border-primary-300 transition-all hover:shadow-apple"
                      >
                        <h4 className="font-semibold text-gray-900 text-[14px] mb-1.5">
                          {assignment.title}
                        </h4>
                        <div className="flex items-center justify-between text-[12px]">
                          <span
                            className={`px-2 py-1 rounded-full font-semibold ${
                              assignment.status === 'pending'
                                ? 'bg-orange-100 text-orange-700'
                                : assignment.status === 'submitted'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {assignment.status === 'pending'
                              ? 'В ожидании'
                              : assignment.status === 'submitted'
                              ? 'Сдано'
                              : 'Оценено'}
                          </span>
                          <span className="text-gray-500">
                            {new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">Нет заданий</p>
                )}
              </div>
            </Card>
            <Card padding="md" hover>
              {/* Resources */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">Ресурсы</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Download size={20} className="text-primary-600" />
                    <span className="text-gray-800">Программа курса</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Download size={20} className="text-primary-600" />
                    <span className="text-gray-800">Дополнительные материалы</span>
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </PageContainer>
    </motion.div>
  );
}
