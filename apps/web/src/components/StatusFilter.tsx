import { Button } from "@/components/ui/button"

interface StatusFilterProps {
  value: string
  onChange: (status: string) => void
}

const statuses = [
  { value: "all", label: "All Tasks" },
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
]

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status.value}
          variant={value === status.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(status.value)}
        >
          {status.label}
        </Button>
      ))}
    </div>
  )
}
