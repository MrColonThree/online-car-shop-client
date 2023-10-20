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
    <Card className="flex flex-col">
      <CardHeader floated={false} className="">
        <img className="w-full"
          src={photo}
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center mb-2 flex-grow">
        <h1 color="blue-gray" className="md:mb-2 mb-1 text-sm md:text-lg">
         {name}
        </h1>
        <h3 color="blue-gray" className="md:mb-2 mb-1 text-sm md:text-lg">
          {position}
        </h3>
      </CardBody>
      <CardFooter className="flex justify-center md:gap-7 gap-3 pt-2  md:text-2xl">
        <BsFacebook className="text-[#1877F2]" />
        <BsTwitter className="text-[#1DA1F2]" />
        <BsLinkedin className="text-[#0A66C2]" />
      </CardFooter>
    </Card>
  );
};

export default Member;
