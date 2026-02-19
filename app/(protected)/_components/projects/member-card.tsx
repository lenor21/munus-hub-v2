"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Pencil,
  UserRoundX,
  MessageCircle,
  Mail,
  SquarePen,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { updateRole } from "@/actions/projects";
import { toast } from "sonner";
import { TeamMemberData } from "./team-members";
import { deleteMember } from "@/actions/projects/delete";

export function MemberCard({
  data,
  projectId,
}: {
  data: TeamMemberData;
  projectId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState(data.role);
  const [isOpen, setIsOpen] = useState(false);

  const handleOutlookSelection = (email: string) => {
    try {
      const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}`;

      window.open(outlookUrl, "_blank");
    } catch (error) {
      console.error("[v0] Error opening Outlook:", error);
      try {
        const mailtoUrl = `mailto:${email}`;
        window.location.href = mailtoUrl;
      } catch (fallbackError) {
        alert(`Failed to open email client for ${email}`);
      }
    }
  };

  const handleTeamsSelection = (email: string) => {
    try {
      const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;

      window.open(teamsUrl, "_blank");
    } catch (error) {
      console.error("[v0] Error opening Teams:", error);
      alert(`Failed to open Microsoft Teams for ${email}`);
    }
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateRole(projectId, data.user.id, role);

      if (result.success) {
        toast.success(result.success);
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleDeleteMember = (memberId: string, name: string) => {
    startTransition(() => {
      toast.warning(`Continue to remove ${name}?`, {
        action: {
          label: "Delete",
          onClick: () => {
            deleteMember(memberId).then((data) => {
              if (data.success) {
                toast.success(data.success);
              } else if (data.error) {
                toast.error(data.error);
              }
            });
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            toast.dismiss();
          },
        },
        duration: 10000,
        id: "delete-confirm",
      });
    });
  };

  return (
    <div className="p-4 border border-border rounded-lg col-span-1 w-full shadow-lg bg-white">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={data.user.image || ""} />
          <AvatarFallback>rd</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-[#171717]">{data.user.name}</h4>
          <p className="text-sm text-muted-foreground">{data.role}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-[#171717] hover:bg-[#e7000b] hover:text-white ease-linear"
            >
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-x-2">
                <MessageCircle className="h-5 w-5" />
                Contact {data.user.name}
              </DialogTitle>
              <DialogDescription className="text-start">
                Choose how you'd like to communicate with {data.user.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              <Button
                className="flex items-center gap-3 h-12 justify-start bg-transparent"
                variant="outline"
                onClick={() => handleOutlookSelection(data.user.email)}
              >
                <Mail className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Send Email via Outlook</div>
                  <div className="text-sm text-muted-foreground">
                    {data.user.email}
                  </div>
                </div>
              </Button>
              <Button
                className="flex items-center gap-3 h-12 justify-start bg-transparent"
                variant="outline"
                onClick={() => handleTeamsSelection(data.user.email)}
              >
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Chat via Microsoft Teams</div>
                  <div className="text-sm text-muted-foreground">
                    Start a conversation
                  </div>
                </div>
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-x-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-[#171717] hover:bg-[#e7000b] hover:text-white ease-linear"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <form onSubmit={handleUpdateRole}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-x-2">
                    <SquarePen className="h-5 w-5" />
                    Edit Team Member
                  </DialogTitle>
                  <DialogDescription>
                    Update the team member's information
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="py-4">
                  <Field>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={isPending}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isPending || role === data.role}
                  >
                    {isPending ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="icon"
            className="text-[#e7000b] hover:bg-[#e7000b] hover:text-white ease-linear"
            onClick={() =>
              handleDeleteMember(data.id, data.user.name || "Team Member")
            }
          >
            <UserRoundX className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
