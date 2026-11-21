// Public sales destination approved by the user. No credentials belong in this module.
const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308";
const whatsappNumber = configuredNumber.replace(/\D/g, "");
if (!/^\d{8,15}$/.test(whatsappNumber)) {
  throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER must contain an international phone number.");
}

export const site = {
  name: "JAVA",
  whatsappNumber,
  phoneLabel: whatsappNumber.startsWith("34") && whatsappNumber.length === 11
    ? `+34 ${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5, 8)} ${whatsappNumber.slice(8)}`
    : `+${whatsappNumber}`,
  phoneHref: `+${whatsappNumber}`,
  photographyApprovedForPublication: true,
  specificationsApproved: false,
  productNamesApproved: false,
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiry = whatsappUrl(
  "Hola, me gustaría solicitar información sobre los hornos JAVA para mi proyecto profesional.",
);
