'use client';

import { Film, MoreHorizontal, Play } from 'lucide-react';
import { Project } from '@/types';
import { voices } from '@/data/voices';
import { formatDate, cn } from '@/lib/utils';
import { projectThumbnails, projectGradients } from '@/data/thumbnails';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const statusConfig: Record<
  Project['status'],
  { label: string; className: string }
> = {
  completed: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  generating: { label: 'Generating', className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  editing: { label: 'Editing', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  draft: { label: 'Draft', className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  researching: { label: 'Researching', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  failed: { label: 'Failed', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const voice = voices.find((v) => v.id === project.voice?.voiceId);
  const status = statusConfig[project.status];
  const lengthLabel = (project.videoLength ?? 0) >= 50 ? '50+ min' : `${project.videoLength ?? 0} min`;

  return (
    <div
      onClick={onClick}
      className={cn(
        'glass rounded-xl p-5 cursor-pointer transition-all duration-200',
        'hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-lg',
        'group'
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
        {projectThumbnails[project.id] ? (
          <div className="w-full h-full">{projectThumbnails[project.id]}</div>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${projectGradients[project.id] || 'from-purple-600/20 via-cyan-500/10 to-gray-900'} flex items-center justify-center`}>
            <Film size={36} className="text-white/30" />
          </div>
        )}
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Status badge over thumbnail */}
        <span
          className={cn(
            'absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border',
            status.className,
            project.status === 'generating' && 'animate-pulse'
          )}
        >
          {status.label}
        </span>

        {/* More button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 left-3 p-1.5 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-white"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-white truncate mb-2">{project.title}</h3>

      {/* Meta row */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span>{lengthLabel}</span>
        <span className="w-1 h-1 rounded-full bg-gray-600" />
        <span>{voice?.name ?? project.voice?.voiceId ?? 'Default'}</span>
        <span className="w-1 h-1 rounded-full bg-gray-600" />
        <span>{project.language}</span>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-600">
        Created {formatDate(project.createdAt)}
      </p>
    </div>
  );
}
