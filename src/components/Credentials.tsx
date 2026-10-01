import Image from "next/image";
import hackathon from "../../sertifikat/2nd Winner on ICStar Hackathon.png";
import cofacilitator from "../../sertifikat/Co-Facilitator RPA Training.png";
import uipath from "../../sertifikat/UiPath Certified RPA Associate v1.0 certificate_page-0001.jpg";

const items = [
  { img: uipath, title: "UiPath Certified RPA Associate", meta: "UiPath · Jan 2021" },
  { img: hackathon, title: "2nd Winner, ICStar Hackathon 2020", meta: "IDStar · Sep 2020" },
  { img: cofacilitator, title: "RPA Training Co-Facilitator", meta: "ONE Indonesia × UiPath · Oct 2020" },
];

export default function Credentials() {
  return (
    <div className="creds">
      {items.map((c) => (
        <figure key={c.title} className="cred">
          <div className="cred-img">
            <Image src={c.img} alt={`${c.title} certificate`} placeholder="blur" sizes="(max-width: 800px) 100vw, 33vw" />
          </div>
          <figcaption>
            <strong>{c.title}</strong>
            <span>{c.meta}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
