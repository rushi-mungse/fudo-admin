"use client";

import React from "react";
import { Drawer } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth";
import { Loader } from "../loader";

interface ShowUserProps {
  userId: string;
  open: boolean;
  closeUserDrawer: () => void;
}

export const ShowUser = ({ userId, closeUserDrawer, open }: ShowUserProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => getUser(userId),
  });

  return (
    <>
      <Drawer
        title={<h1 className="text-active">User Id : {userId}</h1>}
        onClose={closeUserDrawer}
        open={open}
        width={600}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <h1>User</h1>
        )}
      </Drawer>
    </>
  );
};
