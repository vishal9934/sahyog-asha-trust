'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Computer, Users, Heart, Shield, Home,
  TrendingUp, Briefcase, Sprout, Leaf, Plus, Scale,
  FileText, BookOpen, Activity, Droplets, DollarSign
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const goals = [
  { icon: GraduationCap, key: 'goal1', color: 'from-blue-500 to-blue-600' },
  { icon: Computer, key: 'goal2', color: 'from-purple-500 to-purple-600' },
  { icon: Users, key: 'goal3', color: 'from-pink-500 to-pink-600' },
  { icon: Heart, key: 'goal4', color: 'from-red-500 to-red-600' },
  { icon: Shield, key: 'goal5', color: 'from-orange-500 to-orange-600' },
  { icon: Home, key: 'goal6', color: 'from-yellow-500 to-yellow-600' },
  { icon: TrendingUp, key: 'goal7', color: 'from-green-500 to-green-600' },
  { icon: Briefcase, key: 'goal8', color: 'from-teal-500 to-teal-600' },
  { icon: Sprout, key: 'goal9', color: 'from-lime-500 to-lime-600' },
  { icon: Leaf, key: 'goal10', color: 'from-emerald-500 to-emerald-600' },
  { icon: Plus, key: 'goal11', color: 'from-cyan-500 to-cyan-600' },
  { icon: Scale, key: 'goal12', color: 'from-indigo-500 to-indigo-600' },
  { icon: FileText, key: 'goal13', color: 'from-violet-500 to-violet-600' },
  { icon: BookOpen, key: 'goal14', color: 'from-fuchsia-500 to-fuchsia-600' },
  { icon: Activity, key: 'goal15', color: 'from-rose-500 to-rose-600' },
  { icon: Droplets, key: 'goal16', color: 'from-sky-500 to-sky-600' },
  { icon: DollarSign, key: 'goal17', color: 'from-amber-500 to-amber-600' }
];

export default function TrustGoals() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="program" className="py-10 md:py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('trustGoalsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('trustGoalsSubtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-4"
        >
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.key}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-lg flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {t(goal.key)}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}