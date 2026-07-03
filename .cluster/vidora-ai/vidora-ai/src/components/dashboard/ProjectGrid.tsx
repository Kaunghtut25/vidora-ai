'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Film } from 'lucide-react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onCreateNew?: () => void;
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function ProjectGrid({
  projects,
  onProjectClick,
  onCreateNew,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
          <Film size={36} className="text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
        <p className="text-gray-500 mb-8 max-w-sm">
          Create your first AI-powered video and bring your ideas to life.
        </p>
        {onCreateNew && (
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <PlusCircle size={18} />
            Create your first video
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
