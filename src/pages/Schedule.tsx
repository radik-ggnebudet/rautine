import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { mockSchedule } from '../data/mockData';

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

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

export default function Schedule() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'lab':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'tutorial':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'exam':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Лекция';
      case 'lab':
        return 'Лабораторная';
      case 'tutorial':
        return 'Семинар';
      case 'exam':
        return 'Экзамен';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-apple-lg shadow-apple p-8 border border-gray-100"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">Расписание</h1>
        <p className="text-[15px] text-gray-600">Ваше еженедельное расписание занятий</p>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {days.map((day) => {
          const daySchedule = mockSchedule.filter((event) => event.day === day);
          
          return (
            <motion.div
              key={day}
              variants={itemVariants}
              className="bg-white rounded-apple-lg shadow-apple overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <Calendar className="mr-2" size={18} strokeWidth={2} />
                  {day}
                </h2>
              </div>
              <div className="p-4">
                {daySchedule.length > 0 ? (
                  <div className="space-y-3">
                    {daySchedule.map((event) => (
                      <div
                        key={event.id}
                        className="p-3.5 rounded-apple border border-gray-200 hover:border-primary-300 hover:shadow-apple transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 flex-1 text-[15px]">
                            {event.courseName}
                          </h3>
                          <span
                            className={`text-[11px] px-2 py-1 rounded-full border font-semibold ${getTypeColor(
                              event.type
                            )}`}
                          >
                            {getTypeText(event.type)}
                          </span>
                        </div>
                        <div className="space-y-1 text-[13px] text-gray-600">
                          <div className="flex items-center">
                            <Clock size={13} className="mr-2" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={13} className="mr-2" />
                            <span>{event.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Calendar size={44} className="mx-auto text-gray-300 mb-2" strokeWidth={1.5} />
                    <p className="text-[15px] text-gray-500">Нет занятий</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* All Events List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-apple-lg shadow-apple p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Все занятия</h2>
        <div className="space-y-3">
          {mockSchedule.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-apple border border-gray-200 hover:border-primary-300 hover:shadow-apple transition-all gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-[15px]">{event.courseName}</h3>
                  <span
                    className={`text-[11px] px-2 py-1 rounded-full border font-semibold ${getTypeColor(
                      event.type
                    )}`}
                  >
                    {getTypeText(event.type)}
                  </span>
                </div>
                <p className="text-[13px] text-gray-600">{event.day}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-[13px] text-gray-600">
                <div className="flex items-center">
                  <Clock size={15} className="mr-2" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin size={15} className="mr-2" />
                  <span>{event.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
