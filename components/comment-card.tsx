import Image from "next/image";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

interface CommentCardProps {
  avatarUrl?: string;
  name: string;
  comment: string;
  date: string;
}

export function CommentCard({
  avatarUrl,
  name,
  comment,
  date,
}: CommentCardProps) {
  const fallbackAvatar = `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Usuário"
  )}&size=250`;

  return (
    <div className="flex gap-4 items-start">
      <Image
        src={avatarUrl || fallbackAvatar}
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="bg-brand-background-400 rounded-2xl px-6 py-4 w-full">
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold">{name}</p>
          <p className="text-sm text-white/50">
            {moment(date).format("DD MMM YYYY")}
          </p>
        </div>
        <p className="text-white/70 text-base mt-2 leading-relaxed">
          {comment}
        </p>
      </div>
    </div>
  );
}
