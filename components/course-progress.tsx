interface CourseProgressProps {
    value: number
    variant?: "success" | "warning" | "danger"
    size?: "default"
}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
}

const sizeByVariant ={
    default: "text-sm",
    sm: "text-xs"
}


const CourseProgress = ({
    value,
    variant,
    size,
}: CourseProgressProps) => {
  return (
    <div>course-progress</div>
  )
}

export default CourseProgress;