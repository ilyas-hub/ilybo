import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui'
import type { LeadStatus } from '../types'

const statusOptions: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
]

interface LeadFiltersProps {
  status: LeadStatus | undefined
  onStatusChange: (status: LeadStatus | undefined) => void
}

export function LeadFilters({ status, onStatusChange }: LeadFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Select
        value={status || 'all'}
        onValueChange={(value) =>
          onStatusChange(value === 'all' ? undefined : (value as LeadStatus))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
