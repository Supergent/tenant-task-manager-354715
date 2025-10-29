import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import "./globals.css"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "@/components/TaskCard"
import { TaskDialog } from "@/components/TaskDialog"
import { StatusFilter } from "@/components/StatusFilter"

export default function App() {
  const tasks = useQuery(api.endpoints.tasks.list)
  const deleteTask = useMutation(api.endpoints.tasks.remove)
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<{
    _id: Id<"tasks">
    title: string
    description?: string
    status: string
    dueDate?: number
  } | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const handleEdit = (task: {
    _id: Id<"tasks">
    title: string
    description?: string
    status: string
    dueDate?: number
  }) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }

  const handleDelete = async (taskId: Id<"tasks">) => {
    await deleteTask({ id: taskId })
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingTask(null)
  }

  // Filter tasks by status
  const filteredTasks = tasks?.filter((task) => {
    if (statusFilter === "all") return true
    return task.status === statusFilter
  }) || []

  // Sort by due date (overdue first, then by date)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return a.dueDate - b.dueDate
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <StatusFilter value={statusFilter} onChange={setStatusFilter} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {sortedTasks.length === 0 && (
          <div className="text-center text-muted-foreground mt-12">
            <p className="text-lg">No tasks found</p>
            <p className="text-sm mt-2">
              {statusFilter === "all"
                ? "Create your first task to get started"
                : `No tasks with status "${statusFilter}"`}
            </p>
          </div>
        )}

        <TaskDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          task={editingTask}
        />
      </div>
    </div>
  )
}
