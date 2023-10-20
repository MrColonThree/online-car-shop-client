import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
const Member = ({member}) => {
  const {name,position, photo} = member;
  return (
    <Card className="">
      <CardHeader floated={false} className="h-3/4">
        <img className="w-full"
          src={photo}
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center mb-2">
        <h1  color="blue-gray" className="mb-2">
         {name}
        </h1>
        <h3 color="blue-gray" className="font-medium">
          {position}
        </h3>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2  text-2xl">
        <BsFacebook className="text-[#1877F2]" />
        <BsTwitter className="text-[#1DA1F2]" />
        <BsLinkedin className="text-[#0A66C2]" />
      </CardFooter>
    </Card>
  );
};

export default Member;
