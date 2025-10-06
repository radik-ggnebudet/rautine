import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Upload } from 'lucide-react';
import { mockAssignments } from '../data/mockData';
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

export default function Assignments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const filteredAssignments =
    filter === 'all'
      ? mockAssignments
      : mockAssignments.filter((a) => a.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'graded':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'В ожидании';
      case 'submitted':
        return 'Сдано';
      case 'graded':
        return 'Оценено';
      default:
        return status;
    }
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card hover padding="lg">
            <h1 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">Задания</h1>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Все' },
                { key: 'pending', label: 'В ожидании' },
                { key: 'submitted', label: 'Сданные' },
                { key: 'graded', label: 'Оцененные' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'all' | 'pending' | 'submitted' | 'graded')}
                  className={`px-4 py-2.5 rounded-apple font-normal transition-all text-[15px] ${
                    filter === tab.key
                      ? 'bg-primary-500 text-white shadow-apple'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredAssignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              variants={itemVariants}
              className="card card-hover overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3 mb-3">
                      <FileText className="text-primary-500 mt-0.5" size={22} strokeWidth={1.8} />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-primary-500 font-normal text-[15px]">{assignment.courseName}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-gray-600 mb-4">{assignment.description}</p>
                    <div className="flex flex-wrap gap-4 text-[14px]">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={15} className="mr-2" />
                        <span>
                          Срок: {new Date(assignment.dueDate).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {assignment.grade !== undefined && (
                        <div className="flex items-center font-medium text-green-600">
                          Оценка: {assignment.grade}/100
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <span
                      className={`px-4 py-2 rounded-apple border-2 font-medium text-[13px] ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {getStatusText(assignment.status)}
                    </span>
                    {assignment.status === 'pending' && (
                      <button className="flex items-center space-x-2 px-4 py-2.5 bg-primary-500 text-white rounded-apple hover:bg-primary-600 transition-all shadow-apple active:scale-95 text-[15px] font-normal">
                        <Upload size={17} />
                        <span>Сдать работу</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredAssignments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <FileText size={56} className="mx-auto text-gray-300 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Нет заданий</h3>
              <p className="text-[15px] text-gray-600">В этой категории пока нет заданий</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageContainer>
  );
}
