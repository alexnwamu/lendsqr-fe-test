//User type
export interface User {
  id: string;
  organizationName: string;
  username: string;
  email: string;
  phone: string;
  number: string;
  dateJoined: string;
  status: "active" | "inactive" | "blacklisted" | "pending";
  userDetails: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: "male" | "female" | "other";
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  };
}
