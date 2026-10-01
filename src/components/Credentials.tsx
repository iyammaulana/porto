"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import hackathon from "../../sertifikat/2nd Winner on ICStar Hackathon.png";
import cofacilitator from "../../sertifikat/Co-Facilitator RPA Training.png";
import uipath from "../../sertifikat/UiPath Certified RPA Associate v1.0 certificate_page-0001.jpg";

const items = [
  { img: uipath, title: "UiPath Certified RPA Associate" },
  { img: cofacilitator, title: "RPA Training Co-Facilitator" },
  { img: hackathon, title: "ICStar Hackathon 2020, 2nd winner" },
];

export default function Credentials() {
  return (
    <div className="certs">
      {items.map((c) => (
        <Dialog.Root key={c.title}>
          <Dialog.Trigger className="cert" aria-label={`Open ${c.title} certificate`}>
            <Image src={c.img} alt="" sizes="(max-width: 900px) 100vw, 300px" />
            <span className="cert-caption">{c.title} ↗</span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dlg-overlay" />
            <Dialog.Content className="dlg" aria-describedby={undefined}>
              <div className="dlg-head">
                <Dialog.Title className="dlg-title">{c.title}</Dialog.Title>
                <Dialog.Close className="dlg-close">Close</Dialog.Close>
              </div>
              <Image src={c.img} alt={`${c.title} certificate`} sizes="(max-width: 1100px) 100vw, 1040px" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}
