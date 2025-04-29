import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DownloadCardProps {
  title: string
  description: string
  fileName: string
}

export default function DownloadCard({ title, description, fileName }: DownloadCardProps) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription className="text-xs text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" asChild>
          <a href={`/files/${fileName}`} download>
            Descargar
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
