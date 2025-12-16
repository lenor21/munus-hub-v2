"use client";

import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ProjectCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex gap-x-2">
          <div>
            <p className="font-semibold text-lg mb-2">Ligala</p>
            <p className="text-muted-foreground text-sm line-clamp-2">
              Functions as a virtual law office, providing lawyers with
              comprehensive tools to
            </p>
          </div>
          <div className="flex gap-x-1">
            <Button variant="outline" className="">
              <SquarePen />
            </Button>
            <Button variant="outline" className="text-[#e7000b]">
              <Trash2 />
            </Button>
          </div>
        </div>
        <div>
          <Badge className="py-1 bg-[#f54a00]">In progress</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>90%</span>
          </div>
          <Progress value={90} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <span className="w-full text-sm font-medium text-end">$120,000</span>
      </CardFooter>
    </Card>
  );
}
