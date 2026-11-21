export type Product = {
  id: string;
  name: string;
  visualTitle: string;
  description: string;
  image: string;
  status: "reference";
  publicationApproved: boolean;
  approvedName: null;
  specifications: null;
  price: null;
  originalPhotography: null;
};

// These are visual reference labels, not invented commercial model names or specifications.
// The user authorized publication of the two existing photographs; originals remain untouched.
export const products: Product[] = [
  {
    id: "java-01",
    name: "Referencia 01",
    visualTitle: "Carácter dorado.",
    description: "Un horno que también forma parte de la identidad de tu pizzería.",
    image: "/images/hornos/java-gold-reference.webp",
    status: "reference",
    publicationApproved: true,
    approvedName: null,
    specifications: null,
    price: null,
    originalPhotography: null,
  },
  {
    id: "java-02",
    name: "Referencia 02",
    visualTitle: "Espíritu italiano.",
    description: "Una presencia tricolor para poner la pizza en el centro de tu negocio.",
    image: "/images/hornos/java-italia-reference.webp",
    status: "reference",
    publicationApproved: true,
    approvedName: null,
    specifications: null,
    price: null,
    originalPhotography: null,
  },
];
