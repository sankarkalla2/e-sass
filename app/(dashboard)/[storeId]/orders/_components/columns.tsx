"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

TimeAgo.addDefaultLocale(en);
//create a formatter

const timeAgo = new TimeAgo("en-US");

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Orders = {
  id: string;
  orderId: string;
  createdAt: Date;
  phone: string;
  address: string;
  isPaid: boolean;
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OrderId
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isPaid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const content = row.original.isPaid === true ? "Paid" : "Pending";
      console.log(row.original.isPaid);
      return <div>{content}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{timeAgo.format(row.original.createdAt.getTime())}</div>;
    },
  },
];
