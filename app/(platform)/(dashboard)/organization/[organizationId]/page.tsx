import { create } from "@/actions/create-board/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Borel } from "next/font/google";
import Board from "./board";
import { title } from "process";
import Form from "./form";
const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Form />
        {boards.map((board) => (
          <div className="" key={board.id}>
            <Board title={board.title} id={board.id}></Board>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
