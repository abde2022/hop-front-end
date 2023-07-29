export function DescendingComparator(a, b, orderBy) {
  const whichData = (orderBy, data) => {
    if (["nom", "statut"].includes(orderBy)) {
      return data.organisation[orderBy];
    } else if (orderBy === "nom & prenom") {
      return `${data["nom"]}  ${data["prenom"]}`;
    }
  };

  const A = whichData(orderBy, a);
  const B = whichData(orderBy, b);

  if (B < A) {
    return -1;
  }
  if (B > A) {
    return 1;
  }
  return 0;
}
