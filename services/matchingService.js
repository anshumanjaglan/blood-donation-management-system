/**
 * Blood Compatibility & Matching Service
 * Based on clinical ABO and Rh(D) antigen compatibility rules.
 */

// Mapping of recipient blood group to compatible donor blood groups
const RECIPIENT_COMPATIBILITY = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Recipient
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'] // Can only receive O-
};

// Mapping of donor blood group to compatible recipients they can donate to
const DONOR_COMPATIBILITY = {
  'O-': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Donor
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

/**
 * Returns list of compatible blood groups that can donate to this recipient
 */
function getCompatibleDonorsFor(recipientBloodGroup) {
  return RECIPIENT_COMPATIBILITY[recipientBloodGroup] || [recipientBloodGroup];
}

/**
 * Returns list of blood groups this donor can donate to
 */
function getCompatibleRecipientsFor(donorBloodGroup) {
  return DONOR_COMPATIBILITY[donorBloodGroup] || [donorBloodGroup];
}

/**
 * Match registered donors against a blood requirement
 * @param {Array} allDonors - Array of registered donors from database
 * @param {Object} criteria - { bloodGroup: 'B+', city: 'Delhi', unitsNeeded: 1 }
 */
function findMatches(allDonors, criteria) {
  const { bloodGroup, city } = criteria;
  const compatibleGroups = getCompatibleDonorsFor(bloodGroup);

  // Filter eligible donors: Active and Available
  const eligible = allDonors.filter(donor => {
    const isComp = compatibleGroups.includes(donor.blood_group);
    const isAvail = donor.is_available === true || donor.is_available === 1;
    const isActive = donor.status === 'Active';
    return isComp && isAvail && isActive;
  });

  // Calculate score and sort
  const scoredDonors = eligible.map(donor => {
    let matchScore = 50; // base compatibility score
    let locationMatch = 'Different City';

    // Exact blood group bonus
    if (donor.blood_group === bloodGroup) {
      matchScore += 30;
    } else {
      matchScore += 15; // Compatible alternative
    }

    // Location proximity bonus
    if (city && donor.city && donor.city.trim().toLowerCase() === city.trim().toLowerCase()) {
      matchScore += 20;
      locationMatch = 'Exact City Match';
    } else if (city && donor.district && donor.district.trim().toLowerCase().includes(city.trim().toLowerCase())) {
      matchScore += 10;
      locationMatch = 'Nearby District';
    }

    return {
      ...donor,
      matchScore,
      locationMatch,
      isExactBloodMatch: donor.blood_group === bloodGroup
    };
  });

  // Sort descending by score
  scoredDonors.sort((a, b) => b.matchScore - a.matchScore);

  return {
    recipientBloodGroup: bloodGroup,
    targetCity: city || 'All Cities',
    compatibleBloodGroups: compatibleGroups,
    totalFound: scoredDonors.length,
    matches: scoredDonors
  };
}

module.exports = {
  RECIPIENT_COMPATIBILITY,
  DONOR_COMPATIBILITY,
  getCompatibleDonorsFor,
  getCompatibleRecipientsFor,
  findMatches
};
