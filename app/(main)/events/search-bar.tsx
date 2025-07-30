import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface SearchBarProps {
  onDebouncedChange: (value: string) => void;
}

export default function SearchBar({ onDebouncedChange }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 300)

  useEffect(() => {
    onDebouncedChange(debouncedInput);
  }, [debouncedInput, onDebouncedChange]);

  return (
    <div className="mb-8">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search event name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12"
        />
      </div>
    </div>
  )
}