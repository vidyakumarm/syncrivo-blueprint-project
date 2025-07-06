import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';

export interface JobFilters {
  search: string;
  department: string;
  location: string;
  country: string;
  type: string;
  level: string;
  remoteOnly: boolean;
  salaryMin: number;
  salaryMax: number;
  datePosted: string;
  skills: string[];
  companySize: string;
}

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  departments: string[];
  locations: string[];
  countries: string[];
  types: string[];
  levels: string[];
  availableSkills: string[];
}

export function JobFilters({ 
  filters, 
  onFiltersChange, 
  departments, 
  locations, 
  countries,
  types, 
  levels,
  availableSkills
}: JobFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof JobFilters, value: string | boolean | number | string[]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      department: '',
      location: '',
      country: '',
      type: '',
      level: '',
      remoteOnly: false,
      salaryMin: 0,
      salaryMax: 500000,
      datePosted: '',
      skills: [],
      companySize: '',
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'salaryMin' && value > 0) return true;
    if (key === 'salaryMax' && value < 500000) return true;
    if (key === 'skills' && Array.isArray(value) && value.length > 0) return true;
    return value !== '' && value !== false && value !== 0;
  }).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, description, or skills..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.department && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.department}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('department', '')}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.location}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('location', '')}
              />
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.type.replace('-', ' ')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('type', '')}
              />
            </Badge>
          )}
          {filters.level && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.level}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('level', '')}
              />
            </Badge>
          )}
          {filters.country && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.country}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('country', '')}
              />
            </Badge>
          )}
          {filters.remoteOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Remote Only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('remoteOnly', false)}
              />
            </Badge>
          )}
          {filters.skills.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.skills.length} skill{filters.skills.length > 1 ? 's' : ''}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('skills', [])}
              />
            </Badge>
          )}
          {(filters.salaryMin > 0 || filters.salaryMax < 500000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${filters.salaryMin/1000}K - ${filters.salaryMax/1000}K
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  updateFilter('salaryMin', 0);
                  updateFilter('salaryMax', 500000);
                }}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="p-6">
          <div className="space-y-6">
            {/* First Row - Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Department</label>
                <Select value={filters.department || "all"} onValueChange={(value) => updateFilter('department', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={filters.location || "all"} onValueChange={(value) => updateFilter('location', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <Select value={filters.country || "all"} onValueChange={(value) => updateFilter('country', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Job Type</label>
                <Select value={filters.type || "all"} onValueChange={(value) => updateFilter('type', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <Select value={filters.level || "all"} onValueChange={(value) => updateFilter('level', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date Posted</label>
                <Select value={filters.datePosted || "all"} onValueChange={(value) => updateFilter('datePosted', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="1">Past 24 hours</SelectItem>
                    <SelectItem value="3">Past 3 days</SelectItem>
                    <SelectItem value="7">Past week</SelectItem>
                    <SelectItem value="30">Past month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Company Size</label>
                <Select value={filters.companySize || "all"} onValueChange={(value) => updateFilter('companySize', value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any size</SelectItem>
                    <SelectItem value="startup">Startup (1-50)</SelectItem>
                    <SelectItem value="medium">Medium (51-500)</SelectItem>
                    <SelectItem value="large">Large (500+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Salary Range: ${(filters.salaryMin / 1000).toFixed(0)}K - ${(filters.salaryMax / 1000).toFixed(0)}K
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="number"
                    placeholder="Min salary"
                    value={filters.salaryMin || ''}
                    onChange={(e) => updateFilter('salaryMin', parseInt(e.target.value) || 0)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max salary"
                    value={filters.salaryMax === 500000 ? '' : filters.salaryMax}
                    onChange={(e) => updateFilter('salaryMax', parseInt(e.target.value) || 500000)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-medium mb-2 block">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {availableSkills.slice(0, 15).map((skill) => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      const newSkills = filters.skills.includes(skill)
                        ? filters.skills.filter(s => s !== skill)
                        : [...filters.skills, skill];
                      updateFilter('skills', newSkills);
                    }}
                  >
                    {skill}
                    {filters.skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.remoteOnly}
                  onChange={(e) => updateFilter('remoteOnly', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm">Remote positions only</span>
              </label>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}