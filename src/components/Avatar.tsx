import Image from "next/image"

interface AvatarProps {
  image?: string | null
  name?: string | null
  size?: "sm" | "md" | "lg"
}

export function Avatar({ image, name, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"

  if (image) {
    return (
      <Image
        src={image}
        alt={name || "Avatar"}
        width={40}
        height={40}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold`}
    >
      {initials}
    </div>
  )
}
