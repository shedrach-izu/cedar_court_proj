import StarRating from "./StarRating";
import Link from "next/link";

function RoomCard({ apartment }: { apartment: any }) {
    const livingRoomImage = apartment.gallery.find(
  (image: any) => image.type === "living-room"
);
  return (
    <Link className="group text-left border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.45)] transition-all duration-300 bg-[#161310] overflow-hidden w-full"
          href={`/apartment-details/${apartment.slug}`}>
      <div className="overflow-hidden h-56 bg-[#0c0a08]">
        <img src={livingRoomImage?.url} alt={livingRoomImage?.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{apartment.category.title}</span>
            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-0.5">{apartment.title}</h3>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="font-['Fraunces'] text-2xl text-[#c4954a]">${apartment.price}</div>
            <div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">per night</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3 text-xs font-['DM_Mono'] text-[#8a7d6a]">
          <span>{apartment.area}</span><span className="text-[#c4954a]/40">·</span><span>{apartment.guests} guests</span><span className="text-[#c4954a]/40">·</span><span className="truncate">{apartment.view}</span>
        </div>
        <div className="flex items-center justify-between">
          <StarRating rating={apartment.rating} size={12} />
          <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{apartment.reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;