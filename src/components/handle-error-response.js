export const handleListingContactOrganisation = async (response) => {
  if (response.status && response.code === 200) {
    return true;
  } else {
    return false;
  }
};

export const handleNewContactOrganisation = async (response) => {
  if (response.status && response.code === 200) {
    return true;
  } else {
    return false;
  }
};
