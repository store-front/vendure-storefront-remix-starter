import { fakerHU as faker } from '@faker-js/faker';
import {
  Card,
  CardDescription,
  CardTitle,
} from '~/components/ui-custom/MyCard';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface ExpertProps {
  title?: string;
  expertEmail?: string;
  expertPhoneNumber?: string;
  imageSrc?: string;
  showTitle?: boolean;
  showEmail?: boolean;
  showPhoneNumber?: boolean;
  showImage?: boolean;
}

const UserCard: React.FC<ExpertProps> = ({
  title = faker.person.fullName(),
  imageSrc = '',
  expertPhoneNumber = faker.phone.number(),
  expertEmail = faker.internet.email(),
  showTitle = true,
  showImage = true,
  showPhoneNumber = true,
  showEmail = false,
}) => {
  return (
    <Card className="flex items-center gap-4 border-none shadow-none bg-transparent">
      {showImage && (
        <Avatar className="h-14 w-14 ring-[1px] ring-border">
          <AvatarImage src={faker.image.url()} alt={title} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <address className="flex flex-col not-italic">
        {showTitle && <CardTitle className="text-base">{title}</CardTitle>}
        <CardDescription className="text-sm">
          {showPhoneNumber && (
            <a href={`tel:${expertPhoneNumber}`}>{expertPhoneNumber}</a>
          )}
          {showEmail && <a href={`mailto:${expertEmail}`}>{expertEmail}</a>}
        </CardDescription>
      </address>
    </Card>
  );
};

export default UserCard;
