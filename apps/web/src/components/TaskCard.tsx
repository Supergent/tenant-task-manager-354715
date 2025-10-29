import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2 } from "lucide-react"
import { formatDate, isOverdue } from "@/lib/utils"
import { Id } from "@/convex/_generated/dataModel"

interface TaskCardProps {
  task: {
    _id: Id<"tasks">
    title: string
    description?: string
    status: string
    dueDate?: number
  }
  onEdit: (task: {
    _id: Id<"tasks">
    title: string
    description?: string
    status: string
    dueDate?: number
  }) => void
  onDelete: (taskId: Id<"tasks">) => void
}

const statusColors = {
  "To Do": "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "In Progress": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
  "Done": "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const overdue = isOverdue(task.dueDate)
  const statusColor = statusColors[task.status as keyof typeof statusColors] || "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <Badge className={statusColor}>{task.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <div className={`flex items-center gap-2 text-sm ${overdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
            <Calendar className="h-4 w-4" />
            <span>{formatDate(task.dueDate)}</span>
            {overdue && <span className="text-xs">(Overdue)</span>}
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(task)}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task._id)}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
