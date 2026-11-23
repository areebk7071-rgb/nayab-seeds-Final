import { whatsappLink } from "@/lib/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-leaf px-4 py-2 text-center text-sm text-cream">
      <span>Pay on delivery. </span>
      <a
        href={whatsappLink("Hi Nayab Seeds, I have a question.")}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-husk"
      >
        Questions? Message us on WhatsApp
      </a>
    </div>
  );
}
