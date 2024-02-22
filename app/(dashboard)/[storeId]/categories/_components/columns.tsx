"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { getBillboardById } from "@/data/billboard-service";
import { useEffect, useState } from "react";
import BillboardName from "./billboard-name";

TimeAgo.addDefaultLocale(en);
//create a formatter

const timeAgo = new TimeAgo("en-US");

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Categories = {
  id: string;
  label: string;
  billboardLabel: string;
  createdAt: Date;
};

export const columns: ColumnDef<Categories>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "billboardLabel",
    header: async ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Billboard
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return <Actions id={row.original.id} />;
    },
  },
];
