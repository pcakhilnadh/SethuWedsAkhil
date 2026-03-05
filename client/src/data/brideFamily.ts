import type { FamilyMember } from "./groomFamily";

export type { FamilyMember };

export const brideFamilyMembers: FamilyMember[] = [
  {
    id: "B_FATHER",
    name: "Rajesh",
    nickname: null,
    email: null,
    phoneNumber: null,
    familyPhoto: null,
    occupation: null,
    hometown: null,
    currentPlace: null,
    profileUrl: null,
    father: null,
    mother: null,
    spouse: "B_MOTHER",
  },
  {
    id: "B_MOTHER",
    name: "Seeja",
    nickname: null,
    email: null,
    phoneNumber: null,
    familyPhoto: null,
    occupation: null,
    hometown: null,
    currentPlace: null,
    profileUrl: null,
    father: null,
    mother: null,
    spouse: "B_FATHER",
  },
  {
    id: "B_BRIDE",
    name: "Sethulakshmi",
    nickname: "Ammu",
    email: null,
    phoneNumber: null,
    familyPhoto: null,
    occupation: null,
    hometown: null,
    currentPlace: null,
    profileUrl: null,
    father: "B_FATHER",
    mother: "B_MOTHER",
    spouse: "B_GROOM",
  },
  {
    id: "B_SISTER",
    name: "Meenakshi",
    nickname: "Achu",
    email: null,
    phoneNumber: null,
    familyPhoto: null,
    occupation: null,
    hometown: null,
    currentPlace: null,
    profileUrl: null,
    father: "B_FATHER",
    mother: "B_MOTHER",
    spouse: null,
  },
  {
    id: "B_GROOM",
    name: "Akhil Nadh PC",
    nickname: null,
    email: null,
    phoneNumber: null,
    familyPhoto: null,
    occupation: null,
    hometown: null,
    currentPlace: null,
    profileUrl: null,
    father: null,
    mother: null,
    spouse: "B_BRIDE",
  },
];

export const getBrideFamilyMemberById = (
  id: string,
): FamilyMember | undefined => {
  return brideFamilyMembers.find((member) => member.id === id);
};

export const getBrideFamilyMembersByName = (name: string): FamilyMember[] => {
  return brideFamilyMembers.filter((member) =>
    member.name.toLowerCase().includes(name.toLowerCase()),
  );
};

export const getBrideChildren = (parentId: string): FamilyMember[] => {
  return brideFamilyMembers.filter(
    (member) => member.father === parentId || member.mother === parentId,
  );
};

export const getBrideSpouse = (
  memberId: string,
): FamilyMember | undefined => {
  const member = getBrideFamilyMemberById(memberId);
  if (!member || !member.spouse) return undefined;
  return getBrideFamilyMemberById(member.spouse);
};

export const getBrideSiblings = (memberId: string): FamilyMember[] => {
  const member = getBrideFamilyMemberById(memberId);
  if (!member) return [];

  return brideFamilyMembers.filter(
    (m) =>
      m.id !== memberId &&
      ((member.father && m.father === member.father) ||
        (member.mother && m.mother === member.mother)),
  );
};

export const getBrideParents = (
  memberId: string,
): { father?: FamilyMember; mother?: FamilyMember } => {
  const member = getBrideFamilyMemberById(memberId);
  if (!member) return {};

  return {
    father: member.father
      ? getBrideFamilyMemberById(member.father)
      : undefined,
    mother: member.mother
      ? getBrideFamilyMemberById(member.mother)
      : undefined,
  };
};

