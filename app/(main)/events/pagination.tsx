import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
      >
        Previous
      </Button>

      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1
          if (page === currentPage || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
                }
              >
                {page}
              </Button>
            )
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="text-slate-400 px-2">
                ...
              </span>
            )
          }
          return null
        })}
      </div>

      <Button
        variant="outline"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent cursor-pointer"
      >
        Next
      </Button>
    </div>
  )
}