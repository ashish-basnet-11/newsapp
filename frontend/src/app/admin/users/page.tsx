"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconDots, IconTrash, IconUserEdit } from "@tabler/icons-react";
import api from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "editor" | "author";
  createdAt: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth");
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin": return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none uppercase text-[10px]">Admin</Badge>;
      case "editor": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none uppercase text-[10px]">Editor</Badge>;
      case "author": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none uppercase text-[10px]">Author</Badge>;
      default: return <Badge variant="secondary" className="uppercase text-[10px]">User</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground text-sm">Manage your staff roles and view platform users.</p>
        </div>
        <Button className="rounded-full">Add New User</Button>
      </div>

      <div className="border rounded-xl bg-white dark:bg-black overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50 dark:bg-gray-900/50">
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-10">Loading users...</TableCell></TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="size-9 border">
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="size-8 rounded-full">
                        <IconUserEdit className="size-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-red-50 hover:text-red-600">
                        <IconTrash className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;