import { ProjectWithAuthor } from './types';

export function sortByYear(projects: ProjectWithAuthor[]): {
  [year: number]: ProjectWithAuthor[];
} {
  const sortedProjects: { [year: number]: ProjectWithAuthor[] } = {};

  // Group projects by year
  projects.forEach((project) => {
    const year = project.year;
    if (year == null) return;
    if (!sortedProjects[year]) {
      sortedProjects[year] = [];
    }
    sortedProjects[year].push(project);
  });

  // Get an array of years from the sortedProjects object
  const years = Object.keys(sortedProjects).map(Number);

  // Sort the years in ascending order
  years.sort((a, b) => b - a);

  // Create a new object with years sorted and projects grouped
  const sortedResult: { [year: number]: ProjectWithAuthor[] } = {};
  years.forEach((year) => {
    sortedResult[year] = sortedProjects[year];
  });

  return sortedResult;
}
