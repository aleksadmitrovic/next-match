import NextLink from "@/components/NextLink";
import { Button } from "@heroui/button";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl">Home Page</h1>
      <Button
        as={NextLink}
        href="/members"
        variant="bordered"
        color="primary"
        startContent={<FaRegSmile size={20} />}
      >
        Hello
      </Button>
    </div>
  );
}
