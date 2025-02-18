'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Author, Project } from '@prisma/client';
import { ChevronLeft, ChevronRight, Search, Slash } from 'lucide-react';
import { cn } from '@/lib/utils';
import DeleteProjectButton from '../form/DeleteProjectButton';

const ProjectsTable = ({
  projects,
}: {
  projects: (Project & { Author: Author | null })[];
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchStr = `${project.title} ${project.year}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [projects, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2 sm:gap-8 items-center">
        <div className="flex items-center border-b border-neutral px-3 grow self-stretch">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Search projects..."
            className={cn(
              'flex h-10 w-full bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
              'placeholder:text-neutral '
            )}
          />
        </div>
        <div className="hidden sm:flex items-center">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            variant="ghost"
          >
            <ChevronLeft />
          </Button>
          <p className="text-sm text-white-darker mx-3 text-nowrap">
            <span className="align-super">{page}</span>
            <Slash size={20} strokeWidth={1} className="inline-block -mx-0.5" />
            <span className="align-sub">{totalPages}</span>
          </p>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            variant="ghost"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-neutral">
            <TableHead className="w-[48px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[64px]">Year</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Path</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProjects.map((project) => (
            <TableRow key={project.id} className="border-neutral-darker">
              <TableCell className="text-info">{project.id}</TableCell>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="text-neutral-lighter">
                {project.year}
              </TableCell>
              <TableCell className="text-neutral-lighter">
                {project.Author
                  ? project.Author.fname + ' ' + project.Author.sname
                  : 'undefined'}
              </TableCell>
              <TableCell className="text-neutral-lighter">
                {project.path}
              </TableCell>
              <TableCell className="text-right">
                <DeleteProjectButton projectId={project.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex sm:hidden items-center justify-center mt-4">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          variant="ghost"
        >
          <ChevronLeft />
        </Button>
        <p className="text-sm text-white-darker mx-3 text-nowrap">
          <span className="align-super">{page}</span>
          <Slash size={20} strokeWidth={1} className="inline-block -mx-0.5" />
          <span className="align-sub">{totalPages}</span>
        </p>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          variant="ghost"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ProjectsTable;
