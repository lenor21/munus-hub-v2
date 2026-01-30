"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function ProjectFilters({
  users,
}: {
  users: { id: string; name?: string; email: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all-status" && value !== "all-members") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="grid mt-10 grid-rows-2 grid-cols-2 gap-2 md:grid-rows-1 md:grid-cols-4">
      <div className="relative col-span-2">
        <Search className="absolute top-[50%] left-2 translate-y-[-50%] h-5" />
        <Input
          type="text"
          placeholder="Search projects"
          className="bg-white pl-10"
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => handleFilter("q", e.target.value)}
        />
      </div>

      <Select
        defaultValue={searchParams.get("status") || "all-status"}
        onValueChange={(val) => handleFilter("status", val)}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all-status">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("memberId") || "all-members"}
        onValueChange={(val) => handleFilter("memberId", val)}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select a member" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="all-members">All members</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name || user.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
