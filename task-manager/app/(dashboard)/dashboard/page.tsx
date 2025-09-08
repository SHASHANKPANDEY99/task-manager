import Navbar from "components/Navbar";
import TaskForm from "components/TaskForm";
import TaskList from "components/TaskList";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <TaskForm />
        <TaskList />
      </div>
    </main>
  );
}
